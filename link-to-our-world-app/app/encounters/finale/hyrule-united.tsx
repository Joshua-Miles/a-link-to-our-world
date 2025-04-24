import { isAnyFailure } from "@triframe/ambassador";
import { isLoading } from "@triframe/utils-react";
import { Assets, Scene, SpeechCard, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";
import { Column } from "designer-m3";
import { Image } from "react-native";
import { resolveEncounter } from "api";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'hoarde',
        'kyllis',
        'tavon',
        'nimri',
        'tidebane',
        'sorai',
        'thurnok',
        'ravia',
        'darvok',
    ])

    function handleFinished() {
        resolveEncounter('finale/hyrule-united', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isAnyFailure(playerName)) {
        return null;
    }

    return (
        <Scene>
            {sequence.isAt('hoarde') ? <Hoarde /> : <Friends />}
            <SpeechCard
                hasStarted={sequence.hasReached('hoarde')}
                asset="ganon-avatar"
                text={[`${playerName}! You cannot escape me!`, `You have only tasted the first fruits of my hoard!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('kyllis')}
                asset="kyllis-avatar"
                text={[`Don't worry, ${playerName}. We've got this...`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('tavon')}
                asset="tavon-avatar"
                text={[`We came as soon as we heard- we didn't read or anything!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('nimri')}
                asset="nimri-avatar"
                text={[`It's our job to keep those little seedlings safe!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('tidebane')}
                asset="tidebane-avatar"
                text={[`Aye, I love those little sprouts`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('sorai')}
                asset="sorai-avatar"
                text={[`You made us love them, ${playerName}.`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('thurnok')}
                asset="thurnok-avatar"
                text={[`You do what you need to do to save those little ones, Friendo. We'll hold off the monsters.`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('ravia')}
                asset="ravia-avatar"
                text={[
                    `For the first time in an age, the monsters of Hyrule will face an alliance of:`,
                    `the Gerudo, the Gorons, the Llorons, the Zora,`, 
                    `the Rito, the Kokiri, the Faries, and even the Pirates.`
                ]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('darvok')}
                asset="darvok-avatar"
                text={[`For the Korok Seedlings, Goro! CHARGE!!!!`]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}

function Hoarde() {
    return (
        <Column height="50%" width="100%" top="10%" position="relative">
            <SceneImage width="50%" height="45%" top="-4%" left="40%" asset="talus" />
            <SceneImage width="25%" height="25%" top="12%" left="10%" asset="water-moblin" />
            <SceneImage width="20%" height="20%" top="20%" left="48%" asset="deku-baba" />
            <SceneImage width="16%" height="16%" top="0%" left="24%" asset="fire-keese" />
            <SceneImage width="16%" height="16%" top="35%" left="64%" asset="ice-chu" />
            <SceneImage width="40%" height="40%" top="20%" left="22%" asset="lizalfos" />
        </Column>
    )
}

function Friends() {
    return (
        <Column height="50%" top="10%" width="100%" position="relative">
            <SceneImage width="50%" height="50%" top="-4%" left="10%" asset="thurnok" />
            <SceneImage width="55%" height="55%" top="-8%" left="40%" asset="darvok" />
            <SceneImage width="25%" height="40%" top="4%" left="4%" asset="tidebane" />
            <SceneImage width="45%" height="40%" top="10%" left="4%" asset="ravia" />
            <SceneImage width="25%" height="40%" top="4%" left="70%" asset="kyllis" />
            <SceneImage width="30%" height="30%" top="20%" left="58%" asset="tavon" />
            <SceneImage width="35%" height="35%" top="15%" left="30%" asset="sorai" />
            <SceneImage width="12%" height="12%" top="0%" left="1%" asset="nimri" />
        </Column>
    )
}

function SceneImage({ asset, width, ...props }: Parameters<typeof Column>[0] & { asset: string }) {
    return <Column position="absolute" width={width} {...props}>
        <Image source={Assets[asset]} style={{ width: '100%', height: '100%', objectFit: 'contain'}} />
    </Column>
}
