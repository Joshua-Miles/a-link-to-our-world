import { Audio } from 'expo-av';
import { Easing } from "react-native";

export class Fade {
    private callback: () => Promise<boolean>;
    private done: () => any;
    private aborted: boolean = false;

    constructor(callback: () => Promise<boolean>, done: () => any) {
        this.callback = callback;
        this.done = done
        this.do()
    }

    abort() {
        this.aborted = true;
        this.done();
    }

    private async do() {
        if (!this.aborted && !await this.callback()) {
            requestAnimationFrame(() => this.do());
        } else {
            this.done();
        }
    }
}

async function isPlaying(player: Audio.Sound) {
    const status = await player.getStatusAsync();
    return status.isLoaded && status.isPlaying;
}

export function crossFade(playerOut: Audio.Sound, playerIn: Audio.Sound, duration: number) {
    const end = new Date().getTime() + duration;
    playerIn.setVolumeAsync(0)

    return new Fade(async () => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            return true;
        }

        // Change player volume
        if (remaining > (duration / 2)) {
            const remainingOut = remaining - (duration / 2)
            await playerOut.setVolumeAsync(Easing.ease(remainingOut / (duration / 2)));
        } else {
            if (!await isPlaying(playerIn)) await playerIn.playAsync();
            await playerIn.setVolumeAsync(Easing.ease(1 - remaining / (duration/2)));
        }
        
        return false;
    }, () => {
        playerOut.pauseAsync();
    })
}

export function fadeIn(audioPlayer: Audio.Sound, duration: number) {
    const end = new Date().getTime() + duration;
    audioPlayer.setVolumeAsync(0)
    audioPlayer.playAsync()
    return new Fade(async () => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            // End animation here as there's less than 60 milliseconds left
            return true;
        }

        // Change player volume
        await audioPlayer.setVolumeAsync(Easing.ease(1 - remaining / duration));
        return false;
    }, () => {})
}

export function fadeOut(audioPlayer: Audio.Sound, duration: number) {
    const end = new Date().getTime() + duration;
    return new Fade(async () => {
        const current = new Date().getTime();
        const remaining = end - current;

        if (remaining < 60) {
            // End animation here as there's less than 60 milliseconds left
            return true;
        }

        // Change player volume
        await audioPlayer.setVolumeAsync(Easing.ease(remaining / duration));
        return false;
    }, () => {
        audioPlayer.pauseAsync()
    })
}
