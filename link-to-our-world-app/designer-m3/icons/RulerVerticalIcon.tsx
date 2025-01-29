import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function RulerVerticalIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 256 512" fill={parentTextColor} {...props}>
            <Path d="M0 48C0 21.5 21.5 0 48 0H208c26.5 0 48 21.5 48 48V96H176c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H176c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H176c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H176c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48z"/>
        </Svg>
    )
}

