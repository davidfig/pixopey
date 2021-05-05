import { Layer, LayerSave, LayerType } from './layer'
import { Pixel } from './pixel'

export function create(layerSave: LayerSave) {
    switch (layerSave.type) {
        case LayerType.layer:
            return new Layer()

        case LayerType.pixel:
            return new Pixel()
    }
}