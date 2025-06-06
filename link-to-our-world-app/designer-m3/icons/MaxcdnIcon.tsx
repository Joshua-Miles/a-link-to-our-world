import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function MaxcdnIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 512 512" fill={parentTextColor} {...props}>
            <Path d="M461.1 442.7h-97.4L415.6 200c2.3-10.2.9-19.5-4.4-25.7-5-6.1-13.7-9.6-24.2-9.6h-49.3l-59.5 278h-97.4l59.5-278h-83.4l-59.5 278H0l59.5-278-44.6-95.4H387c39.4 0 75.3 16.3 98.3 44.9 23.3 28.6 31.8 67.4 23.6 105.9l-47.8 222.6z"/>
        </Svg>
    )
}

