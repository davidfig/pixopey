import { Animations, AnimationsSave } from './animations'
import { Layer, LayerSave } from './layers/layer'
import { create } from './layers/create'

export interface PixelSave {
    name: string
    layers: LayerSave[]
    animations: AnimationsSave
}

export class Pixel {
    name: string
    layers: Layer[]
    animations: Animations

    constructor(save?: PixelSave) {
        this.animations = new Animations()
        if (save) {
            this.load(save)
        } else {
            this.name = ''
            this.layers = []
        }
    }

    add(layer: Layer, index: number = this.layers.length): this {
        this.layers.splice(index, 0, layer)
        return this
    }

    remove(layer: Layer, searchEntireTree?: boolean): Layer | null {
        const index = this.layers.indexOf(layer)
        if (index === -1) {
            if (searchEntireTree) {
                for (const search of this.layers) {
                    if (search.remove(layer, true)) {
                        return layer
                    }
                }
                return null
            } else {
                return null
            }
        } else {
            this.layers.splice(index, 1)
            return layer
        }
    }

    loadLayer(parent: Pixel | Layer, save: LayerSave) {
        const layer = create(save.type)
        layer.load(save)
        parent.layers.push(layer)
        for (const layerSave of save.layers) {
            this.loadLayer(layer, layerSave)
        }
    }

    load(save: PixelSave) {
        this.name = save.name
        this.layers = []
        for (const layerSave of save.layers) {
            this.loadLayer(this, layerSave)
        }
        this.animations.load(save.animations)
    }

    save(): PixelSave {
        const layers: LayerSave[] = []
        for (const layer of this.layers) {
            layers.push(layer.save())
        }
        return {
            name: this.name,
            layers,
            animations: this.animations.save(),
        }
    }
}