import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function ZIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 384 512" fill={parentTextColor} {...props}>
            <Path d="M0 64C0 46.3 14.3 32 32 32H352c12.4 0 23.7 7.2 29 18.4s3.6 24.5-4.4 34.1L100.3 416H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-12.4 0-23.7-7.2-29-18.4s-3.6-24.5 4.4-34.1L283.7 96H32C14.3 96 0 81.7 0 64z"/>
        </Svg>
    )
}

