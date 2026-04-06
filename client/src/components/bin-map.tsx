import { useCallback, useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import { useBinLocations } from "@/hooks/use-bin-locations";
import type { BinLocation } from "@/lib/bin-locations";
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
  const hasFitBounds = useRef(false);

  // Fit map to show all bins once they load
  useEffect(() => {
    if (!map || !bins.length || hasFitBounds.current) return;
    const bounds = new google.maps.LatLngBounds();
    bins.forEach((bin) => bounds.extend({ lat: bin.lat, lng: bin.lng }));
    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
    hasFitBounds.current = true;
  }, [map, bins]);

  const handleMarkerClick = useCallback(
    (bin: BinLocation) => {
      setSelectedBin(bin);
      setSelectedDistance(undefined);
      setPanelOpen(true);
      map?.panTo({ lat: bin.lat, lng: bin.lng });
    },
    [map],
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
          mapId={MAP_ID || undefined}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          zoomControl={true}
          streetViewControl={false}
          fullscreenControl={false}
          mapTypeControl={false}
          className="h-full w-full"
        >
          {bins.map((bin) =>
            MAP_ID ? (
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
            ) : (
              <Marker
                key={bin.id}
                position={{ lat: bin.lat, lng: bin.lng }}
                title={bin.name}
                onClick={() => handleMarkerClick(bin)}
              />
            ),
          )}
        </Map>
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
