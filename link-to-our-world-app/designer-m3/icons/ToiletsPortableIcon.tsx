import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function ToiletsPortableIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 576 512" fill={parentTextColor} {...props}>
            <Path d="M32 0H224c17.7 0 32 14.3 32 32V64H0V32C0 14.3 14.3 0 32 0zM0 96H24 232h24v24V488c0 13.3-10.7 24-24 24s-24-10.7-24-24v-8H48v8c0 13.3-10.7 24-24 24s-24-10.7-24-24V120 96zM192 224c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V240c0-8.8-7.2-16-16-16zM352 0H544c17.7 0 32 14.3 32 32V64H320V32c0-17.7 14.3-32 32-32zM320 96h24H552h24v24V488c0 13.3-10.7 24-24 24s-24-10.7-24-24v-8H368v8c0 13.3-10.7 24-24 24s-24-10.7-24-24V120 96zM512 224c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V240c0-8.8-7.2-16-16-16z"/>
        </Svg>
    )
}

