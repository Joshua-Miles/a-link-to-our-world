import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function MarsStrokeRightIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 640 512" fill={parentTextColor} {...props}>
            <Path d="M208 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zm174.4-88C370.7 365.8 297.1 432 208 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c89.1 0 162.7 66.2 174.4 152H416V176c0-13.3 10.7-24 24-24s24 10.7 24 24v56h32V176c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2V280H464v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H382.4z"/>
        </Svg>
    )
}

