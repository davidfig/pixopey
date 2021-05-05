import { Layer, LayerType } from '../../../lib/layers/layer'

describe('Layer', () => {
    it('constructor', () => {
        const layer = new Layer()
        expect(layer.type).toEqual(LayerType.layer)
        expect(layer.layers.length).toEqual(0)
        const layer2 = new Layer(LayerType.ellipse)
        expect(layer2.type).toEqual(LayerType.ellipse)
    })

    it('add()', () => {
        const layer = new Layer()
        const subLayer = new Layer()
        layer.add(subLayer)
        expect(layer.layers[0]).toEqual(subLayer)
        const subLayer2 = new Layer()
        layer.add(subLayer2)
        expect(layer.layers[0]).toEqual(subLayer2)
        expect(layer.layers[1]).toEqual(subLayer)
    })

    it('remove()', () => {
        const layer = new Layer()
        const subLayer = new Layer()
        layer.add(subLayer)
        const subLayer2 = new Layer()
        layer.add(subLayer2)
        expect(layer.remove(subLayer)).toEqual(subLayer)
        expect(layer.layers.length).toEqual(1)
        expect(layer.layers[0]).toEqual(subLayer2)
    })

    it('remove() with tree search', () => {
        const layer = new Layer()
        const subLayer = new Layer()
        layer.add(subLayer)
        const subSubLayer = new Layer()
        subLayer.add(subSubLayer)
        expect(layer.remove(subSubLayer, true)).toEqual(subSubLayer)
        const test = new Layer()
        expect(layer.remove(test, true)).toEqual(null)
        expect(layer.remove(test, false)).toEqual(null)
    })
})