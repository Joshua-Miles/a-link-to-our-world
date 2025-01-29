import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function WindowMinimizeIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 512 512" fill={parentTextColor} {...props}>
            <Path d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"/>
        </Svg>
    )
}

