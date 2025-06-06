import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function WaveSquareIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M128 64c0-17.7 14.3-32 32-32H320c17.7 0 32 14.3 32 32V416h96V256c0-17.7 14.3-32 32-32H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H512V448c0 17.7-14.3 32-32 32H320c-17.7 0-32-14.3-32-32V96H192V256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h96V64z"/>
        </Svg>
    )
}

