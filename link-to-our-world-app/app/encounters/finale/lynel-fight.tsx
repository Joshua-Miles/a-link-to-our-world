import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="lynel"
            fortitude={50}
            damage={1}
            speed={30000}
            onFinished={() => {
                resolveEncounter('finale/lynel-fight', {})
                router.push('/map')
            }}
        />
    )
}