import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="talus"
            fortitude={30}
            damage={8}
            speed={2000}
            forces={['ice']}
            onFinished={() => {
                resolveEncounter('finale/talus-fight', {})
                router.push('/map')
            }}
        />
    )
}