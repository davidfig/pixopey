import { LayerType, Layer } from './layer'
import { Pixel } from './pixel'

export function create(type: LayerType) {
    switch (type) {
        case LayerType.layer:
            return new Layer()

        case LayerType.pixel:
            return new Pixel()
    }
}
