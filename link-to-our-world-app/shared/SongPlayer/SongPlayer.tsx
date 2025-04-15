import { fadeIn } from "shared";
import { Column, Row, timing, useDesignerTheme } from "designer-m3";
import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { Easing } from "react-native-reanimated";
import { Speech } from "../Speech";
import { SongData, useSongPlayer } from "./useSongPlayer";

export { SongData };

export type SongPlayerProps = {
  song: SongData;
  restartMessage?: string;
  onFinished?: () => any
};

export function SongPlayer({ song, restartMessage, onFinished }: SongPlayerProps) {
  const { colors } = useDesignerTheme();
  const songPlayer = useSongPlayer(song);
  const [ isRestarting, setIsRestarting ] = useState(false)

  useEffect(() => {
   if (songPlayer.score > .5) {
      onFinished?.()
   } else if (songPlayer.ended) {
      setIsRestarting(true);
   }
  }, [ songPlayer.ended ]);

  if (isRestarting) {
    return  (
      <Column flex={1} justifyContent="center" alignItems="center">
        <Speech hasStarted={isRestarting} text={restartMessage ?? 'Lets try that again...'} onFinished={() => {
          songPlayer.restart();
          setIsRestarting(false)
        }} />
      </Column>
    )
  }

  return (
    <Row px={40} flex={1} position="relative" {...songPlayer.panHandlers}>
      {songPlayer.pitches.map((pitch, i) => (
        <Column
          key={pitch.id}
          borderRightColor="black"
          borderRightWidth={1}
          flex={1}
          height={songPlayer.reelHeight}
          top={
            !songPlayer.started ? songPlayer.offsetStart : songPlayer.offsetEnd
          }
          transitions={{
            top: timing(songPlayer.durationInMS, {
              easing: Easing.linear,
            }),
          }}
          justifyContent="center"
          alignItems="center"
          backgroundColor={pitch.isPressed ? colors.roles.primary : undefined}
        >
          {pitch.notes.map((note) => (
            <Column
              key={note.offset}
              position="absolute"
              top={note.offset}
              height={note.height}
              width="100%"
              backgroundColor={colors.roles.secondary}
            >
              {pitch.id}
            </Column>
          ))}
        </Column>
      ))}
      <Row
        pointerEvents="none"
        position="absolute"
        width="100%"
        height={50}
        backgroundColor={colors.roles.success}
        bottom={songPlayer.bottomMargin - 50}
        left={40}
      />
    </Row>
  );
}
