import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="gibdo"
            fortitude={50}
            damage={1}
            speed={30000}
            forces={['fire']}
            onFinished={() => {
                resolveEncounter('finale/gibdo-fight', {})
                router.push('/map')
            }}
        />
    )
}