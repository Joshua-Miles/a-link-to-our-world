import { useState } from "react";
import { SongPlayer, Soundtrack } from "./shared";
import { mainTheme, dragonRootTheme, skyTheme, wildsTheme, fairyTheme } from "./shared/testSongs";

export default function () {
    const [ hasWon, setHasWon ] = useState(false);
    const song = skyTheme
    return (
        <>
            <Soundtrack isPlaying={hasWon} asset={song.src} offset={song.offset} />
            <SongPlayer song={song} onFinished={() => setHasWon(true)} />
        </>
    )
}


