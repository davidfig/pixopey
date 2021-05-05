import { Layer, LayerSave, LayerType } from './layer'
import { Point, PointSave } from '../point'

export interface EllipseLayerSave extends LayerSave {
    width: number
    height: number
    position: PointSave
}

export class Ellipse extends Layer {
    width: number
    height: number
    position: Point

    constructor() {
        super(LayerType.ellipse)
        this.width = 1
        this.height = 1
        this.position = new Point()
    }

    save(): EllipseLayerSave {
        const save: Partial<EllipseLayerSave> = super.save()
        save.width = this.width
        save.height = this.height
        save.position = this.position.save()
        return save as EllipseLayerSave
    }

    load(load: EllipseLayerSave) {
        this.width = load.width
        this.height = load.height
        this.position.load(load.position)
    }
}