import { Layer, LayerSave, LayerType } from './layer'
import { Point, PointSave } from '../point'
import { Color, ColorSave } from '../color'

interface PixelPoint {
    point: Point
    color: Color
}

interface PixelPointSave {
    point: PointSave
    color: ColorSave
}

interface PixelLayerSave extends LayerSave {
    pixels: PixelPointSave[]
}

export class Pixel extends Layer {
    pixels: PixelPoint[] = []

    constructor() {
        super(LayerType.pixel)
    }

    set(point: Point, color: Color) {
        const location = this.pixels.find((pp: PixelPoint) => pp.point.equals(point))
        if (location) {
            location.color.copy(color)
        } else {
            this.pixels.push({ point: point.clone(), color: color.clone() })
        }
    }

    get(x: number | Point, y?: number): Color | null {
        let point: Point
        if (typeof x === 'number') {
            point = new Point(x as number, y)
        } else {
            point = x as Point
        }
        const find = this.pixels.find((pp: PixelPoint) => pp.point.equals(point))
        if (find) {
            return find.color
        } else {
            return null
        }
    }

    save(): PixelLayerSave {
        const save: Partial<PixelLayerSave> = super.save()
        save.pixels = []
        for (const pp of this.pixels) {
            save.pixels.push({
                point: pp.point.save(),
                color: pp.color.save()
            })
        }
        return save as PixelLayerSave
    }

    load(save: PixelLayerSave) {
        super.load(save)
        this.pixels = []
        for (const pp of save.pixels) {
            const point = new Point()
            point.load(pp.point)
            const color = new Color()
            color.load(pp.color)
            this.pixels.push({ point, color })
        }
    }
}