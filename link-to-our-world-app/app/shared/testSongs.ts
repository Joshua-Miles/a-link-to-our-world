import { REST, SongData } from "./SongPlayer";
import { dotted, eighth, half, Note, quarter } from "./SongPlayer";

export const zeldasLullaby: SongData = {
    src: require('assets/songs/zeldas-lullabye.mp3'),
    offset: 28,
    bpm: 104,
    notes: [
        half('B4'),
        quarter('D5'),
        half('A4'),
        quarter('G4'),
        quarter('A4'),
        half('B4'),
        quarter('D5'),
        dotted(half('A4')),
    ]
}

export const dragonRootTheme: SongData = {
    src: 'dragon-roost-theme',
    offset: 18,
    bpm: 106,
    notes: [
        eighth('D4'),
        dotted(quarter('B4Flat')),
        quarter('A4'),
        quarter('B4Flat'),
        quarter('G4'),
        dotted(quarter('C5')),
        dotted(quarter('A4')),
        dotted(half('G4')),
        half('D4'),
    ]
}

export const skyTheme: SongData = {
    src: 'sky-theme',
    offset: 20,
    bpm: 120,
    notes: [
        dotted(quarter('A4')),
        dotted(quarter('D5')),
        dotted(half('G5')),
        quarter(REST),
        quarter('G5'),
        quarter('F5'),
        quarter('E5'),
        quarter('D5'),
        dotted(quarter('D5')),
        dotted(quarter('G5')),
        dotted(quarter('B5Flat')),
        quarter('E5'),
        quarter('E5'),
    ]
}

export const mainTheme: SongData = {
    src: require('assets/songs/main-theme.mp3'),
    offset: 90.5,
    bpm: 130,
    notes: [
        half("A4"),
        eighth("A4"),

        quarter("A4"),
        quarter("A4"),
        quarter("A4"),

        quarter("A4"),
        eighth("G4"),
        quarter("A4"),

        eighth("A4"),
        quarter("A4"),
        quarter("A4"),
        quarter("A4"),

        quarter("A4"),
        eighth("G4"),
        quarter("A4"),

        eighth("A4"),
        quarter("A4"),
        quarter("A4"),
        quarter("A4"),

        quarter("A4"),
        eighth("E4"),
        eighth("E4"),

        quarter("E4"),
        eighth("E4"),
        eighth("E4"),

        quarter("E4"),
        eighth("E4"),
        eighth("E4"),

        quarter("E4"),
        quarter("E4"),

        quarter("A4"),
        dotted(quarter("E4")),

        eighth("A4"),
        eighth("A4"),
        eighth("B4Sharp"),
        eighth("C5"),
        eighth("D5"),

        half("E5"),
    ]
}