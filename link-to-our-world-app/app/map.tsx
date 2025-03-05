import { isFailure } from "@triframe/ambassador";
import { isLoading } from "@triframe/utils-react";
import { Label, Column } from "designer-m3";
import { useLocation } from "./useLocation";
import Mapbox, { MapView } from "@rnmapbox/maps";
import { useRef } from "react";
import { Point } from "./distance";
import { Image } from "react-native";
import { Nav } from "./Nav";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiY2hyaXN0Zmlyc3Rjb2RlciIsImEiOiJjbTZod3h3ajUwMjl6Mmtwa3hvYzR0Nm9hIn0.BZK9rdHBOzIyP6H3xPfUFA"
);

export default function Map() {
  return (
    <>
      <Column style={{ flex: 1 }}>
        {/* <SongPlayer song={mainTheme} /> */}
        <ExampleMap />
      </Column>
      <Nav />
    </>
  );
}

function ExampleMap() {
  const target: Point = {
    latitude: 29.915563,
    longitude: -95.588659,
  };
  const location = useLocation();

  if (isLoading(location)) return null;

  if (isFailure(location, "permissionDenied"))
    return <Label.Small>Location Unavailable</Label.Small>;

  return (
    <MapView
      style={{ flex: 1 }}
      styleURL={Mapbox.StyleURL.Dark}
      scaleBarEnabled={false}
    >
      <Mapbox.Camera followZoomLevel={12} followUserLocation />
      <Mapbox.UserLocation />
      <PointMarker id="tom-bass-park" lat={29.588333} lng={-95.37445} />
      <PointMarker id="challenger-7-park" lat={29.507617} lng={-95.141983} />
      <PointMarker id="stella-roberts-park" lat={29.54195} lng={-95.306933} />
      <PointMarker id="shadow-creek-park" lat={29.582217} lng={-95.411933} />
      <PointMarker id="stevenson-park" lat={29.520817} lng={-95.192433} />
      <PointMarker id="wilson-park" lat={29.64205} lng={-95.2185} />
      <PointMarker id="centennial-park" lat={29.496667} lng={-95.183217} />
      <PointMarker id="frankie-carter-park" lat={29.553283} lng={-95.199233} />
    </MapView>
  );
}

type PointProps = {
  id: string;
  lat: number;
  lng: number;
};

function PointMarker({ id, lat, lng }: PointProps) {
  const pointAnnotation = useRef<Mapbox.PointAnnotation>(null);

  return (
    <Mapbox.PointAnnotation
      id={id}
      coordinate={[lng, lat]}
      ref={pointAnnotation}
      onSelected={() => console.log(id)}
    >
      <Image
        style={{ width: 30, height: 30,  }}
        source={require("../assets/boulder.png")}
        onLoad={() => pointAnnotation.current?.refresh()}
      />
    </Mapbox.PointAnnotation>
  );
}

/**
 *
 * INTRO (Portsmouth Park): 29.574452, -95.363353
 *
 * Tom Bass Park: https://www.geocaching.com/geocache/GCA21R3
 * Challenger 7 Park: https://www.geocaching.com/geocache/GC88E
 * Stella Roberts Recycling: https://www.geocaching.com/geocache/GCATPA6
 * Buffalo Bayou Bark?: https://www.geocaching.com/geocache/GCAH48Z
 * Shadow Creek Park: https://www.geocaching.com/geocache/GCATPBM
 * Stevenson Park: https://www.geocaching.com/geocache/GC864TN
 * Wilson Park?: https://www.geocaching.com/geocache/GC9XCDB
 * Centennial Park?: https://www.geocaching.com/geocache/GC4EB1K
 *
 */
