import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getEncounter, resolveEncounter } from "api";
import { dialog, Dialog, Friends, Scene, SceneFocus, Soundtrack, SpeechCard, SpeechStepper, usePlayerName, useSequence } from "shared";
import { router } from "expo-router";
import { Button, Column, Display, Label, timing } from "designer-m3";
import { ArrowLeftIcon, ArrowRightIcon } from "designer-m3/icons";

export default function () {
    const playerName = usePlayerName();

    const sequence = useSequence({ hasStarted: true, onFinished: handleFinished }, [
        'wereAllGrownUp',
        'youPlantedAndWateredUs',
        'andRemindedUsWhoWeWere',
        'iBetItWasHard',
        'butItWasWorthIt',
        'soGladYoureSafe',
        'youreAllHere',
        'someOfYouWeDontKnowYet',
        'toldUsOfYourCaution',
        'andInclusivenss',
        'andWorkEthic',
        'andDecisiveness',
        'butYouTaughtUs',
        'atLast',
        'iDontGetIt',
        'willYouRestoreHyrule',
        'koroksWill',
        'sagesWill',
        'thenLetThisPassIntoLegend',
        'credits',
        'continue'
    ])

    function handleFinished() {
        resolveEncounter('finale/epilogue', {});
        router.push('/map');
    }

    if (isLoading(playerName) || isAnyFailure(playerName)) {
        return null;
    }

    return (
        <Scene>
            <Soundtrack asset="zeldas-lullabye" />
            {sequence.hasNotReached('butItWasWorthIt') && <SceneFocus asset="korok-seedlings" />}
            {sequence.has({ reached: 'butItWasWorthIt', notReached: 'atLast' }) && <Friends />}
            {sequence.has({ reached: 'atLast', notReached: 'willYouRestoreHyrule' }) && <SceneFocus asset="lumina" />}
            {sequence.isAt('willYouRestoreHyrule') && <SceneFocus asset="impa" />}
            {sequence.isAt('koroksWill') && <SceneFocus asset="korok-seedlings" />}
            {sequence.isAt('sagesWill') && <Friends />}
            {sequence.isAt('thenLetThisPassIntoLegend') && <SceneFocus asset="impa" />}
            <SpeechCard
                hasStarted={sequence.hasReached('wereAllGrownUp')}
                asset="grinroot"
                text={[`${playerName}! We're all grown up now!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('youPlantedAndWateredUs')}
                asset="tumblebreeze"
                text={[`You planted and watered us!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('andRemindedUsWhoWeWere')}
                asset="scribeleaf"
                text={[`And reminded us who we were, when Gorruk tried to make us forget...`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('iBetItWasHard')}
                asset="fayflutter"
                text={[`I bet it was hard...`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('butItWasWorthIt')}
                asset="tidebane-avatar"
                text={[`But it was worth it.`, `O' ${playerName} loves you quite a lot.`, `So do I, come to think of it...`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('soGladYoureSafe')}
                asset="nimri-avatar"
                text={[`We're so glad you're safe!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('youreAllHere')}
                asset="scribeleaf"
                text={[`Woah! You're all here!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('someOfYouWeDontKnowYet')}
                asset="tumblebreeze"
                text={[`And some of you we don't even know yet!`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('toldUsOfYourCaution')}
                asset="darvok-avatar"
                text={[`But we know you.`, `${playerName} told us of your caution.`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('andInclusivenss')}
                asset="ravia-avatar"
                text={[`And inclusivenss.`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('andWorkEthic')}
                asset="thurnok-avatar"
                text={[`And work ethic.`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('andDecisiveness')}
                asset="sorai-avatar"
                text={[`And decisivenss.`, `You've inspired all of us, and united the fragmented people of Hyrule.`]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('butYouTaughtUs')}
                asset="scribeleaf"
                text={[`But ${playerName}...`, `You taught us all those things...`]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('atLast')}
                groups={[
                    [
                        `${playerName}, I think I owe you one last apology...`,
                        'At last, I truly understand why only you could restore Hyrule.'
                    ]
                ]}
                onFinished={sequence.next}
            />
            <SpeechCard
                hasStarted={sequence.hasReached('iDontGetIt')}
                asset="grinroot"
                text={[`I don't get it...`]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('willYouRestoreHyrule')}
                groups={[
                    [
                        `We must not sit around here all day.`,
                    ],
                    [
                        `Koroks and Sages, now that you are united, do you vow to work together to restore and protect the once and future kingdom of Hyrule?`
                    ]
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('koroksWill')}
                groups={[
                    [
                        `We do.`,
                    ],
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('sagesWill')}
                groups={[
                    [
                        `We do!`,
                    ],
                ]}
                onFinished={sequence.next}
            />
            <SpeechStepper
                hasStarted={sequence.hasReached('thenLetThisPassIntoLegend')}
                groups={[
                    [
                        `Then by Hylia's grace, I pray you will succeed...`,
                    ],
                    [
                        `And that this moment pass into legend...`,
                    ],
                ]}
                onFinished={sequence.next}
            />
            <Soundtrack isPlaying={sequence.hasReached('credits')} asset="staff-roll" fadeDuration={0} />
            <Column display={sequence.hasReached('credits') ? 'flex': 'none'} height="100%" width="100%" justifyContent="center" alignItems="center"
                opacity={0}
                _displayed={{ opacity: 1 }}
                transitions={{
                    opacity: timing(2000).then(() => setTimeout(() => sequence.next(), 5000))
                }}
            >
                <Column position="relative"  height={150} width={300}>
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
                <Button.Text mt={32} onPress={sequence.next} opacity={sequence.hasReached('continue') ? 1 : 0} transitions={{ opacity: timing(1000) }}>
                    Thank you for playing <ArrowRightIcon />
                </Button.Text>
            </Column>
        </Scene>
    )
}
