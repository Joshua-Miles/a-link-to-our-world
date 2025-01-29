import { TextField } from "designer-m3";
import { StyledView } from "ui-core";

export function TextFieldDocs() {
    return <StyledView padding={50} flex={1} justifyContent="space-evenly">
        <TextField.Filled
            label="Filled"
        />
        <TextField.Outlined
            label="Outlined"
        />
         <TextField.Filled
            label="Error Filled"
            hasError
        />
        <TextField.Outlined
            label="Error Outlined"
            hasError
        />
        <TextField.Filled
            label="Multiline Filled"
            multiline
        />
        <TextField.Outlined
            label="Multiline Outlined"
            multiline
        />
    </StyledView>
}
