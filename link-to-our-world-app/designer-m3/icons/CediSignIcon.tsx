import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function CediSignIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 384 512" fill={parentTextColor} {...props}>
            <Path d="M256 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V66.7C101.2 81.9 32 160.9 32 256s69.2 174.1 160 189.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V445.3c30.9-5.2 59.2-17.7 83.2-35.8c14.1-10.6 17-30.7 6.4-44.8s-30.7-17-44.8-6.4c-13.2 9.9-28.3 17.3-44.8 21.6V132c16.4 4.2 31.6 11.6 44.8 21.6c14.1 10.6 34.2 7.8 44.8-6.4s7.8-34.2-6.4-44.8c-24-18-52.4-30.6-83.2-35.8V32zM192 132V380c-55.2-14.2-96-64.3-96-124s40.8-109.8 96-124z"/>
        </Svg>
    )
}

