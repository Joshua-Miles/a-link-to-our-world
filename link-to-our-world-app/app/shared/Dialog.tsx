import { Button, Column, ListItemLeadingIcon, ListItemTitle, PressableListItem, RadioButton, RadioGroup, timing } from "designer-m3";
import { useEffect, useState } from "react";
import { wait } from "./wait";
import { useSequence } from "./useSequence";
import { Speech } from "./Speech";
import { ArrowRightIcon } from "designer-m3/icons";

export function dialog(text: string, responses: Record<string, DialogNode> = {}){
    return { text, responses }
}

type DialogNode = {
    text: string
    responses: Record<string, DialogNode>
}

type DialogProps = Parameters<typeof Column>[0] & {
    tree: DialogNode
    onFinished?: (selections: string[]) => any
}

export function Dialog({ tree, onFinished, ...props }: DialogProps) {
    const [ node, setNode ] = useState<DialogNode>(tree);
    const [selections, setSelections] = useState<string[]>([])

    const [ value, setValue ] = useState<string | null>(null);

    const sequence = useSequence({ hasStarted: true, onFinished: handleSequenceEnd }, [
        'fadeIn',
        'speech',
        'optionsIn',
        'fadeOut',
    ])

    const options = Object.keys(node.responses)

    async function handleRespond() {
        if (!value) return;
        sequence.next();
        await wait(500);
        setSelections([ ...selections, value ])
        setNode(node.responses[value]);
        setValue(null)
    }

    function handleSequenceEnd() {
        sequence.jumpTo('fadeIn')
    }

    return (
        <Column
            opacity={sequence.hasStarted() && sequence.hasNotReached('fadeOut') ? 1 : 0}
            alignItems="center"
            justifyContent="space-between"
            transitions={{ opacity: timing(500).then(sequence.next) }}
            {...props}
        >
            <Speech hasStarted={sequence.hasReached('speech')} text={node.text} onFinished={sequence.next} />
            <Column width="100%" gap={24} pb={32} opacity={sequence.has({ reached: 'optionsIn', notReached: 'fadeOut' }) ?  1 : 0} transitions={{ opacity: timing(500) }}>
                <Column gap={4}>
                    {options.length &&
                        <RadioGroup value={value} onChange={setValue}>
                            {options.map( option => (
                                <PressableListItem key={option} onPress={() => setValue(option)}>
                                    <ListItemLeadingIcon>
                                        <RadioButton value={option} />
                                    </ListItemLeadingIcon>
                                    <ListItemTitle>
                                        {option}
                                    </ListItemTitle>
                                </PressableListItem>
                            ))}
                        </RadioGroup>}
                    {!options.length && (
                        <Column alignItems="center">
                            <Button.Text onPress={() => onFinished?.(selections)}>
                                Next <ArrowRightIcon />
                            </Button.Text>
                        </Column>
                    )}
                </Column>
                {options.length > 0 && (
                    <Button.Filled disabled={value === null} onPress={handleRespond}>
                        Submit
                        <ArrowRightIcon />
                    </Button.Filled>
                )}
            </Column>
        </Column>
    )
}