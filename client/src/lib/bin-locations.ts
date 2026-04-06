export interface BinLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  hours: string;
  notes: string;
}

const CSV_URL = import.meta.env.VITE_BIN_LOCATIONS_CSV_URL;

/**
 * Parse a CSV line respecting quoted fields (addresses may contain commas).
 */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
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

export async function fetchBinLocations(): Promise<BinLocation[]> {
  if (!CSV_URL) {
    return [];
  }

  const res = await fetch(CSV_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch bin locations: ${res.status}`);
  }

  const text = await res.text();
  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  // Skip header row
  const dataLines = lines.slice(1);

  return dataLines
    .map((line) => {
      const fields = parseCsvLine(line);
      const lat = parseFloat(fields[3]);
      const lng = parseFloat(fields[4]);
      if (isNaN(lat) || isNaN(lng)) return null;
      return {
        id: fields[0] || "",
        name: fields[1] || "",
        address: fields[2] || "",
        lat,
        lng,
        type: fields[5] || "",
        hours: fields[6] || "",
        notes: fields[7] || "",
      };
    })
    .filter((b): b is BinLocation => b !== null);
}

/**
 * Haversine distance between two lat/lng points in kilometers.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findClosestBins(
  userLat: number,
  userLng: number,
  bins: BinLocation[],
  count = 5,
): (BinLocation & { distance: number })[] {
  return bins
    .map((bin) => ({
      ...bin,
      distance: haversineDistance(userLat, userLng, bin.lat, bin.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}
