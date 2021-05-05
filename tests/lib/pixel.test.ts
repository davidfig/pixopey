import { Pixel } from '../../lib/pixel'
import { Layer } from '../../lib/layers/layer'

describe('Pixel', () => {
    it('constructor', () => {
        const pixel = new Pixel()
        expect(pixel.name).toEqual('')
        expect(pixel.layers.length).toEqual(0)
        expect(pixel.animations).toBeDefined()
    })

    it('.name', () => {
        const pixel = new Pixel()
        pixel.name = 'test'
        expect(pixel.name).toEqual('test')
    })

    it('add()', () => {
        const pixel = new Pixel()
        const layer = new Layer()
        pixel.add(layer)
        expect(pixel.layers[0]).toEqual(layer)
        const layer2 = new Layer()
        pixel.add(layer, 0)
        expect(pixel.layers[0]).toEqual(layer2)
        expect(pixel.layers[1]).toEqual(layer)
    })

    it('remove()', () => {
        const pixel = new Pixel()
        const layer = new Layer()
        pixel.add(layer)
        const layer2 = new Layer()
        pixel.add(layer2)
        expect(pixel.remove(layer)).toEqual(layer)
        expect(pixel.layers.length).toEqual(1)
        expect(pixel.layers[0]).toEqual(layer2)
    })

    it('remove() with tree search', () => {
        const pixel = new Pixel()
        const layer = new Layer()
        pixel.add(layer)
        const subLayer = new Layer()
        layer.add(subLayer)
        expect(pixel.remove(subLayer, true)).toEqual(subLayer)
        const test = new Layer()
        expect(pixel.remove(test, true)).toEqual(null)
        expect(pixel.remove(test, false)).toEqual(null)
    })

    it('load()/save()', () => {
        const pixel = new Pixel()
        pixel.name = 'test'
        const layer = new Layer()
        layer.name = 'test-layer'
        pixel.add(layer)
        const layer2 = new Layer()
        layer2.name = 'test-layer-2'
        pixel.add(layer2)
        const save = pixel.save()

        const pixel2 = new Pixel(save)
        expect(pixel2.name).toEqual(pixel.name)
        expect(pixel2.layers.length).toEqual(2)
        expect(pixel2.layers[0].name).toEqual(pixel.layers[0].name)
        expect(pixel2.layers[1].name).toEqual(pixel.layers[1].name)
    })
})