import { useMemo } from 'react'
import { LayoutRectangle, View } from 'react-native'
import Svg, { Rect, Defs, LinearGradient, Stop, RadialGradient, Path, Mask, Circle } from 'react-native-svg'
import { ShadowModel } from './ShadowModel'

export type BoxShadow = {
    x?: number;
    y?: number;
    blur?: number;
    radius?: number;
    color?: string;
}

type SVGShadowProps = {
    settings: BoxShadow
    layout: LayoutRectangle
    borderRadius?: number
}

export function SVGShadow({ layout, settings, borderRadius = 0 }: SVGShadowProps) {

    borderRadius = borderRadius ?? 0

    const shadow = useMemo(() => (
        new ShadowModel({ layout, settings, borderRadius })
    ), [ layout, settings, borderRadius ])

    return (
        <View style={{ position: "absolute", height: shadow.canvas.height, width: shadow.canvas.width, top: shadow.canvas.top, left: shadow.canvas.left, zIndex: -1 }}>
            <Svg height={shadow.canvas.height} width={shadow.canvas.width}>
                <Defs>
                    {shadow.linearGradients.map(({ stops, ...gradient }) => (
                        <LinearGradient {...gradient} key={gradient.id}>
                            {stops.map((stop, index) => (
                                <Stop key={index} {...stop} />
                            ))}
                        </LinearGradient>
                    ))}
                    {shadow.radialGradients.map(({ stops, ...gradient }) => (
                        <RadialGradient {...gradient} key={gradient.id}>
                            {stops.map((stop, index) => (
                                <Stop key={index} {...stop} />
                            ))}
                        </RadialGradient>
                    ))}
                    <Mask id={`s-${shadow.id}-caster`}>
                        <Rect
                            x="0"
                            y="0"
                            width={shadow.canvas.width}
                            height={shadow.canvas.height}
                            fill="white" />
                        <Rect
                            rx={shadow.caster.borderRadius}
                            x={shadow.caster.x}
                            y={shadow.caster.y}
                            width={shadow.caster.width}
                            height={shadow.caster.height}
                            fill="black"
                        />
                    </Mask>
                </Defs>
                {shadow.boxes.map(box => (
                    <Rect key={box.fill} {...box.props} mask={`url(#s-${shadow.id}-caster)`}/>
                ))}
            </Svg>
        </View>
    )
}