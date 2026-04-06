import { useQuery } from "@tanstack/react-query";
import { fetchBinLocations } from "@/lib/bin-locations";

export function useBinLocations() {
  return useQuery({
    queryKey: ["bin-locations"],
    queryFn: fetchBinLocations,
    staleTime: 5 * 60 * 1000,
  });
}
