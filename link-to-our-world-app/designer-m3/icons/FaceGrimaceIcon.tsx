import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function FaceGrimaceIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 512 512" fill={parentTextColor} {...props}>
            <Path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm96-112h-8V360l55.3 0c-3.8 22.7-23.6 40-47.3 40zm47.3-56L344 344V304h8c23.8 0 43.5 17.3 47.3 40zM328 344H264V304h64v40zm0 56H264V360h64v40zm-80-96v40l-64 0V304h64zm0 56v40H184V360l64 0zm-80-16H112.7c3.8-22.7 23.6-40 47.3-40h8v40zm0 56h-8c-23.8 0-43.5-17.3-47.3-40H168v40zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </Svg>
    )
}

