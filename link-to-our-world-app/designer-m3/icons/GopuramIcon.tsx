import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function GopuramIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 512 512" fill={parentTextColor} {...props}>
            <Path d="M120 0c13.3 0 24 10.7 24 24v8h40V24c0-13.3 10.7-24 24-24s24 10.7 24 24v8h48V24c0-13.3 10.7-24 24-24s24 10.7 24 24v8h40V24c0-13.3 10.7-24 24-24s24 10.7 24 24v8V64v64c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32v96c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H416V352H384V224H352V128H320v96h32V352h32V512H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H128V352h32V224h32V128H160v96H128V352H96V512H32c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32V256c0-17.7 14.3-32 32-32V160c0-17.7 14.3-32 32-32V64 32 24c0-13.3 10.7-24 24-24zM256 272c-17.7 0-32 14.3-32 32v48h64V304c0-17.7-14.3-32-32-32zm-32-80v32h64V192c0-17.7-14.3-32-32-32s-32 14.3-32 32z"/>
        </Svg>
    )
}

