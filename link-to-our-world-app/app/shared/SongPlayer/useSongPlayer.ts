import { useEffect, useRef, useState } from "react";
import { NativeTouchEvent, PanResponder, useWindowDimensions } from "react-native";
import { difference } from "utils";
import { gradeSong } from "./gradeSong";
import { Note, REST, Song, SongNote, whole } from "./Song";
import { useNotes } from "./useNotes";

type SongPlayerState = {
    startTime: number;
    started: boolean;
    score: number;
    ended: boolean;
    pressedPitches: string[];
    recordedNotes: SongNote[];
    pressTimes: Record<string, number>;
};

export type SongData = {
    bpm: number
    notes: Note[]
    src: string;
    offset: number;
}

export function useSongPlayer(songData: SongData) {
    const beatHeight = 200;
    const bottomMargin = 150;

    const song = new Song(songData.bpm, [whole(REST), ...songData.notes]);
    const pitches = song.pitches;
    const screen = useWindowDimensions();
    const notes = useNotes(pitches);
    const [state, setState] = useState<SongPlayerState>({
        startTime: 0,
        started: false,
        ended: false,
        score: 0,
        pressedPitches: [],
        recordedNotes: [],
        pressTimes: {},
    });

    function start() {
        setState((state) => ({ ...state, score: 0, recordedNotes: [], ended: false, started: true, startTime: Date.now() }));
        setTimeout(() => handleSongEnd.current(), song.durationInMS);
    }

    useEffect(() => {
        if (!state.started) start()
    }, [ state.started ]);

    const pianoWidth = screen.width - 80;
    const keyWidth = pianoWidth / pitches.length;

    function touchesToPitches(touches: NativeTouchEvent[]) {
        return touches
            .map((touch) => {
                const index = Math.floor((touch.pageX-40) / keyWidth);
                return pitches[index];
            })
            .filter((pitch) => pitch !== undefined);
    }

    function createNoteForPressedPitch(pitch: string): SongNote {
        const now = Date.now() - state.startTime;
        const startTimeInMS = state.pressTimes[pitch];
        const endTimeInMS = now;
        const duration = now - state.pressTimes[pitch];
        return {
            pitch,
            beats: Math.round(duration / song.beatDuration),
            startTimeInBeats: startTimeInMS / song.beatDuration,
            endTimeInBeats: now / song.beatDuration,
            startTimeInMS,
            endTimeInMS,
            duration,
        };
    }

    function _handleTouchChange(touches: NativeTouchEvent[]) {
        const touchedPitches = touchesToPitches(touches);
        const addedPitches = difference(touchedPitches, state.pressedPitches);
        const droppedPitches = difference(state.pressedPitches, touchedPitches);
        if (!addedPitches.length && !droppedPitches.length) return;

        const pressTimes = { ...state.pressTimes };
        const recordedNotes = [...state.recordedNotes];

        for (let pitch of addedPitches) {
            notes[pitch].loop = true;
            notes[pitch].play();
            pressTimes[pitch] = Date.now() - state.startTime;
        }

        for (let pitch of droppedPitches) {
            notes[pitch].pause();
            notes[pitch].seekTo(0);
            recordedNotes.push(createNoteForPressedPitch(pitch));
        }

        setState({
            ...state,
            pressedPitches: touchedPitches,
            pressTimes,
            recordedNotes,
        });
    }

    function _handleSongEnd() {
        // End all pressed notes here
        const allRecordedNotes = [...state.recordedNotes]
        for (let pitch of state.pressedPitches) {
            notes[pitch].pause();
            notes[pitch].seekTo(0);
            allRecordedNotes.push(createNoteForPressedPitch(pitch))
        }
        setState((state) => ({
            ...state,
            ended: true,
            pressTimes: {},
            pressedPitches: [],
            score: gradeSong(song.notes, state.recordedNotes),
        }));
    }

    const handleTouchChange = useRef(_handleTouchChange);
    handleTouchChange.current = _handleTouchChange;
    const handleSongEnd = useRef(_handleSongEnd);
    handleSongEnd.current = _handleSongEnd;

    const panResponder = useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => { },

            onPanResponderMove: (evt, gestureState) =>
                handleTouchChange.current(evt.nativeEvent.touches),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) =>
                handleTouchChange.current(evt.nativeEvent.touches),
            onPanResponderTerminate: (evt, gestureState) => { },
            onShouldBlockNativeResponder: (evt, gestureState) => true,
        })
    ).current;

    const reelSongHeight = song.durationInBeats * beatHeight;

    const reelHeight = reelSongHeight + screen.height + bottomMargin;

    return {
        started: state.started,
        ended: state.ended,
        score: state.score,
        reelSongHeight,
        reelHeight,
        bottomMargin,
        durationInMS: song.durationInMS,
        offsetStart: -reelSongHeight - bottomMargin,
        offsetEnd: -bottomMargin,
        panHandlers: !state.ended ? panResponder.panHandlers : {},
        pitches: song.pitches.map((pitch) => ({
            id: pitch,
            isPressed: state.pressedPitches.includes(pitch),
            notes: song.notes
                .filter((note) => note.pitch === pitch)
                .map((note) => ({
                    height: note.beats * beatHeight,
                    offset:
                        reelHeight -
                        note.startTimeInBeats * beatHeight -
                        note.beats * beatHeight -
                        bottomMargin,
                })),
        })),
        restart: () => {
            setState(state => ({ ...state, started: false }))
        }
    };
}
