import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function CircleHIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 512 512" fill={parentTextColor} {...props}>
            <Path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM368 152V256 360c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H192l0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-208c0-13.3 10.7-24 24-24s24 10.7 24 24v80H320V152c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
        </Svg>
    )
}

