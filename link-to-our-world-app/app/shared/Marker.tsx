import Mapbox from "@rnmapbox/maps";
import { useRef } from "react";
import { Image } from "react-native";

export type MarkerProps = {
  id: string;
  lat: number;
  lng: number;
};

export function Marker({ id, lat, lng }: MarkerProps) {
  const pointAnnotation = useRef<Mapbox.PointAnnotation>(null);

  return (
    <Mapbox.PointAnnotation
      id={id}
      coordinate={[lng, lat]}
      ref={pointAnnotation}
      onSelected={() => console.log(id)}
    >
      <Image
        fadeDuration={0}
        style={{ width: 20, height: 20 }}
        source={require("../../assets/marker.png")}
        onLoad={() => pointAnnotation.current?.refresh()}
      />
    </Mapbox.PointAnnotation>
  );
}
