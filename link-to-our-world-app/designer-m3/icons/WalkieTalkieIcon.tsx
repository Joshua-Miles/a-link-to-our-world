import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function WalkieTalkieIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 384 512" fill={parentTextColor} {...props}>
            <Path d="M112 24c0-13.3-10.7-24-24-24S64 10.7 64 24V96H48C21.5 96 0 117.5 0 144V300.1c0 12.7 5.1 24.9 14.1 33.9l3.9 3.9c9 9 14.1 21.2 14.1 33.9V464c0 26.5 21.5 48 48 48H304c26.5 0 48-21.5 48-48V371.9c0-12.7 5.1-24.9 14.1-33.9l3.9-3.9c9-9 14.1-21.2 14.1-33.9V144c0-26.5-21.5-48-48-48H320c0-17.7-14.3-32-32-32s-32 14.3-32 32H224c0-17.7-14.3-32-32-32s-32 14.3-32 32H112V24zm0 136H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
        </Svg>
    )
}

