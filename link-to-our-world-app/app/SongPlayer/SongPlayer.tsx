import { fadeIn } from "app/shared";
import { Column, Row, timing } from "designer-m3";
import { AudioPlayer, useAudioPlayer } from "expo-audio";
import { useEffect } from "react";
import { Easing } from "react-native-reanimated";
import { SongData, useSongPlayer } from "./useSongPlayer";

export { SongData };

export type SongPlayerProps = {
  song: SongData;
};

export function SongPlayer({ song }: SongPlayerProps) {
  const songPlayer = useSongPlayer(song);

  const actualSong = useAudioPlayer(song.src);

  useEffect(() => {
   if (songPlayer.score > .5) {
      actualSong.volume = 0;
      actualSong.seekTo(song.offset)
      actualSong.play();
      fadeIn(actualSong, 2000)
   }
  }, [ songPlayer.ended ]);

  return (
    <Row flex={1} position="relative" {...songPlayer.panHandlers}>
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
          backgroundColor={pitch.isPressed ? "red" : undefined}
        >
          {pitch.notes.map((note) => (
            <Column
              key={note.offset}
              position="absolute"
              top={note.offset}
              height={note.height}
              width="100%"
              backgroundColor="grey"
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
        backgroundColor="green"
        bottom={songPlayer.bottomMargin - 50}
      />
    </Row>
  );
}
