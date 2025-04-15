import { AudioPlayer } from "expo-audio";
import { Easing } from "react-native";

export class Fade {
    private callback: () => boolean;
    private aborted: boolean = false;

    constructor(callback: () => boolean) {
        this.callback = callback;
        this.do()
    }

    abort() {
        this.aborted = true;
    }

    private do() {
        if (!this.aborted && !this.callback()) {
            requestAnimationFrame(() => this.do());
        }
    }
}

export function crossFade(playerOut: AudioPlayer, playerIn: AudioPlayer, duration: number) {
    const end = new Date().getTime() + duration;
    playerIn.volume = 0;

    return new Fade(() => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            return true;
        }

        // Change player volume
        if (remaining > (duration / 2)) {
            const remainingOut = remaining - (duration / 2)
            playerOut.volume = Easing.ease(remainingOut / (duration / 2));
        } else {
            if (playerOut.playing) playerOut.pause();
            if (!playerIn.playing) playerIn.play();
            playerIn.volume = Easing.ease(1 - remaining / (duration/2));
        }
        
        return false;
    })
}

export function fadeIn(audioPlayer: AudioPlayer, duration: number) {
    const end = new Date().getTime() + duration;
    audioPlayer.volume = 0;
    audioPlayer.play();
    return new Fade(() => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            // End animation here as there's less than 60 milliseconds left
            return true;
        }

        // Change player volume
        audioPlayer.volume = Easing.ease(1 - remaining / duration);
        return false;
    })
}

export function fadeOut(audioPlayer: AudioPlayer, duration: number) {
    const end = new Date().getTime() + duration;
    return new Fade(() => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            // End animation here as there's less than 60 milliseconds left
            audioPlayer.pause()
            return true;
        }

        // Change player volume
        audioPlayer.volume = Easing.ease(remaining / duration);
        return false;
    })
}
