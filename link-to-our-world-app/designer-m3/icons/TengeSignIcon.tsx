import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function TengeSignIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 384 512" fill={parentTextColor} {...props}>
            <Path d="M0 64C0 46.3 14.3 32 32 32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64zM0 192c0-17.7 14.3-32 32-32H192 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H224V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V224H32c-17.7 0-32-14.3-32-32z"/>
        </Svg>
    )
}

