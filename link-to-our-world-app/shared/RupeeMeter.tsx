import { Label, Row, useDesignerTheme } from "designer-m3";
import { Image } from "react-native";
import { Assets } from "./Assets";
import { isLoading, useResult } from "@triframe/utils-react";
import { getPlayerMeters } from "api";
import { isAnyFailure } from "@triframe/ambassador";

export function RupeeMeter() {
    const { spacing } = useDesignerTheme();

    const playerMeter = useResult(getPlayerMeters);

    if (isLoading(playerMeter) || isAnyFailure(playerMeter)) return null;

    return (
        <Row gap={spacing.hairline} maxWidth={150} flexWrap="wrap">
            <Image
                source={Assets['rupee']}
                style={{
                    width: 20,
                    height: 20,
                    objectFit: 'contain'
                }}
            />
            <Label.Small>
                {playerMeter.rupees}
            </Label.Small>
        </Row>
    )
}