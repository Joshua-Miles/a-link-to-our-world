import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function ArrowUpRightDotsIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 576 512" fill={parentTextColor} {...props}>
            <Path d="M160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L9.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L256 109.3V160c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H160zM576 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM448 208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM400 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm128 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM272 384a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM144 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM576 336a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-48-80a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
        </Svg>
    )
}

