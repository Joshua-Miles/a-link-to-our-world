import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function BreadSliceIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 512 512" fill={parentTextColor} {...props}>
            <Path d="M256 32C192 32 0 64 0 192c0 35.3 28.7 64 64 64V432c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V256c35.3 0 64-28.7 64-64C512 64 320 32 256 32z"/>
        </Svg>
    )
}

