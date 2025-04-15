import { Column, useDesignerTheme } from "designer-m3";
import { Image, useWindowDimensions } from "react-native";
import { Assets } from "../Assets";

type WeaponTileProps = {
    slug: string
    isSelected: boolean
    onPress: () => any;
}

export function WeaponTile({ slug, isSelected, onPress }: WeaponTileProps) {
    const { colors, spacing } = useDesignerTheme();
    const { width } = useWindowDimensions();
    return (
        <Column justifyContent="center" alignItems="center" height={width / 4} width={width / 4} borderStyle="solid" borderWidth={spacing.hairline}  borderColor={isSelected ? colors.roles.primary : colors.roles.outline} onPress={onPress}>
            <Image style={{ width: '100%', objectFit: 'contain' }} source={Assets[slug]}/>
        </Column>
    )
}
