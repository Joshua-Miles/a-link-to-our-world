import Mapbox from "@rnmapbox/maps";
import { useRef, useState } from "react";
import { Image } from "react-native";
import { Assets } from "./Assets";

export type MarkerProps = {
  id: string;
  lat: number | string;
  lng: number | string;
  size?: number | null;
  imageSlug: string
};

export function Marker({ id, lat, lng, imageSlug, size = 20 }: MarkerProps) {
  const pointAnnotation = useRef<Mapbox.PointAnnotation>(null);
  const [_, setState] = useState(0);
  lat = typeof lat == 'number' ? lat : parseFloat(lat)
  lng = typeof lng == 'number' ? lng : parseFloat(lng)
  return (
    <Mapbox.PointAnnotation
      id={id}
      coordinate={[lng, lat]}
      ref={pointAnnotation}
      onSelected={() => console.log(id)}
    >
      <Image
        fadeDuration={0}
        style={{ width: size ?? 20, height: size ?? 20,  }}
        source={Assets[imageSlug]}
        onLoadEnd={() => {
          pointAnnotation.current?.refresh()
          setTimeout(() => {
            pointAnnotation.current?.refresh()
            setState(_ + 1)
          }, 500)
        }}
        onLayout={() => {
          pointAnnotation.current?.refresh()
          setTimeout(() => {
            pointAnnotation.current?.refresh()
            setState(_ + 1)
          }, 500)
        }}
      />
    </Mapbox.PointAnnotation>
  );
}
