import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function RoadBridgeIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M352 0H608c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V32c0-17.7 14.3-32 32-32zM480 200c-13.3 0-24 10.7-24 24v64c0 13.3 10.7 24 24 24s24-10.7 24-24V224c0-13.3-10.7-24-24-24zm24 184c0-13.3-10.7-24-24-24s-24 10.7-24 24v64c0 13.3 10.7 24 24 24s24-10.7 24-24V384zM480 40c-13.3 0-24 10.7-24 24v64c0 13.3 10.7 24 24 24s24-10.7 24-24V64c0-13.3-10.7-24-24-24zM32 96H288v64H248v64h40v96c-53 0-96 43-96 96v64c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V416c0-53-43-96-96-96V224H72V160H32c-17.7 0-32-14.3-32-32s14.3-32 32-32zm168 64H120v64h80V160z"/>
        </Svg>
    )
}

