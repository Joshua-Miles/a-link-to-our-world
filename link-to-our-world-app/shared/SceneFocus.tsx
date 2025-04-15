import { Column, Label, Row, timing } from "designer-m3";
import { SubjectImage } from "./SubjectImage";
import { Assets } from "./Assets";

type SceneFocusProps = Parameters<typeof Row>[0] & {
    asset: string;
    label?: string
};

export function SceneFocus({ asset, label, ...props }: SceneFocusProps) {
    return (
        <Row height="50%" alignItems="center" justifyContent="center" {...props}>
            <Column width={200} alignItems="center">
                <SubjectImage source={Assets[asset]} />
                {label && (
                    <Label.Small textAlign="center" opacity={0} _displayed={{ opacity: 1 }} transitions={{ opacity: timing(1000)}}>
                        {label}
                    </Label.Small>
                )}
            </Column>
        </Row>
    )
}
