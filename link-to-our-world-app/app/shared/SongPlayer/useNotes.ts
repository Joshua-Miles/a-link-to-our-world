import { AudioPlayer, useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { NotePitch } from './Song';

setAudioModeAsync({
    interruptionMode: 'mixWithOthers'
}).then( s => {
   
})

const Sources = {
    A2Flat: require('../../../assets/woodwind/A2Flat.mp3'),
    A2: require('../../../assets/woodwind/A2.mp3'),
    A2Sharp: require('../../../assets/woodwind/A2Sharp.mp3'),
    A3Flat: require('../../../assets/woodwind/A3Flat.mp3'),
    A3: require('../../../assets/woodwind/A3.mp3'),
    A3Sharp: require('../../../assets/woodwind/A3Sharp.mp3'),
    A4Flat: require('../../../assets/woodwind/A4Flat.mp3'),
    A4: require('../../../assets/woodwind/A4.mp3'),
    A4Sharp: require('../../../assets/woodwind/A4Sharp.mp3'),
    A5Flat: require('../../../assets/woodwind/A5Flat.mp3'),
    A5: require('../../../assets/woodwind/A5.mp3'),
    A5Sharp: require('../../../assets/woodwind/A5Sharp.mp3'),
    A6Flat: require('../../../assets/woodwind/A6Flat.mp3'),
    A6: require('../../../assets/woodwind/A6.mp3'),
    A6Sharp: require('../../../assets/woodwind/A6Sharp.mp3'),

    B2Flat: require('../../../assets/woodwind/B2Flat.mp3'),
    B2: require('../../../assets/woodwind/B2.mp3'),
    B2Sharp: require('../../../assets/woodwind/B2Sharp.mp3'),
    B3Flat: require('../../../assets/woodwind/B3Flat.mp3'),
    B3: require('../../../assets/woodwind/B3.mp3'),
    B3Sharp: require('../../../assets/woodwind/B3Sharp.mp3'),
    B4Flat: require('../../../assets/woodwind/B4Flat.mp3'),
    B4: require('../../../assets/woodwind/B4.mp3'),
    B4Sharp: require('../../../assets/woodwind/B4Sharp.mp3'),
    B5Flat: require('../../../assets/woodwind/B5Flat.mp3'),
    B5: require('../../../assets/woodwind/B5.mp3'),
    B5Sharp: require('../../../assets/woodwind/B5Sharp.mp3'),
    B6Flat: require('../../../assets/woodwind/B6Flat.mp3'),
    B6: require('../../../assets/woodwind/B6.mp3'),
    B6Sharp: require('../../../assets/woodwind/B6Sharp.mp3'),

    C2Flat: require('../../../assets/woodwind/C2Flat.mp3'),
    C2: require('../../../assets/woodwind/C2.mp3'),
    C2Sharp: require('../../../assets/woodwind/C2Sharp.mp3'),
    C3Flat: require('../../../assets/woodwind/C3Flat.mp3'),
    C3: require('../../../assets/woodwind/C3.mp3'),
    C3Sharp: require('../../../assets/woodwind/C3Sharp.mp3'),
    C4Flat: require('../../../assets/woodwind/C4Flat.mp3'),
    C4: require('../../../assets/woodwind/C4.mp3'),
    C4Sharp: require('../../../assets/woodwind/C4Sharp.mp3'),
    C5Flat: require('../../../assets/woodwind/C5Flat.mp3'),
    C5: require('../../../assets/woodwind/C5.mp3'),
    C5Sharp: require('../../../assets/woodwind/C5Sharp.mp3'),
    C6Flat: require('../../../assets/woodwind/C6Flat.mp3'),
    C6: require('../../../assets/woodwind/C6.mp3'),
    C6Sharp: require('../../../assets/woodwind/C6Sharp.mp3'),

    D2Flat: require('../../../assets/woodwind/D2Flat.mp3'),
    D2: require('../../../assets/woodwind/D2.mp3'),
    D2Sharp: require('../../../assets/woodwind/D2Sharp.mp3'),
    D3Flat: require('../../../assets/woodwind/D3Flat.mp3'),
    D3: require('../../../assets/woodwind/D3.mp3'),
    D3Sharp: require('../../../assets/woodwind/D3Sharp.mp3'),
    D4Flat: require('../../../assets/woodwind/D4Flat.mp3'),
    D4: require('../../../assets/woodwind/D4.mp3'),
    D4Sharp: require('../../../assets/woodwind/D4Sharp.mp3'),
    D5Flat: require('../../../assets/woodwind/D5Flat.mp3'),
    D5: require('../../../assets/woodwind/D5.mp3'),
    D5Sharp: require('../../../assets/woodwind/D5Sharp.mp3'),
    D6Flat: require('../../../assets/woodwind/D6Flat.mp3'),
    D6: require('../../../assets/woodwind/D6.mp3'),
    D6Sharp: require('../../../assets/woodwind/D6Sharp.mp3'),

    E2Flat: require('../../../assets/woodwind/E2Flat.mp3'),
    E2: require('../../../assets/woodwind/E2.mp3'),
    E2Sharp: require('../../../assets/woodwind/E2Sharp.mp3'),
    E3Flat: require('../../../assets/woodwind/E3Flat.mp3'),
    E3: require('../../../assets/woodwind/E3.mp3'),
    E3Sharp: require('../../../assets/woodwind/E3Sharp.mp3'),
    E4Flat: require('../../../assets/woodwind/E4Flat.mp3'),
    E4: require('../../../assets/woodwind/E4.mp3'),
    E4Sharp: require('../../../assets/woodwind/E4Sharp.mp3'),
    E5Flat: require('../../../assets/woodwind/E5Flat.mp3'),
    E5: require('../../../assets/woodwind/E5.mp3'),
    E5Sharp: require('../../../assets/woodwind/E5Sharp.mp3'),
    E6Flat: require('../../../assets/woodwind/E6Flat.mp3'),
    E6: require('../../../assets/woodwind/E6.mp3'),
    E6Sharp: require('../../../assets/woodwind/E6Sharp.mp3'),

    F2Flat: require('../../../assets/woodwind/F2Flat.mp3'),
    F2: require('../../../assets/woodwind/F2.mp3'),
    F2Sharp: require('../../../assets/woodwind/F2Sharp.mp3'),
    F3Flat: require('../../../assets/woodwind/F3Flat.mp3'),
    F3: require('../../../assets/woodwind/F3.mp3'),
    F3Sharp: require('../../../assets/woodwind/F3Sharp.mp3'),
    F4Flat: require('../../../assets/woodwind/F4Flat.mp3'),
    F4: require('../../../assets/woodwind/F4.mp3'),
    F4Sharp: require('../../../assets/woodwind/F4Sharp.mp3'),
    F5Flat: require('../../../assets/woodwind/F5Flat.mp3'),
    F5: require('../../../assets/woodwind/F5.mp3'),
    F5Sharp: require('../../../assets/woodwind/F5Sharp.mp3'),
    F6Flat: require('../../../assets/woodwind/F6Flat.mp3'),
    F6: require('../../../assets/woodwind/F6.mp3'),
    F6Sharp: require('../../../assets/woodwind/F6Sharp.mp3'),

    G2Flat: require('../../../assets/woodwind/G2Flat.mp3'),
    G2: require('../../../assets/woodwind/G2.mp3'),
    G2Sharp: require('../../../assets/woodwind/G2Sharp.mp3'),
    G3Flat: require('../../../assets/woodwind/G3Flat.mp3'),
    G3: require('../../../assets/woodwind/G3.mp3'),
    G3Sharp: require('../../../assets/woodwind/G3Sharp.mp3'),
    G4Flat: require('../../../assets/woodwind/G4Flat.mp3'),
    G4: require('../../../assets/woodwind/G4.mp3'),
    G4Sharp: require('../../../assets/woodwind/G4Sharp.mp3'),
    G5Flat: require('../../../assets/woodwind/G5Flat.mp3'),
    G5: require('../../../assets/woodwind/G5.mp3'),
    G5Sharp: require('../../../assets/woodwind/G5Sharp.mp3'),
    G6Flat: require('../../../assets/woodwind/G6Flat.mp3'),
    G6: require('../../../assets/woodwind/G6.mp3'),
    G6Sharp: require('../../../assets/woodwind/G6Sharp.mp3'),
}

export function useNotes(pitches: NotePitch[]): Record<string, AudioPlayer> {
    const result: Record<string, AudioPlayer> = {};
    for (let pitch of pitches) {
        // @ts-ignore
        result[pitch] = useAudioPlayer(Sources[pitch]);
    }
    return result;
}