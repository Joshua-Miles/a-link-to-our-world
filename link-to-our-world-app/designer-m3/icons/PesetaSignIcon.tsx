import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function PesetaSignIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 384 512" fill={parentTextColor} {...props}>
            <Path d="M64 32C46.3 32 32 46.3 32 64v96c-17.7 0-32 14.3-32 32s14.3 32 32 32l0 96V448c0 17.7 14.3 32 32 32s32-14.3 32-32V352h96c77.4 0 142-55 156.8-128H352c17.7 0 32-14.3 32-32s-14.3-32-32-32h-3.2C334 87 269.4 32 192 32H64zM282.5 160H96V96h96c41.8 0 77.4 26.7 90.5 64zM96 224H282.5c-13.2 37.3-48.7 64-90.5 64H96V224z"/>
        </Svg>
    )
}

