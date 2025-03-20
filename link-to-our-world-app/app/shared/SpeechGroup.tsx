import { useEffect, useState } from "react"
import { Speech } from "./Speech";

export type SpeechGroupProps = {
    hasStarted: boolean
    text: string[]
    onFinished?: () => any
}

export function SpeechGroup({ hasStarted, text, onFinished }: SpeechGroupProps) {
    const [ currentIndex, setCurrentIndex ] = useState<null | number>(null);
    const lastIndex = text.length -1

    useEffect(() => {
        if (hasStarted && currentIndex === null) setCurrentIndex(0)
    }, [ hasStarted ])

    return (
        <>
            {text.map( (text, i) => (
                <Speech
                    key={i}
                    hasStarted={currentIndex !== null && currentIndex >= i}
                    onFinished={i !== lastIndex ? () => setCurrentIndex(i + 1) : onFinished}
                    text={text}
                />
            ))}
        </>
    )
}