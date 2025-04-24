import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, listMemories, resolveEncounter } from "api";
import { Assets, dialog, Dialog, dragonRootTheme, fairyTheme, Scene, SceneFocus, skyTheme, SongPlayer, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence, wildsTheme, zeldasLullaby } from "shared";
import { router } from "expo-router";
import { Image, ImageProps } from "react-native";
import { Column, timing } from "designer-m3";

export default function () {
    const playerName = usePlayerName();
    const memories = useResult(listMemories);

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'intro',
        'youAreHardWorking',
        'fairyTheme',
        'youAreCautious',
        'dragonRoostTheme',
        'youAreWelcoming',
        'skyTheme',
        'youAreDecisive',
        'wildsTheme',
        'iKnowWhoYouAre',
        'zeldasLullaby',
        'outro'
    ])

    function handleFinished() {
        resolveEncounter('finale/songs', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isAnyFailure(playerName) || isLoading(memories) || isAnyFailure(memories)) {
        return null;
    }

    const fayflutter = memories.find(memory => memory.slug === 'planting-fayflutter')
    const grinroot = memories.find(memory => memory.slug === 'planting-grinroot')
    const tumblebreeze = memories.find(memory => memory.slug === 'planting-tumblebreeze')
    const scribeleaf = memories.find(memory => memory.slug === 'planting-scribeleaf')

    return (
        <Scene>
            <Soundtrack 
                isPlaying={sequence.hasNotReached('youAreHardWorking')}
                asset="eclipse-of-the-world"
            />
            <SpeechStepper
                justifyContent="center"
                hasStarted={sequence.hasReached('intro')}
                groups={[
                    [ 
                        `Out of the grove I called you.`,
                        `In my sacred temples were you watered.`
                    ]
                ]}
                onFinished={sequence.next}
            />
            {sequence.has({reached: 'youAreHardWorking', notPassed: 'fairyTheme'}) && fayflutter && (
                <Background opacity={sequence.hasReached('fairyTheme') ? 1 : 0} source={{ uri: fayflutter.imageUrl.toString() }} />
            )}
            <SpeechStepper
                justifyContent="center"
                hasStarted={sequence.hasReached('youAreHardWorking')}
                groups={[
                    [ 
                        `You are hard working...`,
                    ]
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('fairyTheme') && <SongPlayer song={fairyTheme} onFinished={sequence.next}/>}
            {sequence.has({reached: 'youAreCautious', notPassed: 'dragonRoostTheme'}) && grinroot && (
                <Background opacity={sequence.hasReached('dragonRoostTheme') ? 1 : 0} source={{ uri: grinroot.imageUrl.toString() }} />
            )}
            <SpeechStepper
                justifyContent="center"
                hasStarted={sequence.hasReached('youAreCautious')}
                groups={[
                    [ 
                        `You are cautious...`,
                    ]
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('dragonRoostTheme') && <SongPlayer song={dragonRootTheme} onFinished={sequence.next}/>}
            {sequence.has({reached: 'youAreWelcoming', notPassed: 'skyTheme'}) && tumblebreeze && (
                <Background opacity={sequence.hasReached('skyTheme') ? 1 : 0} source={{ uri: tumblebreeze.imageUrl.toString() }} />
            )}
            <SpeechStepper
                justifyContent="center"
                hasStarted={sequence.hasReached('youAreWelcoming')}
                groups={[
                    [ 
                        `You are welcoming to all...`,
                    ]
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('skyTheme') && <SongPlayer song={skyTheme} onFinished={sequence.next}/>}
            {sequence.has({reached: 'youAreDecisive', notPassed: 'wildsTheme'}) && scribeleaf && (
                <Background opacity={sequence.hasReached('wildsTheme') ? 1 : 0} source={{ uri: scribeleaf.imageUrl.toString() }} />
            )}
            <SpeechStepper
                justifyContent="center"
                hasStarted={sequence.hasReached('youAreDecisive')}
                groups={[
                    [ 
                        `You are decisive...`,
                    ]
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('wildsTheme') && <SongPlayer song={wildsTheme} onFinished={sequence.next}/>}
            {sequence.has({reached: 'iKnowWhoYouAre', notPassed: 'zeldasLullaby'}) && scribeleaf && (
                <Background opacity={sequence.hasReached('zeldasLullaby') ? 1 : 0} source={Assets['korok-seedlings']} objectFit="contain"/>
            )}
            <SpeechStepper
                justifyContent="center"
                hasStarted={sequence.hasReached('iKnowWhoYouAre')}
                groups={[
                    [ 
                        `I`,
                        `Know`,
                        `Who`,
                        `You`,
                        `Are`
                    ]
                ]}
                durations={[
                    [
                        500,
                        500,
                        500,
                        500,
                        500
                    ]
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('zeldasLullaby') && <SongPlayer song={zeldasLullaby} onFinished={sequence.next}/>}
            <Soundtrack isPlaying={sequence.hasReached('outro')} asset="last-catch" offset={40}   />
            <SpeechCard
                hasStarted={sequence.hasReached('outro')}
                asset="impa-avatar"
                text={[ 
                    `${playerName}! Come quickly!`
                ]}
                onFinished={sequence.next}
            />
        </Scene>
    )
}



function Background({ source, objectFit = 'cover', ...props }: Parameters<typeof Column>[0] & { source: ImageProps['source'], objectFit?: 'cover' | 'contain' }) {
    return (
        <Column {...props} position="absolute" transitions={{ opacity: timing(10000) }} width="100%" height="100%">
            <Image
                style={{ width: '100%', height: '100%', objectFit }}
                source={source}
            />
        </Column>
    )
}

/**

useResult(getEncounter, 'x/x')

<Dialog 
    hasStarted={sequence.hasReached('intro')}
    tree={dialog(`x`)}
    onFinished={sequence.next}
/>

<SpeechStepper
    hasStarted={sequence.hasReached('intro')}
    groups={[
        [ `x` ]
    ]}
    onFinished={sequence.next}
/>

<SpeechCard
    hasStarted={sequence.hasReached('intro')}
    text={[ 
        `x`
    ]}
    onFinished={sequence.next}
/>

*/
