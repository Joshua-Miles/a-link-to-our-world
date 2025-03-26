import { Column, IconButton, Row, timing, useDesignerTheme } from "designer-m3"
import { Image } from "react-native";
import { Assets } from "./Assets";
import { Speech } from "./Speech";
import { useSequence } from "./useSequence";
import { useState } from "react";
import { ArrowRightIcon } from "designer-m3/icons";

export type SpeechCardProps = {
    asset: string
    text: string[]
    hasStarted?: boolean
    onFinished?: () => any;
}

export function SpeechCard({ hasStarted = true, asset, text, onFinished }: SpeechCardProps) {
    const { colors } = useDesignerTheme();

     const sequence = useSequence({ hasStarted, onFinished: handleSequenceFinished }, [
            'fadeIn',
            'speechPlaying',
            'nextDisplayed',
            'fadeOut',
        ])
    
        const [ currentIndex, setCurrentGroupIndex ] = useState(0);
    
        const lastIndex = text.length - 1;
    
        function handleSequenceFinished() {
            if (currentIndex !== lastIndex) {
                setCurrentGroupIndex(currentIndex + 1);
                sequence.jumpTo('fadeIn');
            } else {
                onFinished?.();
            }
        }

    return (
        <Row p={16} gap={8} backgroundColor={colors.roles.surfaceContainerHighest} alignItems="center">
            <Image style={{ height: 60, width: 60,  objectFit: 'cover' }} source={Assets[asset]}/>
            <Column
                flex={1}
                opacity={0}
                _displayed={{
                    opacity: sequence.has({ reached: 'fadeIn', notReached: 'fadeOut' }) ? 1 : 0
                }}
                transitions={{ opacity: timing(500).then(sequence.next) }}
            >
                <Speech 
                    key={currentIndex}
                    hasStarted={sequence.hasReached('speechPlaying')} 
                    text={text[currentIndex]} 
                    onFinished={sequence.next}
                    textAlign="left"
                />
            </Column>
            <IconButton.Standard 
                key={`next.${currentIndex}`} 
                opacity={sequence.hasReached('nextDisplayed') ? 1 : 0} 
                transitions={{ opacity: timing(500) }} 
                onPress={sequence.next}
            >
                <ArrowRightIcon />
            </IconButton.Standard>
        </Row>
    )
}
