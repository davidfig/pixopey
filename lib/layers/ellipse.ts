import { Layer, LayerSave, LayerType } from './layer'
import { Point, PointSave } from '../point'

export interface EllipseLayerSave extends LayerSave {
    radiusWidth: number
    radiusHeight: number
    center: PointSave
}

export class Ellipse extends Layer {
    radiusWidth: number
    radiusHeight: number
    center: Point

    constructor() {
        super(LayerType.ellipse)
        this.radiusWidth = 1
        this.radiusHeight = 1
        this.center = new Point()
    }

    save(): EllipseLayerSave {
        const save: Partial<EllipseLayerSave> = super.save()
        save.radiusWidth = this.radiusWidth
        save.radiusHeight = this.radiusHeight
        save.center = this.center.save()
        return save as EllipseLayerSave
    }

    load(load: EllipseLayerSave) {
        this.radiusWidth = load.radiusWidth
        this.radiusHeight = load.radiusHeight
        this.center.load(load.center)
    }
}