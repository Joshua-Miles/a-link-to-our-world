import { Column, Label, useDesignerTheme } from "designer-m3"
import { Image } from "react-native"
import { Assets } from "./Assets"

type ItemTileProps = {
    isSelected?: boolean
    onPress?: () => any
    item: {
        slug: string
        imageSlug: string
        name: string
        quantity: number
    }
}

export function ItemTile({ item, isSelected, onPress }: ItemTileProps) {
    const { colors, spacing } = useDesignerTheme();
    return (
        <Column width="25%" key={item.slug} position="relative" onPress={onPress} borderColor={colors.roles.primary} borderWidth={isSelected ? spacing.lines.sm : 0}>
            <Image
                style={{ width: 100, height: 100, objectFit: 'contain' }}
                source={Assets[item.imageSlug]}
            />
            <Label.Small textAlign="center">{item.name}</Label.Small>
            {item.quantity > 1 && (
                <Label.Small
                    textAlign="center"
                    position="absolute"
                    top={75}
                    width={25}
                    left={75}
                    backgroundColor={colors.roles.surfaceContainerHighest}
                    color={colors.roles.onSurface}
                >
                    {item.quantity}
                </Label.Small>
            )}
        </Column>
    )
}
