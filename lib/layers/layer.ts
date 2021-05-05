import { Pixel } from './pixel'

export interface LayerSave {
    name: string
    type: LayerType
    layers: LayerSave[]
}

export enum LayerType {
    layer,
    pixel,
    ellipse,
}

export class Layer {
    name: string
    type: LayerType
    layers: Layer[]

    constructor(type: LayerType = LayerType.layer) {
        this.type = type
        this.layers = []
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

    load(save: LayerSave) {
        this.name = save.name
    }

    save(): LayerSave {
        const layers: LayerSave[] = []
        for (const layer of this.layers) {
            layers.push(layer.save())
        }
        return {
            name: this.name,
            type: this.type,
            layers,
        }
    }
}