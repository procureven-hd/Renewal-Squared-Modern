import { useCallback, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import { useBinLocations } from "@/hooks/use-bin-locations";
import { findClosestBins, type BinLocation } from "@/lib/bin-locations";
import { AddressSearch } from "./address-search";
import { BinDetailPanel } from "./bin-detail-panel";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "";

// Default center: Southern Ontario
const DEFAULT_CENTER = { lat: 43.65, lng: -79.38 };
const DEFAULT_ZOOM = 10;

function MapContent() {
  const map = useMap();
  const { data: bins = [], isLoading, error } = useBinLocations();
  const [selectedBin, setSelectedBin] = useState<BinLocation | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number | undefined>();
  const [panelOpen, setPanelOpen] = useState(false);

  const handleMarkerClick = useCallback(
    (bin: BinLocation) => {
      setSelectedBin(bin);
      setSelectedDistance(undefined);
      setPanelOpen(true);
      map?.panTo({ lat: bin.lat, lng: bin.lng });
    },
    [map],
  );

  const handlePlaceSelect = useCallback(
    (location: { lat: number; lng: number }) => {
      if (!bins.length || !map) return;

      const closest = findClosestBins(location.lat, location.lng, bins, 5);

      if (closest.length > 0) {
        // Fit bounds to show user location and closest bins
        const bounds = new google.maps.LatLngBounds();
        bounds.extend({ lat: location.lat, lng: location.lng });
        closest.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
        map.fitBounds(bounds, { top: 60, right: 40, bottom: 40, left: 40 });

        // Select the closest bin
        setSelectedBin(closest[0]);
        setSelectedDistance(closest[0].distance);
        setPanelOpen(true);
      }
    },
    [bins, map],
  );

  if (isLoading) {
    return (
      <div className="flex h-[360px] items-center justify-center sm:h-[480px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[360px] items-center justify-center sm:h-[480px]">
        <p className="text-sm text-muted-foreground">
          Unable to load bin locations. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-[360px] overflow-hidden rounded-2xl sm:h-[480px]">
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          mapId={MAP_ID}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          zoomControl={true}
          streetViewControl={false}
          fullscreenControl={false}
          mapTypeControl={false}
          className="h-full w-full"
        >
          {bins.map((bin) => (
            <AdvancedMarker
              key={bin.id}
              position={{ lat: bin.lat, lng: bin.lng }}
              title={bin.name}
              onClick={() => handleMarkerClick(bin)}
            >
              <Pin
                background="#16a34a"
                glyphColor="#fff"
                borderColor="#15803d"
              />
            </AdvancedMarker>
          ))}
        </Map>
        <AddressSearch onPlaceSelect={handlePlaceSelect} />
      </div>

      <BinDetailPanel
        bin={selectedBin}
        distance={selectedDistance}
        open={panelOpen}
        onOpenChange={setPanelOpen}
      />
    </>
  );
}

export function BinMap() {
  if (!API_KEY) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-2xl border border-dashed sm:h-[480px]">
        <p className="max-w-xs text-center text-sm text-muted-foreground">
          Google Maps API key not configured. Set{" "}
          <code className="rounded bg-muted px-1 text-xs">
            VITE_GOOGLE_MAPS_API_KEY
          </code>{" "}
          in your environment variables.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <MapContent />
    </APIProvider>
  );
}
