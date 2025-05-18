
import { Wifi, Tv, Coffee, Car, Bath } from "lucide-react";

interface FeatureIconProps {
  feature: string;
}

export const FeatureIcon = ({ feature }: FeatureIconProps) => {
  switch (feature) {
    case "WiFi":
      return <Wifi className="h-5 w-5" />;
    case "TV":
      return <Tv className="h-5 w-5" />;
    case "Cuisine":
      return <Coffee className="h-5 w-5" />;
    case "Parking":
      return <Car className="h-5 w-5" />;
    default:
      return <Bath className="h-5 w-5" />;
  }
};
