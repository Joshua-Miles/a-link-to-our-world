import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="darknut"
            fortitude={25}
            damage={2}
            speed={2000}
            forces={['water']}
            onFinished={() => {
                resolveEncounter('finale/darknut-fight', {})
                router.push('/map')
            }}
        />
    )
}