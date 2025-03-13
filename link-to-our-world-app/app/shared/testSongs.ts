import { SongData } from "./SongPlayer";
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