import { Layer, LayerSave, LayerType } from './layer'
import { Point, PointSave } from '../point'

export interface LineLayerSave extends LayerSave {
    point1: PointSave
    point2: PointSave
}

export class Line extends Layer {
    point1: Point
    point2: Point

    constructor() {
        super(LayerType.line)
        this.point1 = new Point()
        this.point2 = new Point()
    }

    save(): LineLayerSave {
        const save: Partial<LineLayerSave> = super.save()
        save.point1 = this.point1.save()
        save.point2 = this.point2.save()
        return save as LineLayerSave
    }

    load(load: LineLayerSave) {
        this.point1.load(load.point1)
        this.point2.load(load.point2)
    }
}