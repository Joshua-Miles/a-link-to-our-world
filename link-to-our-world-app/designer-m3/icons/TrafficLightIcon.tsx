import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function TrafficLightIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 320 512" fill={parentTextColor} {...props}>
            <Path d="M64 0C28.7 0 0 28.7 0 64V352c0 88.4 71.6 160 160 160s160-71.6 160-160V64c0-35.3-28.7-64-64-64H64zm96 416a48 48 0 1 1 0-96 48 48 0 1 1 0 96zm48-176a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-48-80a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"/>
        </Svg>
    )
}

