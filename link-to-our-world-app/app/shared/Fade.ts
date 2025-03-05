import { AudioPlayer } from "expo-audio";
import { Easing } from "react-native";

export function fadeIn(audioPlayer: AudioPlayer, duration: number) {
    const end = new Date().getTime() + duration;

    const doFadeIn = () => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            // End animation here as there's less than 60 milliseconds left
            return;
        }

        // Change player volume
        audioPlayer.volume = Easing.ease(1 - remaining / duration);

        requestAnimationFrame(doFadeIn);
    }

    doFadeIn();
}

export function fadeOut(audioPlayer: AudioPlayer, duration: number) {
    const end = new Date().getTime() + duration;

    const doFadeOut = () => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            // End animation here as there's less than 60 milliseconds left
            return;
        }

        // Change player volume
        audioPlayer.volume = Easing.ease(remaining / duration);

        requestAnimationFrame(doFadeOut);
    }

    doFadeOut();
}
