import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="darknut"
            fortitude={50}
            damage={1}
            speed={30000}
            forces={['water']}
            onFinished={() => {
                resolveEncounter('finale/darknut-fight', {})
                router.push('/map')
            }}
        />
    )
}