import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function RoadSpikesIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M64 116.8c0-15.8 20.5-22 29.3-8.9L192 256V116.8c0-15.8 20.5-22 29.3-8.9L320 256V116.8c0-15.8 20.5-22 29.3-8.9L448 256V116.8c0-15.8 20.5-22 29.3-8.9L606.8 302.2c14.2 21.3-1.1 49.7-26.6 49.7H512 448 384 320 256 192 64V116.8zM32 384H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
        </Svg>
    )
}

