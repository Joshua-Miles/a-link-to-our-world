import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function BridgeLockIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M32 64c0-17.7 14.3-32 32-32H576c17.7 0 32 14.3 32 32s-14.3 32-32 32H536v64h-8c-61.9 0-112 50.1-112 112v24.6c-9.9 5.8-18.2 14.1-23.8 24.1c-17.6-20-43.4-32.7-72.2-32.7c-53 0-96 43-96 96v64c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V384c0-53-43-96-96-96V160h72V96H64C46.3 96 32 81.7 32 64zM408 96v64h80V96H408zm-48 64V96H280v64h80zM152 96v64h80V96H152zM528 240c-17.7 0-32 14.3-32 32v48h64V272c0-17.7-14.3-32-32-32zm-80 32c0-44.2 35.8-80 80-80s80 35.8 80 80v48c17.7 0 32 14.3 32 32V480c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V352c0-17.7 14.3-32 32-32V272z"/>
        </Svg>
    )
}

