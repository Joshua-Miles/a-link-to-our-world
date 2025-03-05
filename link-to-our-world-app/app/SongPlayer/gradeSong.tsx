import { SongNote } from "./Song";

export function gradeSong(solution: SongNote[], submission: SongNote[]) {
    const missingFromSolution = getMissing(solution, submission);
    const addativeToSolution = getAddative(solution, submission);
    const totalDuration = getTotalDuration(solution);
    const percentWrong = (missingFromSolution + addativeToSolution) / totalDuration;
    const percentRight = Math.max(0, 1 - percentWrong);
    return percentRight;
}

function getMissing(solution: SongNote[], submission: SongNote[]) {
    let missing = getTotalDuration(solution);
    for (let solutionNote of solution) {
        let pitchMissing = solutionNote.duration;
        for (let submissionNote of submission) {
            if (solutionNote.pitch === submissionNote.pitch) {
                pitchMissing -= overlap(solutionNote, submissionNote);
                missing -= overlap(solutionNote, submissionNote);
            }
        }
    }
    return missing;
}

function getAddative(solution: SongNote[], submission: SongNote[]) {
    let addative = getTotalDuration(submission);
    for (let solutionNote of solution) {
        for (let submissionNote of submission) {
            if (solutionNote.pitch === submissionNote.pitch) {
                addative -= overlap(solutionNote, submissionNote);
            }
        }
    }
    return addative;
}

function getTotalDuration(notes: SongNote[]) {
    return notes.reduce((total, note) => total + note.duration, 0)
}

function overlap(noteA: SongNote, noteB: SongNote) {
    if (within(noteA, noteB)) return noteB.duration;
    if (within(noteB, noteA)) return noteA.duration;
    const [ firstNote, secondNote ] = [ noteA, noteB ].sort( (noteA, noteB) => noteA.startTimeInMS - noteB.startTimeInMS);
    if (firstNote.endTimeInMS < secondNote.startTimeInMS) return 0;
    return firstNote.endTimeInMS - secondNote.startTimeInMS;
}

function within(container: SongNote, target: SongNote) {
    return container.startTimeInMS <= target.startTimeInMS && target.endTimeInMS <= container.endTimeInMS;
}
