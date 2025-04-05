import {
  Button,
  Column,
  Display,
  Label,
  Page,
  Row,
  useDesignerTheme,
  timing,
} from "designer-m3";
import Mapbox, { MapView } from "@rnmapbox/maps";
import { useRef, useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { ArrowRightIcon } from "designer-m3/icons";
import { fadeOut, Coordinate, Speech, Marker } from "../shared";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiY2hyaXN0Zmlyc3Rjb2RlciIsImEiOiJjbTZod3h3ajUwMjl6Mmtwa3hvYzR0Nm9hIn0.BZK9rdHBOzIyP6H3xPfUFA"
);

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
    lat: 29.553283,
    lng: -95.199233,
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
  Centroid: {
    lat: 29.54195,
    lng: -95.266933,
  },
};

type Layer = {
  Layer: typeof Mapbox.SymbolLayer | typeof Mapbox.LineLayer;
  id: string;
};

const line = (id: string): Layer => ({
  id,
  Layer: Mapbox.LineLayer,
});

const symbol = (id: string): Layer => ({
  id,
  Layer: Mapbox.SymbolLayer,
});

const layers: Layer[] = [
  line("road-motorway-trunk-case"),
  line("road-motorway-trunk"),

  line("road-primary-case"),
  line("road-primary"),

  line("road-secondary-tertiary-case"),
  line("road-secondary-tertiary"),

  symbol("settlement-label"),
  symbol("settlement-subdivision-label"),
  symbol("airport-label"),
];

type PrologueState = {
  showTitle: boolean;
  dialog: {
    text: string;
    duration: number;
  };
  markerCoordinate: null | Coordinate;
  visibleLayers: Layer[];
  camera: {
    animationDuration: number;
    zoomLevel: number;
    center: Coordinate;
  };
};


export default function Prologue() {
  const overture = useAudioPlayer(require("../../assets/overture.mp4"));
  const { spacing, colors } = useDesignerTheme();

  const mapView = useRef<MapView>(null);

  const [state, setState] = useState<PrologueState>({
    dialog: {
      text: '',
      duration: 0
    },
    showTitle: false,
    markerCoordinate: null,
    visibleLayers: [],
    camera: {
      animationDuration: 0,
      zoomLevel: 9.75,
      center: Locations.Portsmouth,
    },
  });

  const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

  const say = (text: string, duration: number) => setState(state => ({ ...state, dialog: { text, duration } }));

  const setMarker = (coordinate: Coordinate | null) => setState(state => ({ ...state, markerCoordinate: coordinate }));

  const moveCamera = (center: Coordinate, zoomLevel: number, animationDuration: number) =>
      setState(state => ({ ...state, camera: { center, zoomLevel, animationDuration }}))

  const setVisibleLayers = (visibleLayers: Layer[]) => setState(state => ({ ...state, visibleLayers }))

  const setShowTitle = (showTitle: boolean) => setState(state => ({ ...state, showTitle }))

  const hasStarted = useRef(false);

  async function play() {
    if (hasStarted.current) return;
    hasStarted.current = true;

    moveCamera(Locations.Centroid, 9.75, 41000);

    say("Long ago, Hylia created Hyrule from a song...", 6000);

    await wait(1500)

    overture.play();

    await wait(4500);

    say("4 seeds sprouted from the song, bringing fire, water, ice, and lightning to Hyrule ", 5000)

    await wait(5000);

    say("Hylia tended these seedlings, but fearing a great demise descending, she hid them away, and ascended to the heavens.", 6000)

    await wait(6000);

    say("The kingdom of Hyrule became a kingdom in decline, a scattered people striving against trial and monster in isolation.", 6000);

    await wait(6000);

    say("From the harsh cliffsides of Necluda...", 2000)

    setMarker(Locations.TomBass)

    await wait(2000);

    say("...to the lofty peaks of Hebra", 2000)

    setMarker(Locations.ShadowCreek)

    await wait(2000);

    say("From the white sands of Lurelin beach...", 2000);

    setMarker(Locations.StellaRoberts)

    await wait(2000);

    say("...to the relentless Gerudo Desert", 2000)

    setMarker(Locations.Wilson)

    await wait(2000);

    say("From the streams of Faron woods...", 2000)

    setMarker(Locations.FrankieCarter)

    await wait(2000);

    say("...to the lake of Lanayru", 2000)

    setMarker(Locations.Stevenson)

    await wait(2000);

    say("From the warmth of Floria springs...", 2000)

    setMarker(Locations.Centennial)

    await wait(2000);

    say("...to the heat of Eldin Mountains.", 2000)

    setMarker(Locations.ChallengerSeven)

    await wait(2000);

    setMarker(null)

    say("Legend says that a hero will one day restore the seeds, unite Hyrule's peoples, and save the world....", 6000)

    await wait(6000);

    say('', 0)

    moveCamera(Locations.Centroid, 9, 2000)

    await wait(500)

    setVisibleLayers(layers.slice(0, 2));

    await wait(500);

    setVisibleLayers(layers.slice(0, 4));

    await wait(500);

    setVisibleLayers(layers.slice(0, 6));

    await wait(500);

    setVisibleLayers(layers);

    await wait(2000)

    setShowTitle(true)

    while(true){
      moveCamera(Locations.Portsmouth, 9, 10000)
      await wait(10000)
      moveCamera(Locations.Centroid, 9, 10000)
      await wait(10000)
    }
  }

  const { camera, markerCoordinate, dialog, showTitle, visibleLayers } = state;

  return (
    <Page
      navTransitionOutDuration={2000}
      onBeforeNavigate={() => fadeOut(overture, 2000)}
      justifyContent="center"
    >
      <Column
        flex={1}
        opacity={1}
        transform={[{ translateX: 0 }, { translateY: 0 }]}
        _navTransitionIn={{
          opacity: 0,
        }}
        _navTransitionOut={{
          opacity: 0,
          transform: [{ translateX: 10 }, { translateY: 0 }],
        }}
        transitions={{
          opacity: timing(2000),
          transform: [{ translateX: timing(2000) }, { translateY: timing(2000) }],
        }}
      >
        <MapView
          ref={mapView}
          style={{ flex: 1 }}
          styleURL={Mapbox.StyleURL.Dark}
          scaleBarEnabled={false}
          onDidFinishLoadingMap={play}
        >
          <Mapbox.Camera
            animationDuration={camera.animationDuration}
            zoomLevel={camera.zoomLevel}
            centerCoordinate={[camera.center.lng, camera.center.lat]}
          />
          {layers.map(({ Layer, id }) => (
            <Layer
              key={`${id}_hidden`}
              id={id}
              existing={true}
              sourceLayerID="composite"
              style={{
                visibility: "none",
              }}
            />
          ))}
          {visibleLayers.map(({ Layer, id }) => (
            <Layer
              key={`${id}_visible`}
              id={id}
              existing={true}
              sourceLayerID="composite"
              style={{
                visibility: "visible",
              }}
            />
          ))}
          {markerCoordinate && (
            <Marker
              id="marker"
              lat={markerCoordinate.lat}
              lng={markerCoordinate.lng}
              imageSlug="marker"
            />
          )}
        </MapView>
        <Column
          position="absolute"
          px={spacing.sm}
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(0,0,0,0.75)"
          opacity={showTitle ? 1 : 0}
          transitions={{
            opacity: timing(1500),
          }}
        >
          <Column position="relative" height={150} width={300}>
            <Label.Small 
              position="absolute"
              top={20}
              left={100}
            >
              The Legend of
            </Label.Small>
            <Display.Large
              lineHeight={150} 
              position="absolute"
              top={20}
            >
              Zelda
            </Display.Large>
            <Label.Large 
              top={130}
              left={100}
            >
              A Link to Our World
            </Label.Large>
          </Column>
          <Row justifyContent="center" my={spacing.md} gap={spacing.xs}>
            <Button.Text href="/intro/sign-up" alignItems="center">
              Begin <ArrowRightIcon />
            </Button.Text>
          </Row>
        </Column>
      </Column>
      {dialog.text && (
        <Column
          height={200}
          position="absolute"
          bottom={0}
          backgroundColor={colors.roles.surfaceContainerLowest}
          width="100%"
          p={spacing.md}
        >
          <Speech
            key={dialog.text}
            text={dialog.text}
            duration={dialog.duration / 2}
          />
        </Column>
      )}
    </Page>
  );
}
