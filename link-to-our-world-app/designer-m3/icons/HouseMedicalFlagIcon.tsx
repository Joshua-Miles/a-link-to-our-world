import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function HouseMedicalFlagIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M480 0c17.7 0 32 14.3 32 32H624c8.8 0 16 7.2 16 16V176c0 8.8-7.2 16-16 16H512V512H448V192 32c0-17.7 14.3-32 32-32zM276.8 39.7L416 159V512h1l-.2 0H96c-17.7 0-32-14.3-32-32V288H32c-13.4 0-25.4-8.3-30-20.9s-1-26.7 9.2-35.4l224-192c12-10.3 29.7-10.3 41.7 0zM224 208v48H176c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320h48c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H288V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16z"/>
        </Svg>
    )
}

