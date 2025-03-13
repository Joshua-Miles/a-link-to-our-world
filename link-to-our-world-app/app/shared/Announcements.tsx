import { isLoading, useResult } from "@triframe/utils-react";
import { acknowledgeObjective, acknowledgeObjectiveCompleted, listObjectives } from "api";
import { Column, Display, Label, RowReverse, Theme, useDesignerTheme } from "designer-m3";
import { useEffect, useState } from "react";

type Objective = Awaited<ReturnType<typeof listObjectives>>[number]

export function Announcements() {
    const objectives = useResult(listObjectives);

    const [ displayedObjective, setDisplayedObjective ] = useState<Objective | null>();
    const [ fade, setFade ] = useState<null | 'in' | 'out'>(null);

    const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time));

    async function handleObjective() {
        if (isLoading(objectives)) return;

        const unacknowledgedObjectives = objectives.filter( objective => (
            objective.acknowledged === false
             ||
            (objective.completed === true && objective.completionAcknowledged === false)
        ))

        if (unacknowledgedObjectives.length === 0) return;
        const objective = unacknowledgedObjectives[0]

        setDisplayedObjective(objective)
        await wait(1500)
        setFade('in');
        await wait(2500)
        setFade('out')
        await wait(1000)
        setDisplayedObjective(null)
        if (!objective.completed) {
            await acknowledgeObjective(objective.slug)
        } else {
            await acknowledgeObjectiveCompleted(objective.slug);
        }
    }

    useEffect(() => {
        handleObjective()
    }, [  objectives ])

    if (displayedObjective) {
        return (
            <AnnouncementBanner opacity={fade === 'in' ? 1 : 0}>
                <Label.Small color="black">New Objective</Label.Small>
                <Display.Medium color="black">{displayedObjective.title}</Display.Medium>
               {displayedObjective.completed &&
                    <RowReverse width="100%">
                        <Label.Large color="black">
                            Completed
                        </Label.Large>
                    </RowReverse>
                }
            </AnnouncementBanner>
        )
    }

    return null;
}

const AnnouncementBanner = Column.style( (theme: Theme) => ({
    opacity: 0,
    position: 'fixed',
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.5)',
    top: theme.spacing['2xl'],
    width: '100%',
    alignItems: 'center',
    gap: theme.spacing.xs,
    transitions: {
        opacity: theme.motion.transitions.standard
    }
}))