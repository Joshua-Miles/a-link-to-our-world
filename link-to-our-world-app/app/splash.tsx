import { Button, Column, Page, Row, useDesignerTheme, timing } from "designer-m3";
import { Image } from "react-native";

export default function Splash() {
    const { spacing } = useDesignerTheme();
    return (
        <Page key="splash" navTransitionOutDuration={1000} >
            <Column
                flex={1}
                justifyContent="center"
                alignItems="center"
                gap={spacing.md}
                opacity={1}
                _navTransitionIn={{ opacity: 0 }}
                _navTransitionOut={{ opacity: 0 }}
                transitions={{
                    opacity: timing(750)
                }}
            >
                <Image
                    source={require('../assets/splash-icon.png')}
                />
                <Row>
                    <Button.Text href="/login">
                        Resume Game
                    </Button.Text>
                    <Button.Filled
                        href="/intro/prologue"
                        // href="/intro/sign-up"
                    >
                        New Game
                    </Button.Filled>
                </Row>
            </Column>
        </Page>
    )
}