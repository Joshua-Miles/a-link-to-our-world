import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function EthereumIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 320 512" fill={parentTextColor} {...props}>
            <Path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/>
        </Svg>
    )
}

