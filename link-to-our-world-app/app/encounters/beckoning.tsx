import { resolveEncounter } from "api"
import { Button, Column, Display } from "designer-m3"
import { router } from "expo-router"

export default () => {
    return (
        <Column flex={1}>
            <Display.Small color="white">Beckoning</Display.Small>
            <Button.Elevated onPress={() => {
                router.push(`/map`)
                resolveEncounter('beckoning', {})
            }}>
                Done
            </Button.Elevated>
        </Column>
    )
}