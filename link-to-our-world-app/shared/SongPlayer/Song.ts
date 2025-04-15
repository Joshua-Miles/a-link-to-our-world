

export type NotePitch = string;

export type Note = {
    pitch: NotePitch | null
    beats: number
}

export type SongNote = {
    pitch: NotePitch;
    beats: number;
    duration: number;
    startTimeInMS: number;
    startTimeInBeats: number;
    endTimeInMS: number;
    endTimeInBeats: number;
}

export type SongNoteOrRest = Omit<SongNote, 'pitch'> & {
    pitch: NotePitch | null
}

const MINUTE_DURATION = 60000;

export class Song {
    readonly bpm: number;
    readonly beatDuration: number;
    readonly notesWithRests: SongNoteOrRest[];
    readonly notes: SongNote[];
    readonly durationInMS: number;
    readonly durationInBeats: number;
    readonly pitches: NotePitch[];

    constructor(bpm: number, notes: Note[]) {
        this.bpm = bpm;
        this.beatDuration = MINUTE_DURATION / bpm;
        this.notesWithRests = this.parseNotes(notes);
        this.notes = this.notesWithRests.filter( (note): note is SongNote => note.pitch !== REST);
        this.durationInMS = notes.reduce((duration, note) => duration + note.beats * this.beatDuration, 0);
        this.durationInBeats = this.durationInMS / this.beatDuration;
        this.pitches = this.parsePitches(notes);
    }

    private parseNotes(notes: Note[]): SongNoteOrRest[] {
        let time = 0;
        return notes.map( note => {
            const startTimeInMS = time;
            const startTimeInBeats = startTimeInMS / this.beatDuration;
            const duration = note.beats * this.beatDuration;
            time += duration;
            const endTimeInMS = time;
            const endTimeInBeats = endTimeInMS / this.beatDuration;
            return {
                ...note,
                pitch: note.pitch,
                duration,
                startTimeInMS,
                startTimeInBeats,
                endTimeInMS,
                endTimeInBeats
            }
        })
    }

    private parsePitches(notes: Note[]): NotePitch[] {
        const songPitches = notes.map( note => note.pitch);
        const result: NotePitch[] = allPitches.filter( pitch => songPitches.includes(pitch));
        return result;
    }
}

const makeMusicNote = (beats: number) => (pitch: NotePitch | null): Note => ({
    pitch,
    beats
})

export const REST = null;

export const whole = makeMusicNote(4);

export const half = makeMusicNote(2);

export const quarter = makeMusicNote(1);

export const eighth = makeMusicNote(.5);

export const dotted = (note: Note): Note => ({
    ...note,
    beats: 1.5 * note.beats
})

const allPitches = [
    'C2Flat',
    'C2',
    'C2Sharp',
    'D2Flat',
    'D2',
    'D2Sharp',
    'E2Flat',
    'E2',
    'E2Sharp',
    'F2Flat',
    'F2',
    'F2Sharp',
    'G2Flat',
    'G2',
    'G2Sharp',
    'A2Flat',
    'A2',
    'A2Sharp',
    'B2Flat',
    'B2',
    'B2Sharp',

    'C3Flat',
    'C3',
    'C3Sharp',
    'D3Flat',
    'D3',
    'D3Sharp',
    'E3Flat',
    'E3',
    'E3Sharp',
    'F3Flat',
    'F3',
    'F3Sharp',
    'G3Flat',
    'G3',
    'G3Sharp',
    'A3Flat',
    'A3',
    'A3Sharp',
    'B3Flat',
    'B3',
    'B3Sharp',

    'C4Flat',
    'C4',
    'C4Sharp',
    'D4Flat',
    'D4',
    'D4Sharp',
    'E4Flat',
    'E4',
    'E4Sharp',
    'F4Flat',
    'F4',
    'F4Sharp',
    'G4Flat',
    'G4',
    'G4Sharp',
    'A4Flat',
    'A4',
    'A4Sharp',
    'B4Flat',
    'B4',
    'B4Sharp',

    'C5Flat',
    'C5',
    'C5Sharp',
    'D5Flat',
    'D5',
    'D5Sharp',
    'E5Flat',
    'E5',
    'E5Sharp',
    'F5Flat',
    'F5',
    'F5Sharp',
    'G5Flat',
    'G5',
    'G5Sharp',
    'A5Flat',
    'A5',
    'A5Sharp',
    'B5Flat',
    'B5',
    'B5Sharp',
   
    'C6Flat',
    'C6',
    'C6Sharp',
    'D6Flat',
    'D6',
    'D6Sharp',
    'E6Flat',
    'E6',
    'E6Sharp',
    'F6Flat',
    'F6',
    'F6Sharp',
    'G6Flat',
    'G6',
    'G6Sharp',
    'A6Flat',
    'A6',
    'A6Sharp',
    'B6Flat',
    'B6',
    'B6Sharp',
]