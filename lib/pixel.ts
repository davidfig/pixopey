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

    add(layer: Layer, index: number = this.layers.length - 1): this {
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

    load(save?: PixelSave) {
        this.name = save.name
        this.layers = []
        for (const layerSave of save.layers) {
            const layer = create(layerSave)
            layer.load(layerSave)
            this.layers.push(layer)
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