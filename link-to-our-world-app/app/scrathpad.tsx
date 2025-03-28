import { useState } from "react";
import { SongPlayer, Soundtrack } from "./shared";
import { dragonRootTheme, skyTheme } from "./shared/testSongs";

export default function () {
    const [ hasWon, setHasWon ] = useState(false);
    const song = dragonRootTheme
    return (
        <>
            <Soundtrack isPlaying={hasWon} asset={song.src} offset={song.offset} />
            <SongPlayer song={song} onFinished={() => setHasWon(true)} />
        </>
    )
}
