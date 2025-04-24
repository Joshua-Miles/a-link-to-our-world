import { Column, Label, Row, useDesignerTheme } from "designer-m3"
import { Image, useWindowDimensions } from "react-native"
import { Assets } from "./Assets"

type ItemTileProps = {
    isSelected?: boolean
    onPress?: () => any
    item: {
        slug: string
        type: string
        imageSlug: string
        name: string
        quantity: number
        power?: number | null
    }
}

export function ItemTile({ item, isSelected, onPress }: ItemTileProps) {
    const { colors, spacing } = useDesignerTheme();
    const screen = useWindowDimensions();
    const size = (screen.width - 32) / 4;
    return (
        <Column backgroundColor={colors.roles.surfaceContainerHigh} mx={spacing.hairline} mt={spacing.hairline} width={size} height={size} borderColor={colors.roles.primary} borderWidth={isSelected ? spacing.lines.sm : 0} onPressIn={onPress}>
            <Image
                style={{ width: size, height: size, objectFit: 'contain' }}
                source={Assets[item.imageSlug]}
            />
            <Label.Small width="100%" backgroundColor="rgba(0,0,0,0.5)" position="absolute" bottom={0} textAlign="center">{item.name}</Label.Small>
            <Row position="absolute" left={0} top={0} width="100%" justifyContent={item.type === 'food' ? 'space-between' : 'flex-end'} >
                {item.type === 'food' && (
                    <>
                        <Image source={Assets['health']} style={{position: 'absolute', left: 2, top: 0, width: 22, height: 22, objectFit: 'contain' }} />
                        <Label.Small
                            textAlign="center"
                            width={25}
                            color={colors.roles.onPrimary}
                        >
                            {item.power ?? 0}
                        </Label.Small>
                    </>
                )}
                {item.quantity > 1 && (<Label.Small
                    textAlign="center"
                    width={25}
                    backgroundColor={colors.roles.surfaceContainerLowest}
                    color={colors.roles.onSurface}
                >
                    {item.quantity}
                </Label.Small>
                )}
            </Row>
        </Column>
    )
}
