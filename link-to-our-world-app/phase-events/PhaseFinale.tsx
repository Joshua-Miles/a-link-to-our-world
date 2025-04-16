import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { listMemories } from "api";
import { Column, Row, timing, useDesignerTheme } from "designer-m3";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Combat, Force, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechGroup, SpeechStepper, usePlayerName, useSequence, wait } from "shared";

export type PhaseFinaleProps = {
    currentForce: Force
    hasStarted: boolean
    onFinished: () => any
}

export function PhaseFinale({ hasStarted, currentForce, onFinished }: PhaseFinaleProps) {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted, onFinished }, [
        'iSense',
        'finally',
        'combat',
        'glitch',
        'soIShallPlayMyOwn',
        'skullKidsTheme',
        'iSenseHeHasWarped',
        'leadingTheKoroksAstray',
        'outro',
        'memoriesFade'
    ])

    if (isLoading(playerName) || isAnyFailure(playerName)) {
        return null;
    }

    const focus = sequence.select({
        iSense: null,
        finally: 'gorruk',
        combat: null,
        glitch: null,
        soIShallPlayMyOwn: 'ganon',
        skullKidsTheme: 'ganon',
        iSenseHeHasWarped: null,
        leadingTheKoroksAstray: 'lumina',
        outro: 'lumina',
        memoriesFade: null
    })

    return (
        <>
            <Soundtrack asset="ganon-theme" isPlaying={hasStarted} />
            {focus && <SceneFocus asset={focus} opacity={sequence.hasNotReached('outro') ? 1 : 0} transitions={{ opacity: timing(60000)}}/>}
            <SpeechCard
                hasStarted={sequence.hasReached('iSense')}
                asset="lumina-avatar"
                text={[`I sense an enemy rapidly approaching.`]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('finally')}
                groups={[
                    [
                        `Finally, I have become stronger than any Boarblin, Keese, Chu, Gibdo or any other form of creature.`,
                        `Stronger than any Hylian.`,
                        `Stronger than you.`
                    ],
                    [
                        `Preimenint over the grove I have claimed for myself and my people.`,
                        `Face me...`,
                        `Face your DOOM!`
                    ]
                ]}
                onFinished={sequence.next}
            />
            {sequence.isAt('combat') &&
                <Combat
                    asset='gorruk'
                    speed={6000}
                    damage={1}
                    fortitude={50}
                    forces={[ 'electric', 'fire', 'ice', 'water' ]}
                    onFinished={sequence.next}
                    // The player has been gifted sword for the current force, but it won't reflect
                    //  in their inventory until the end of the encounter
                    extraItems={[ `${currentForce}-sword` ]}
                />
            }
            <Glitchy hasStarted={sequence.hasReached('glitch')} onFinished={sequence.next} />
            <SpeechStepper
                hasStarted={sequence.hasReached('soIShallPlayMyOwn')}
                groups={[
                    [ `I...` ],
                    [ `I don't understand...` ],
                    [ `I've mastered all 4 forces...`, `I've worked so hard...` ],
                    [ `What is this hideous world that such effort goes unrewarded?` ],
                    [ `These seedlings the goddess has planted, they yeild no fruit for me.`, `The song she sings is not my song.` ],
                    [ `So I shall play my own...` ]
                ]}
                onFinished={sequence.next}
            />
            <Soundtrack 
                isPlaying={sequence.hasReached('skullKidsTheme')} 
                asset="skull-kids-theme-clipped"
            />
            <SpeechCard
                hasStarted={sequence.hasReached('skullKidsTheme')}
                asset="lumina-avatar" 
                text={[ `${playerName}, it appears that Gorrck has the demon flute!` ]}
                onFinished={sequence.next}
            />
            <Soundtrack 
                isPlaying={sequence.hasReached('iSenseHeHasWarped')} 
                asset="skull-kids-theme-clipped-reverb" 
            />
            <SpeechCard
                hasStarted={sequence.hasReached('iSenseHeHasWarped')}
                asset="lumina-avatar" 
                text={[ `I sense that he has warped to the Sacred Grove!` ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('leadingTheKoroksAstray')}
                groups={[
                    [ 
                        `${playerName}! Gorruk is leading the Koroks astray, like the Kokiri in Faron Woods!` 
                    ],
                    [
                        `Without the Korok seeds, I fear that Hyrule can never be restored...`,
                        `It's peoples will continue to fragment...`,
                        `It's great history will be forgotten...`,
                        `And I will be obsolete...`
                    ]
                ]}
                onFinished={sequence.next}
            />
            <Soundtrack 
                isPlaying={sequence.hasReached('outro')} 
                asset="remember-us" 
            />
            <Monologue
                hasStarted={sequence.hasReached('outro')}
                groups={[
                    [[
                        `${playerName}, I owe you an apology.`,
                        `When we first met, I was surprised that the goddess would choose to use someone from a different world to save Hyrule...`
                    ], 2000],
                    [[
                        `But now I think I understand- your future is not bound to the survival of the Koroks.`,
                        `Long after I and the rest of Hyrule have faded, you will live on...`
                    ], 2000],
                    [[
                        `Rember the caution of Grinroot.`,
                    ], 1000],
                    [[
                        `Rember the work ethic of Fayflutter.`,
                    ], 1000],
                    [[
                        `Rember the inclusiveness of Tumblebreeze.`,
                    ], 1000],
                    [[
                        `Rember the activenss of Scribeleaf..`,
                    ], 1000],
                    [[
                        `Remember Us...`,
                    ], 2000]
                ]}
                onFinished={sequence.next}
            />
            <FadingMemories 
                hasStarted={sequence.hasReached('memoriesFade')}
                onFinished={sequence.next}
            />
        </>
    )
}

type GlitchyProps = {
    hasStarted: boolean;
    onFinished: () => any;
}

function Glitchy({ hasStarted, onFinished }: GlitchyProps) {
    const assets: string[] = [
        'fire-gorruk',
        'electric-gorruk',
        'water-gorruk',
        'ice-gorruk'
    ]

    function getRandomAsset(options?: { not: string }) {
        let asset = null;
        while (asset === null || asset === options?.not) {
            asset = assets[Math.floor(Math.random()*assets.length)];
        }
        return asset;
    }

    const [ currentAsset, setCurrentAsset ] = useState(getRandomAsset());

    const [ hasFinished, setHasFinished ] = useState(false);

    async function glitch() {
        const start = Date.now();
        const end = start + 3000;
        let now = start;
        let lag = 500;
        while (now < end) {
            now = Date.now();
            setCurrentAsset(currentAsset => getRandomAsset({ not: currentAsset }))
            await wait(lag)
            lag = lag * .75;
        }
        setHasFinished(true);
        onFinished();
    }

    useEffect(() => {
        if (hasStarted && !hasFinished) {
            glitch();
        }
    }, [ hasStarted, hasFinished ])

    if (!hasStarted || hasFinished) return null;

    return (
        <SceneFocus asset={currentAsset} />
    )
}


type MonologueGroup = [string[], number]

export type MonologueProps = Parameters<typeof Column>[0] & {
    hasStarted: boolean
    groups: MonologueGroup[]
    onNext?: () => any
    onFinished?: () => any
}


export function Monologue({ hasStarted, groups, onNext, onFinished, ...columnProps }: MonologueProps) {
    const { spacing } = useDesignerTheme();

    const sequence = useSequence({ hasStarted, onFinished: handleSequenceFinished }, [
        'fadeIn',
        'speechPlaying',
        'delay',
        'fadeOut',
    ])

    const [ currentGroupIndex, setCurrentGroupIndex ] = useState(0);

    const lastGroupIndex = groups.length - 1;

    function handleSequenceFinished() {
        if (currentGroupIndex !== lastGroupIndex) {
            onNext?.()
            sequence.restart();
            setCurrentGroupIndex(currentGroupIndex + 1);
        } else {
            onFinished?.();
        }
    }

    useEffect(() => {
        if (sequence.hasReached('delay')) {
            setTimeout(() => sequence.next(), groups[currentGroupIndex][1])
        }
    }, [ sequence.hasReached('delay' )])

    if (!hasStarted || sequence.hasFinished()) {
        return null;
    }

    return (
        <Column
            flex={1}
            gap={spacing.sm}
            alignItems="center"
            {...columnProps}
            opacity={sequence.has({ reached: 'fadeIn', notReached: 'fadeOut' }) ? 1 : 0}
            transitions={{ opacity: timing(500).then(sequence.next) }}
        >
            <SpeechGroup
                key={`speech.${currentGroupIndex}`}
                hasStarted={sequence.hasReached('speechPlaying')}
                text={groups[currentGroupIndex][0]}
                onFinished={sequence.next}
            />
        </Column>
    )
}

type FadingMemoriesProps = {
    hasStarted: boolean
    onFinished: () => any
}

function FadingMemories({ hasStarted, onFinished }: FadingMemoriesProps) {
    const memories = useResult(listMemories);

    const [ fadeIndex, setFadeIndex ] = useState<number>(-1);

    useEffect(() => {
        if (fadeIndex === -1 && hasStarted) {
            setFadeIndex(0)
        }
    }, [ hasStarted ])

    useEffect(() => {
        if (!isLoading(memories) && memories.length === fadeIndex) {
            onFinished();
        }
    }, [ fadeIndex ])

    if (!hasStarted || (!isLoading(memories) && memories.length === fadeIndex)) {
        return null;
    }

    return (
        <Row flex={1} flexWrap="wrap">
            {!isLoading(memories) && memories.map( (memory, index) => (
                <Column width="50%" key={memory.slug} opacity={index <= fadeIndex ? 0 : 1} transitions={{ opacity: timing(2000).then(() => setFadeIndex(fadeIndex+1)) }} justifyContent="center">
                    <Image
                        style={{ width: 200, height: 200, objectFit: 'cover' }}
                        source={{ uri: memory.imageUrl.toString() }}
                    />
                </Column>
            ))}
        </Row>
    )
}
