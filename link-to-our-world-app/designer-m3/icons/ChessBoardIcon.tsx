import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function ChessBoardIcon(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="0 0 448 512" fill={parentTextColor} {...props}>
            <Path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm64 64v64h64V96h64v64h64V96h64v64H320v64h64v64H320v64h64v64H320V352H256v64H192V352H128v64H64V352h64V288H64V224h64V160H64V96h64zm64 128h64V160H192v64zm0 64V224H128v64h64zm64 0H192v64h64V288zm0 0h64V224H256v64z"/>
        </Svg>
    )
}

