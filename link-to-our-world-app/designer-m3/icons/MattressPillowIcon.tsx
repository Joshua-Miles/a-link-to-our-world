import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function MattressPillowIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M256 64H64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H256V64zm32 384H576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H288V448zM64 160c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160z"/>
        </Svg>
    )
}

