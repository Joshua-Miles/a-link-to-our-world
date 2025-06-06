import { Button, Column, timing, useDesignerTheme } from "designer-m3";
import { useEffect, useState } from "react";
import { useSequence } from "./useSequence";
import { SpeechGroup } from "./SpeechGroup";
import { ArrowRightIcon } from "designer-m3/icons";

export type SpeechStepperProps = Parameters<typeof Column>[0] & {
    hasStarted: boolean
    groups: string[][]
    durations?: number[][]
    onNext?: () => any
    onFinished?: () => any
}


export function SpeechStepper({ hasStarted, groups, durations, onNext, onFinished, ...columnProps }: SpeechStepperProps) {
    const { spacing } = useDesignerTheme();

    const sequence = useSequence({ hasStarted, onFinished: handleSequenceFinished }, [
        'fadeIn',
        'speechPlaying',
        'nextDisplayed',
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
                text={groups[currentGroupIndex]}
                durations={durations?.[currentGroupIndex]}
                onFinished={sequence.next}
            />
            <Button.Text key={`next.${currentGroupIndex}`} opacity={sequence.hasReached('nextDisplayed') ? 1 : 0} transitions={{ opacity: timing(500) }} onPress={sequence.next}>
                Next <ArrowRightIcon />
            </Button.Text>
        </Column>
    )
}