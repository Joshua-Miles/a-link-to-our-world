import { resolveEncounter } from "api";
import { router } from "expo-router";
import { Combat } from "shared";

export default function() {
    return (
        <Combat
            asset="lizalfos"
            fortitude={8}
            damage={1}
            speed={1000}
            forces={[ 'electric' ]}
            onFinished={() => {
                resolveEncounter('finale/lizalfos-fight', {})
                router.push('/map')
            }}
        />
    )
}