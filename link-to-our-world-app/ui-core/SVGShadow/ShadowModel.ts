import { BoxShadow } from "@triframe/ui-core"
import { LayoutRectangle, Platform } from "react-native"

type ShadowModelData = {
    layout: LayoutRectangle
    settings: BoxShadow
    borderRadius: number
}

type RadialGradientConstructor = {
    id: string, cx: string, cy: string
}

type LinearGradientConstructor = {
    id: string, x1: string, y1: string, x2: string, y2: string
}

type Stop = {
    offset: number, stopColor: string, stopOpacity: number
}

type LinearGradient = LinearGradientConstructor & {
    stops: Stop[]
}

type RadialGradient = RadialGradientConstructor & {
    r: string,
    fx: string,
    fy: string,
    stops: Stop[]
}

export class ShadowModel {

    id: number;

    canvas: Box;
    caster: Box;
    boxes: Box[];

    width: number
    height: number
    linearGradients: LinearGradient[]
    radialGradients: RadialGradient[]


    shadowOffset: {
        width: number, height: number
    }
    shadowRadius: number
    shadowBlur: number
    shadowColor: string
    borderRadius: number

    constructor({ layout, settings, borderRadius }: ShadowModelData) {
        const shadowRadius = settings.radius ?? 0;

        this.id = getIdForObject(layout);

        this.shadowOffset = {
            width: settings.x ?? 0,
            height: settings.y ?? 0
        },

        this.shadowBlur = settings.blur ?? 1;

        this.shadowRadius = shadowRadius,

        this.shadowColor = settings.color ?? 'rgba(0, 0, 0, 0.5)',

        this.borderRadius = borderRadius,

        this.width = layout.width + (shadowRadius * 2)
        this.height = layout.height + (shadowRadius * 2)
        this.linearGradients = []
        this.radialGradients = []

        let canvas = Box.with({
            width: layout.width + (shadowRadius * 2) + this.shadowOffset.width,
            height: layout.height + (shadowRadius * 2) + this.shadowOffset.height,
            left: -shadowRadius + this.shadowOffset.width,
            top: -shadowRadius + this.shadowOffset.height
        })

        let container = Box.with({
            width: layout.width + (shadowRadius * 2),
            height: layout.height + (shadowRadius * 2),
            left: -shadowRadius,
            top: -shadowRadius
        })

        let shortestSideLength = Math.min(container.height, container.width)

        let shadowCornerRadius = Math.min( Math.max( (shadowRadius) + (this.shadowBlur * shadowRadius), borderRadius), shortestSideLength / 2)

        let caster = Box.with({
            width: layout.width,
            height: layout.height,
            borderRadius: borderRadius,
            x: shadowRadius - this.shadowOffset.width,
            y: shadowRadius - this.shadowOffset.height
        })

        let topLeftCorner = Box.with({
            fill: this.createRadialGradient({ id: `s-${this.id}-bottom-right-radial`, cx: '100%', cy: '100%' }),
            width: shadowCornerRadius,
            height: shadowCornerRadius,
            top: 0,
            left: 0
        })

        let topRightCorner = Box.with({
            fill: this.createRadialGradient({ id: `s-${this.id}-bottom-left-radial`, cx: '0%', cy: '100%' }),
            width: shadowCornerRadius,
            height: shadowCornerRadius,
            top: 0,
            left: container.width - shadowCornerRadius
        })

        let bottomRightCorner = Box.with({
            fill: this.createRadialGradient({ id: `s-${this.id}-top-left-radial`, cx: '0%', cy: '0%' }),
            width: shadowCornerRadius,
            height: shadowCornerRadius,
            top: container.height - shadowCornerRadius,
            left: container.width - shadowCornerRadius,
        })

        let bottomLeftCorner = Box.with({
            fill: this.createRadialGradient({ id: `s-${this.id}-top-right-radial`, cx: '100%', cy: '0%' }),
            width: shadowCornerRadius,
            height: shadowCornerRadius,
            top: container.height - shadowCornerRadius,
            left: 0,
        })

        let topSide = Box.with({
            fill: this.createLinearGradient({ id: `s-${this.id}-bottom-to-top`, x1: '0%', y1: '100%', x2: '0%', y2: '0%' }),
            width: container.width - topLeftCorner.width - topRightCorner.width,
            height: shadowCornerRadius,
            top: 0,
            left: topLeftCorner.right,
        })

        let rightSide = Box.with({
            fill: this.createLinearGradient({ id: `s-${this.id}-left-to-right`, x1: '0%', y1: '0%', x2: '100%', y2: '0%' }),
            width: shadowCornerRadius,
            height: container.height - topRightCorner.height - bottomRightCorner.height,
            top: topRightCorner.height,
            left: container.width - shadowCornerRadius,
        })

        let bottomSide = Box.with({
            fill: this.createLinearGradient({ id: `s-${this.id}-top-to-bottom`, x1: '0%', y1: '0%', x2: '0%', y2: '100%' }),
            width: container.width - bottomLeftCorner.width - bottomRightCorner.width,
            height: shadowCornerRadius,
            top: container.height - shadowCornerRadius,
            left: bottomLeftCorner.right,
        })

        let leftSide = Box.with({
            fill: this.createLinearGradient({ id: `s-${this.id}-right-to-left`, x1: '100%', y1: '0%', x2: '0%', y2: '0%' }),
            width: shadowCornerRadius,
            height: container.height - topLeftCorner.height - bottomLeftCorner.height,
            top: topLeftCorner.height,
            left: 0,
        })

        let center = Box.with({
            fill: this.shadowColor,
            width: container.width - (shadowCornerRadius * 2),
            height: container.height - (shadowCornerRadius * 2),
            top: shadowCornerRadius,
            left: shadowCornerRadius
        })

        let boxes = [topLeftCorner, topSide, topRightCorner, rightSide, bottomRightCorner, bottomSide, bottomLeftCorner, leftSide, center]

        this.caster = caster;
        this.canvas = canvas;
        this.boxes = boxes;
    }

    createRadialGradient({ id, cx, cy }: RadialGradientConstructor) {
        let gradient = {
            id, r: '100%', cx, cy, fx: cx, fy: cy, stops: this.generateGradientStops()
        }
        this.radialGradients.push(gradient)
        return `url(#${id})`
    }

    createLinearGradient({ id, x1, y1, x2, y2 }: LinearGradientConstructor) {
        let gradient = {
            id, x1, y1, x2, y2, stops: this.generateGradientStops()
        }
        this.linearGradients.push(gradient)
        return `url(#${id})`
    }

    generateGradientStops(): Stop[]{
        const shadowBlur = this.shadowBlur;

        const shadowSpread = 1 - shadowBlur;

        const blurStart = (shadowSpread);

        const platformMultiplier = Platform.OS === 'web' ? 1 : 0.75

        return [
            { offset: blurStart, stopColor: this.shadowColor, stopOpacity: 1 * platformMultiplier },
            { offset: .75, stopColor: this.shadowColor, stopOpacity: 0.05 * platformMultiplier },
            { offset: 1, stopColor: this.shadowColor, stopOpacity: 0 * platformMultiplier },
        ]
    }
}

type Rect = {
    top: number, left: number, width: number, height: number
}

type BoxWithOptions ={
    width: number
    height: number
    top?: number
    left?: number
    right?: number,
    bottom?: number
    fill?: string
    borderRadius?: number
    x?: number
    y?: number
}

class Box {
    top: number;
    left: number;
    width: number;
    height: number;

    fill?: string
    borderRadius?: number
    x?: number
    y?: number

    constructor({ top, left, width, height }: Rect) {
        this.top = top
        this.left = left
        this.width = width
        this.height = height
    }

    get bottom() {
        return this.top + this.height
    }

    get right() {
        return this.left + this.width
    }

    get props() {
        return {
            fill: this.fill,
            x: this.left,
            y: this.top,
            width: this.width,
            height: this.height
        }
    }

    static with({ top, left, right, bottom, height, width, ...otherProperties }: BoxWithOptions) {
        if (bottom && !top) top = bottom - height
        if (right && !left) left = right - width

        top = top as number;
        left = left as number;
        let box = new Box({ top, left, width, height })
        Object.assign(box, otherProperties)
        return box
    }
}

const objectIds = new Map<any, number>();

let serial = 1;

export function getIdForObject(object: any): number {
    if(!objectIds.has(object)) {
        objectIds.set(object, serial++);
    }
    return objectIds.get(object) as number
}