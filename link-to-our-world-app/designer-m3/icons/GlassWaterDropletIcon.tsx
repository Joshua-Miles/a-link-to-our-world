import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function GlassWaterDropletIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 384 512" fill={parentTextColor} {...props}>
            <Path d="M32 0C23.1 0 14.6 3.7 8.6 10.2S-.6 25.4 .1 34.3L28.9 437.7c3 41.9 37.8 74.3 79.8 74.3H275.3c42 0 76.8-32.4 79.8-74.3L383.9 34.3c.6-8.9-2.4-17.6-8.5-24.1S360.9 0 352 0H32zM83 297.5L66.4 64H317.6L301 297.5 288 304c-20.1 10.1-43.9 10.1-64 0s-43.9-10.1-64 0s-43.9 10.1-64 0l-13-6.5zM256 196c0-24-33.7-70.1-52.2-93.5c-6.1-7.7-17.5-7.7-23.6 0C161.7 125.9 128 172 128 196c0 33.1 28.7 60 64 60s64-26.9 64-60z"/>
        </Svg>
    )
}

