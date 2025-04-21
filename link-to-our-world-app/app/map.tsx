import { isAnyFailure, isFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { Label, Column, ListItem, ListItemTitle, ListItemTrailing, PressableListItem, ListItemLeadingIcon, useDesignerTheme } from "designer-m3";
import { useLocation } from "../shared/useLocation";
import Mapbox, { MapView } from "@rnmapbox/maps";
import { useState } from "react";
import { getEncounter, getSeedsPlanted, getTemplesWatered, listEncounters } from "api";
import { Assets, Coordinate, Marker, Nav, feetBetween, Announcements, Soundtrack, usePersistedState } from "shared";
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

  const seedsPlanted = useResult(getSeedsPlanted);

  const templesWatered = useResult(getTemplesWatered);

  const finaleIntro = useResult(getEncounter, 'finale/intro')

  const finaleSongs = useResult(getEncounter, 'finale/songs')

  const [ spoofLocation, setSpoofLocation ] = usePersistedState<Coordinate | null>('persisted-state', null);

  const location = spoofLocation === null ? realLocation : spoofLocation;

  const encounters = useResult(listEncounters)

  const [ mapLoaded, setMapLoaded ] = useState(false);

  if (isLoading(location) || isLoading(encounters) || isLoading(seedsPlanted) || isLoading(templesWatered) || isAnyFailure(seedsPlanted) || isAnyFailure(templesWatered) || isLoading(finaleIntro) || isAnyFailure(finaleIntro) || isLoading(finaleSongs) || isAnyFailure(finaleSongs)) return <><Column flex={1}/><Nav /></>;

  if (isFailure(location, "permissionDenied"))
    return <Label.Small>Location Unavailable</Label.Small>;

  function handleMapPress(e: any) {
    if (!__DEV__) return;
    const [ lng, lat ] = e.geometry.coordinates as number[];
    setSpoofLocation({ lat, lng })
  }

  const nearbyEncounters = encounters.filter(encounter => feetBetween(encounter, location) < MAX_FEET_FOR_NEARBY_ENCOUNTER)

  const provinces = seedsPlanted.totalComplete === 4 ? phase2Provinces : phase1Provinces;

  const sortedProvinces = [ ...provinces ].sort( (a, b) => feetBetween(a, location) - feetBetween(b, location))

  const [ closestProvince ] = sortedProvinces;

  let track = closestProvince.name;

  if (finaleSongs?.resolved) {
    track = 'last-catch';
  } else if (finaleIntro?.resolved) {
    track = 'eclipse-of-the-world';
  } else if (seedsPlanted.totalComplete === 4) {
    track = 'eclipse-of-the-moon';
  }

  return (
    <Column flex={1}>
      <Soundtrack asset={track} fadeDuration={4000} />
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
            zoomLevel={16}
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

const phase1Provinces = [
  {
    name: 'luminas-theme',
    lat: 29.574452,
    lng: -95.363353,
  },
  {
    name: 'bazaar-theme',
    lat: 29.574138,
    lng: -95.361177
  },
  {
    name: 'lurelin',
    lat: 29.54195,
    lng: -95.306933,
  },
  {
    name: 'floria',
    lat: 29.496667,
    lng: -95.183217,
  },
  {
    name: 'faron',
    lat: 29.550533, 
    lng: -95.195267
  },
  {
    name: 'necluda',
    lat: 29.588333,
    lng: -95.37445,
  },
]

const phase2Provinces = [
  {
    name: 'luminas-theme',
    lat: 29.574452,
    lng: -95.363353,
  },
  {
    name: 'bazaar-theme',
    lat: 29.574138,
    lng: -95.361177
  },
  {
    name: 'gerudo',
    lat: 29.520817,
    lng: -95.199233,
  },
  {
    name: 'eldin',
    lat: 29.507617,
    lng: -95.141983,
  },
  {
    name: 'zoras',
    lat: 29.64205,
    lng: -95.2185,
  },
  {
    name: 'hebra',
    lat: 29.582217,
    lng: -95.411933,
  },
];



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