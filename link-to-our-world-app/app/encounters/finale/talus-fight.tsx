import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="talus"
            fortitude={50}
            damage={1}
            speed={30000}
            forces={['ice']}
            onFinished={() => {
                resolveEncounter('finale/talus-fight', {})
                router.push('/map')
            }}
        />
    )
}