import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function CheeseIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 512 512" fill={parentTextColor} {...props}>
            <Path d="M512 240.2V256H0c0-20 10-38.7 26.6-49.8L274.9 40.7c8.6-5.7 18.6-8.7 28.9-8.7C418.8 32 512 125.2 512 240.2zm0 47.8V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V288H512z"/>
        </Svg>
    )
}

