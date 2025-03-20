import { Button, Column, Headline, Label, Row, useDesignerTheme, timing } from "designer-m3"
import { ArrowRightIcon } from "designer-m3/icons";
import { Image } from "react-native";
import { Assets, useSequence } from ".";

export type ItemGetProps = Parameters<typeof Column>[0] & {
    hasStarted: boolean
    title: string
    description: string
    onFinished?: () => any
}

export function ItemGet({ hasStarted, title, description, onFinished, ...columnProps }: ItemGetProps) {
    const { spacing, colors } = useDesignerTheme();

    const sequence = useSequence({ hasStarted, onFinished }, [
        'fadeIn',
        'displayed',
        'fadeOut'
    ])

    return (
        <>
            <Row
                {...columnProps}
                opacity={sequence.has({ reached: 'fadeIn', notReached: 'fadeOut'}) ? 1 : 0}
                gap={spacing.xs}
                position="fixed"
                height="20%"
                top="40%"
                backgroundColor="rgba(255,255,255,0.8)"
                width="100%"
                alignItems="center"
                transitions={{
                    opacity: timing(1000).then(sequence.next)
                }}
            >
                <Image source={Assets['goddess-flute']} style={{ width: 120, height: 120 }} />
                <Column>
                    <Headline.Small color={colors.roles.onPrimary}>
                        {title}
                    </Headline.Small>
                    <Label.Small color={colors.roles.onPrimary}>
                        {description}
                    </Label.Small>
                </Column>
            </Row>
            <Row
                {...columnProps}
                opacity={sequence.has({ reached: 'fadeIn', notReached: 'fadeOut'}) ? 1 : 0}
                position="fixed"
                top="60%"
                justifyContent="center"
                width="100%"
                mt={spacing.md}
                transitions={{
                    opacity: timing(1000)
                }}
            >
                <Button.Text onPress={sequence.next}>
                    Next <ArrowRightIcon />
                </Button.Text>
            </Row>
        </>
    )
}