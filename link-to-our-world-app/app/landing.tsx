import { isFailure } from "@triframe/ambassador";
import { isLoading } from "@triframe/utils-react";
import { Label, Column } from "designer-m3";
import { useLocation } from "./useLocation"
import { MapView } from "@rnmapbox/maps";


export default function Landing() {
   const location = useLocation();

   if (isLoading(location)) return null;

   if (isFailure(location, 'permissionDenied')) return <Label.Small>Location Unavailable</Label.Small>
   // 29.915563, -95.588659
   return (
      <Column>
         <Label.Small>{location.coords.latitude} {location.coords.longitude}</Label.Small>
         <MapView />
      </Column>
   )
}