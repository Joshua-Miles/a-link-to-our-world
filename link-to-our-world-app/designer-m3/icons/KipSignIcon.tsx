import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function KipSignIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 384 512" fill={parentTextColor} {...props}>
            <Path d="M340.8 88.3c13.4-11.5 15-31.7 3.5-45.1s-31.7-15-45.1-3.5L128 186.4V64c0-17.7-14.3-32-32-32S64 46.3 64 64V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V325.6L299.2 472.3c13.4 11.5 33.6 9.9 45.1-3.5s9.9-33.6-3.5-45.1L182.5 288H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H182.5L340.8 88.3z"/>
        </Svg>
    )
}

