import { Button } from "designer-m3";
import { StyledView } from "ui-core";

export function ButtonDocs() {
    return <StyledView alignItems="center" marginTop={30} flex={1} justifyContent="space-evenly">
            <Button.Elevated>Elevated button</Button.Elevated>
            <Button.Filled>Filled Button</Button.Filled>
            <Button.FilledTonal>Filled Tonal Button</Button.FilledTonal>
            <Button.Outlined>Outlined Button</Button.Outlined>
            <Button.Text>Text Button</Button.Text>
        </StyledView>
    return <StyledView margin={100} height={100} width={100} shadow={{ color: 'rgba(0,0,0,1)', radius: 5 }} />
}