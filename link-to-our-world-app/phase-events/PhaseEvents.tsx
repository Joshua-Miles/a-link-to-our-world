import { isAnyFailure } from "@triframe/ambassador";
import { isLoading, useResult } from "@triframe/utils-react";
import { getTemplesWatered } from "api";
import { useEffect, useState } from "react";
import { PhaseMidpoint } from "./PhaseMidpoint";
import { PhaseFinale } from "./PhaseFinale";
import { Force } from "shared";

export type PhaseEventsProps = {
    currentForce: Force;
    hasStarted: boolean
    onFinished: () => any
}

export function PhaseEvents({ hasStarted, onFinished, currentForce }: PhaseEventsProps) {
    const templesWatered = useResult(getTemplesWatered)

    const [ event, setEvent ] = useState<null | 'midpoint' | 'finale'>(null);

    useEffect(() => {
        if (hasStarted && !isLoading(templesWatered) && !isAnyFailure(templesWatered)) {
            if (templesWatered.totalComplete == 1) {
                setEvent('midpoint')
            } else if (templesWatered.totalComplete === 3) {
                setEvent('finale')
            } else {
                onFinished();
            }
        }
    }, [templesWatered, hasStarted])

    return (
        <>
            <PhaseMidpoint hasStarted={event === 'midpoint'} currentForce={currentForce} onFinished={onFinished} />
            <PhaseFinale hasStarted={event === 'finale'} currentForce={currentForce} onFinished={onFinished} />
        </>
    )
}
