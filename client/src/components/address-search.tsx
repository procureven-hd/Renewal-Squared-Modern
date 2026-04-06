import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Search, X } from "lucide-react";

interface AddressSearchProps {
  onPlaceSelect: (location: { lat: number; lng: number; address: string }) => void;
}

export function AddressSearch({ onPlaceSelect }: AddressSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const places = useMapsLibrary("places");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    autocompleteRef.current = new places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "ca" },
      fields: ["geometry", "formatted_address"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.geometry?.location) return;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address || "";
      setValue(address);
      onPlaceSelect({ lat, lng, address });
    });
  }, [places, onPlaceSelect]);

  const handleClear = () => {
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="absolute left-3 right-3 top-3 z-10 sm:left-4 sm:right-auto sm:top-4 sm:w-80">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter an address to find nearby bins..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-10 w-full rounded-xl border border-input bg-background/95 pl-9 pr-9 text-sm shadow-md backdrop-blur placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
