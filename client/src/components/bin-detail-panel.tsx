import { MapPin, Clock, Navigation, Tag, StickyNote } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import type { BinLocation } from "@/lib/bin-locations";

interface BinDetailPanelProps {
  bin: BinLocation | null;
  distance?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BinDetails({
  bin,
  distance,
}: {
  bin: BinLocation;
  distance?: number;
}) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${bin.lat},${bin.lng}`;

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="text-sm">{bin.address}</span>
      </div>

      {bin.type && (
        <div className="flex items-center gap-3">
          <Tag className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Badge variant="secondary" className="capitalize">
            {bin.type}
          </Badge>
        </div>
      )}

      {bin.hours && (
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm">{bin.hours}</span>
        </div>
      )}

      {bin.notes && (
        <div className="flex items-start gap-3">
          <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{bin.notes}</span>
        </div>
      )}

      {distance !== undefined && (
        <div className="flex items-center gap-3">
          <Navigation className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm">
            {distance < 1
              ? `${Math.round(distance * 1000)} m away`
              : `${distance.toFixed(1)} km away`}
          </span>
        </div>
      )}

      <Button asChild className="mt-2 w-full rounded-xl">
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
          <Navigation className="mr-2 h-4 w-4" />
          Get directions
        </a>
      </Button>
    </div>
  );
}

export function BinDetailPanel({
  bin,
  distance,
  open,
  onOpenChange,
}: BinDetailPanelProps) {
  const isMobile = useIsMobile();

  if (!bin) return null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{bin.name}</DrawerTitle>
            <DrawerDescription>{bin.address}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <BinDetails bin={bin} distance={distance} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{bin.name}</SheetTitle>
          <SheetDescription>{bin.address}</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <BinDetails bin={bin} distance={distance} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
