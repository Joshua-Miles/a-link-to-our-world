import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function TradeFederationIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 496 512" fill={parentTextColor} {...props}>
            <Path d="M248 8.8c-137 0-248 111-248 248s111 248 248 248 248-111 248-248-111-248-248-248zm0 482.8c-129.7 0-234.8-105.1-234.8-234.8S118.3 22 248 22s234.8 105.1 234.8 234.8S377.7 491.6 248 491.6zm155.1-328.5v-46.8H209.3V198H54.2l36.7 46h117.7v196.8h48.8V245h83.3v-47h-83.3v-34.8h145.7zm-73.3 45.1v23.9h-82.9v197.4h-26.8V232.1H96.3l-20.1-23.9h143.9v-80.6h171.8V152h-145v56.2zm-161.3-69l-12.4-20.7 2.1 23.8-23.5 5.4 23.3 5.4-2.1 24 12.3-20.5 22.2 9.5-15.7-18.1 15.8-18.1zm-29.6-19.7l9.3-11.5-12.7 5.9-8-12.4 1.7 13.9-14.3 3.8 13.7 2.7-.8 14.7 6.8-12.2 13.8 5.3zm165.4 145.2l-13.1 5.6-7.3-12.2 1.3 14.2-13.9 3.2 13.9 3.2-1.2 14.2 7.3-12.2 13.1 5.5-9.4-10.7zm106.9-77.2l-20.9 9.1-12-19.6 2.2 22.7-22.3 5.4 22.2 4.9-1.8 22.9 11.5-19.6 21.2 8.8-15.1-17zM248 29.9c-125.3 0-226.9 101.6-226.9 226.9S122.7 483.7 248 483.7s226.9-101.6 226.9-226.9S373.3 29.9 248 29.9zM342.6 196v51h-83.3v195.7h-52.7V245.9H89.9l-40-49.9h157.4v-81.6h197.8v50.7H259.4V196zM248 43.2c60.3 0 114.8 25 153.6 65.2H202.5V190H45.1C73.1 104.8 153.4 43.2 248 43.2zm0 427.1c-117.9 0-213.6-95.6-213.6-213.5 0-21.2 3.1-41.8 8.9-61.1L87.1 252h114.7v196.8h64.6V253h83.3v-62.7h-83.2v-19.2h145.6v-50.8c30.8 37 49.3 84.6 49.3 136.5.1 117.9-95.5 213.5-213.4 213.5zM178.8 275l-11-21.4 1.7 24.5-23.7 3.9 23.8 5.9-3.7 23.8 13-20.9 21.5 10.8-15.8-18.8 16.9-17.1z"/>
        </Svg>
    )
}

