import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function CuttlefishIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 440 512" fill={parentTextColor} {...props}>
            <Path d="M344 305.5c-17.5 31.6-57.4 54.5-96 54.5-56.6 0-104-47.4-104-104s47.4-104 104-104c38.6 0 78.5 22.9 96 54.5 13.7-50.9 41.7-93.3 87-117.8C385.7 39.1 320.5 8 248 8 111 8 0 119 0 256s111 248 248 248c72.5 0 137.7-31.1 183-80.7-45.3-24.5-73.3-66.9-87-117.8z"/>
        </Svg>
    )
}

