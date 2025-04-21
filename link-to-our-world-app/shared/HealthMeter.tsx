import { Row, useDesignerTheme } from "designer-m3";
import { Image } from "react-native";
import { Assets } from "./Assets";
import { isLoading, useResult } from "@triframe/utils-react";
import { getPlayerMeters } from "api";
import { isAnyFailure } from "@triframe/ambassador";

export function HealthMeter() {
    const { spacing } = useDesignerTheme();

    const playerMeter = useResult(getPlayerMeters);

    if (isLoading(playerMeter) || isAnyFailure(playerMeter)) return null;

    const playerHealth = new Array(playerMeter.health).fill(1)

    const missingPlayerHealth = new Array(playerMeter.heartContainers - playerMeter.health).fill(1)

    return (
        <Row gap={spacing.hairline} maxWidth={150} flexWrap="wrap">
            {playerHealth.map(() => (
                <Image
                    source={Assets['health']}
                    style={{
                        width: 20,
                        height: 20,
                        objectFit: 'contain'
                    }}
                />
            ))}
            {missingPlayerHealth.map(() => (
                <Image
                    source={Assets['health-slot']}
                    style={{
                        width: 20,
                        height: 20,
                        objectFit: 'contain'
                    }}
                />
            ))}
        </Row>
    )
}