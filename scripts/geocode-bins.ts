/**
 * Batch geocode bin addresses using the Google Geocoding API.
 *
 * Usage:
 *   npx tsx scripts/geocode-bins.ts
 *
 * Reads the published Google Sheet CSV (VITE_BIN_LOCATIONS_CSV_URL),
 * geocodes any rows missing lat/lng, and prints updated CSV rows
 * that you can paste back into the sheet.
 *
 * Requires VITE_GOOGLE_MAPS_API_KEY and VITE_BIN_LOCATIONS_CSV_URL
 * to be set in your .env file.
 */

import "dotenv/config";

const API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;
const CSV_URL = process.env.VITE_BIN_LOCATIONS_CSV_URL;

if (!API_KEY || !CSV_URL) {
  console.error(
    "Missing VITE_GOOGLE_MAPS_API_KEY or VITE_BIN_LOCATIONS_CSV_URL in .env",
  );
  process.exit(1);
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current.trim());
  return fields;
}

async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }

  console.warn(`  Could not geocode: "${address}" (status: ${data.status})`);
  return null;
}

async function main() {
  console.log("Fetching CSV from Google Sheets...\n");
  const res = await fetch(CSV_URL!);
  const text = await res.text();
  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  if (lines.length < 2) {
    console.log("No data rows found in the sheet.");
    return;
  }

  const header = lines[0];
  console.log(`Header: ${header}`);
  console.log(`Found ${lines.length - 1} data row(s)\n`);

  const results: string[] = [header];

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    const [id, name, address, latStr, lngStr, type, hours, notes] = fields;
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (!isNaN(lat) && !isNaN(lng)) {
      console.log(`  [${id}] ${name} — already has coordinates (${lat}, ${lng})`);
      results.push(lines[i]);
      continue;
    }

    if (!address) {
      console.log(`  [${id}] ${name} — no address, skipping`);
      results.push(lines[i]);
      continue;
    }

    console.log(`  [${id}] ${name} — geocoding "${address}"...`);
    const coords = await geocodeAddress(address);

    if (coords) {
      console.log(`         -> ${coords.lat}, ${coords.lng}`);
      results.push(
        `${id},${name},"${address}",${coords.lat},${coords.lng},${type || ""},${hours || ""},${notes || ""}`,
      );
    } else {
      results.push(lines[i]);
    }

    // Respect rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log("\n--- Updated CSV (copy rows with new coordinates back into your sheet) ---\n");
  console.log(results.join("\n"));
}

main().catch(console.error);
