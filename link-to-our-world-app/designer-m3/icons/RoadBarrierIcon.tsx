import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function RoadBarrierIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M32 32C14.3 32 0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V266.3L149.2 96H64V64c0-17.7-14.3-32-32-32zM405.2 96H330.8l-5.4 10.7L234.8 288h74.3l5.4-10.7L405.2 96zM362.8 288h74.3l5.4-10.7L533.2 96H458.8l-5.4 10.7L362.8 288zM202.8 96l-5.4 10.7L106.8 288h74.3l5.4-10.7L277.2 96H202.8zm288 192H576V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v53.7L490.8 288z"/>
        </Svg>
    )
}

