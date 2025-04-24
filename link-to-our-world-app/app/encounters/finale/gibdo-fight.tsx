import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="gibdo"
            fortitude={25}
            damage={4}
            speed={8000}
            forces={['fire']}
            onFinished={() => {
                resolveEncounter('finale/gibdo-fight', {})
                router.push('/map')
            }}
        />
    )
}