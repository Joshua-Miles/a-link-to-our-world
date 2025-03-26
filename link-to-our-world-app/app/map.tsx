import { isFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { Label, Column, ListItem, ListItemTitle, ListItemTrailing, PressableListItem, ListItemLeadingIcon, useDesignerTheme } from "designer-m3";
import { useLocation } from "./useLocation";
import Mapbox, { MapView } from "@rnmapbox/maps";
import { useState } from "react";
import { listEncounters } from "api";
import { Assets, Coordinate, Marker, Nav, feetBetween, Announcements, Soundtrack } from "./shared";
import { Href } from "expo-router";
import { ArrowRightIcon } from "designer-m3/icons";
import { Image } from "react-native";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiY2hyaXN0Zmlyc3Rjb2RlciIsImEiOiJjbTZod3h3ajUwMjl6Mmtwa3hvYzR0Nm9hIn0.BZK9rdHBOzIyP6H3xPfUFA"
);

const MAX_FEET_FOR_NEARBY_ENCOUNTER = 30;

export default function Map() {
  const realLocation = useLocation();

  const { colors } = useDesignerTheme();

  const [ spoofLocation, setSpoofLocation ] = useState<Coordinate | null>(null);

  const location = spoofLocation === null ? realLocation : spoofLocation;

  const encounters = useResult(listEncounters)

  const [ mapLoaded, setMapLoaded ] = useState(false);

  if (isLoading(location) || isLoading(encounters)) return <><Column flex={1}/><Nav /></>;

  if (isFailure(location, "permissionDenied"))
    return <Label.Small>Location Unavailable</Label.Small>;

  function handleMapPress(e: any) {
    if (!__DEV__) return;
    const [ lng, lat ] = e.geometry.coordinates as number[];
    setSpoofLocation({ lat, lng })
  }

  const nearbyEncounters = encounters.filter(encounter => feetBetween(encounter, location) < MAX_FEET_FOR_NEARBY_ENCOUNTER)
  return (
    <Column flex={1}>
      <Soundtrack asset="hyrule-theme" fadeDuration={4000} />
      <Column flex={1}>
        <Announcements />
        <MapView
          style={{ flex: 1 }}
          styleURL={Mapbox.StyleURL.Dark}
          scaleBarEnabled={false}
          onDidFinishLoadingMap={() => setMapLoaded(true)}
          onPress={handleMapPress}
        >
          <Mapbox.Camera
            centerCoordinate={mapLoaded ? undefined : [ location.lng, location.lat ]}
            animationDuration={mapLoaded ? 500 : 0}
            zoomLevel={12}
          />
          <Mapbox.UserLocation />
          {encounters.map( encounter => (
            <Marker
              key={encounter.id}
              id={encounter.slug}
              lat={encounter.lat}
              lng={encounter.lng}
              imageSlug={encounter.imageSlug}
              size={encounter.imageSize}
            />
          ))}
        </MapView>
        {nearbyEncounters.map( encounter => (
          <PressableListItem href={`/encounters/${encounter.slug}` as Href} key={encounter.id} backgroundColor={colors.roles.surfaceContainerHighest}>
            <ListItemLeadingIcon>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10
                }}
                source={Assets[encounter.imageSlug]}
              />
            </ListItemLeadingIcon>
            <ListItemTitle>
              {encounter.label}
            </ListItemTitle>
            <ListItemTrailing>
              <ArrowRightIcon />
            </ListItemTrailing>
          </PressableListItem>
        ))}
      </Column>
      <Nav />
    </Column>
  );
}

const Locations = {
  ShadowCreek: {
    lat: 29.582217,
    lng: -95.411933,
  },
  TomBass: {
    lat: 29.588333,
    lng: -95.37445,
  },
  StellaRoberts: {
    lat: 29.54195,
    lng: -95.306933,
  },
  Wilson: {
    lat: 29.64205,
    lng: -95.2185,
  },
  FrankieCarter: {
    lat: 29.550533, 
    lng: -95.195267
  },
  Stevenson: {
    lat: 29.520817,
    lng: -95.199233,
  },
  Centennial: {
    lat: 29.496667,
    lng: -95.183217,
  },
  ChallengerSeven: {
    lat: 29.507617,
    lng: -95.141983,
  },
  Portsmouth: {
    lat: 29.574452,
    lng: -95.363353,
  },
  // Centroid: {
  //   lat: 29.54195,
  //   lng: -95.266933,
  // },
};

/**
 *
 * INTRO (Portsmouth Park): 29.574452, -95.363353
 *
 * Tom Bass Park: https://www.geocaching.com/geocache/GCA21R3
 * Challenger 7 Park: https://www.geocaching.com/geocache/GC88E
 * Stella Roberts Recycling: https://www.geocaching.com/geocache/GCATPA6
 * Shadow Creek Park: https://www.geocaching.com/geocache/GCATPBM
 * Stevenson Park: https://www.geocaching.com/geocache/GC864TN
 * Wilson Park?: https://www.geocaching.com/geocache/GC9XCDB
 * Centennial Park?: https://www.geocaching.com/geocache/GC4EB1K
 * Frankie Carter Randolph Park: https://www.geocaching.com/geocache/GCA0Y2W
 * 
 * Buffalo Bayou Bark?: https://www.geocaching.com/geocache/GCAH48Z

 */
/* <PointMarker id="tom-bass-park" lat={29.588333} lng={-95.37445} />
      <PointMarker id="challenger-7-park" lat={29.507617} lng={-95.141983} />
      <PointMarker id="stella-roberts-park" lat={29.54195} lng={-95.306933} />
      <PointMarker id="shadow-creek-park" lat={29.582217} lng={-95.411933} />
      <PointMarker id="stevenson-park" lat={29.520817} lng={-95.192433} />
      <PointMarker id="wilson-park" lat={29.64205} lng={-95.2185} />
      <PointMarker id="centennial-park" lat={29.496667} lng={-95.183217} />
      <PointMarker id="frankie-carter-park" lat={29.553283} lng={-95.199233} /> */

// const target: Point = {
//   latitude: 29.915563,
//   longitude: -95.588659,
// };