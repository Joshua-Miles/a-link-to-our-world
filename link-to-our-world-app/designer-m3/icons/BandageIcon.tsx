import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function BandageIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M480 416h96c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H480V416zM448 96H192V416H448V96zM64 96C28.7 96 0 124.7 0 160V352c0 35.3 28.7 64 64 64h96V96H64zM248 208a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm120-24a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM248 304a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm120-24a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
        </Svg>
    )
}

