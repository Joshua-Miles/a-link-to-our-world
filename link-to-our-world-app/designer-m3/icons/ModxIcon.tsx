import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function ModxIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 448 512" fill={parentTextColor} {...props}>
            <Path d="M356 241.8l36.7 23.7V480l-133-83.8L356 241.8zM440 75H226.3l-23 37.8 153.5 96.5L440 75zm-89 142.8L55.2 32v214.5l46 29L351 217.8zM97 294.2L8 437h213.7l125-200.5L97 294.2z"/>
        </Svg>
    )
}

