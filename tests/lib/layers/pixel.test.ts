import { Pixel } from '../../../lib/layers/pixel'
import { LayerType } from '../../../lib/layers/layer'
import { Point } from '../../../lib/point'
import { Color } from '../../../lib/color'

describe('pixel (layer)', () => {
    it('constructor', () => {
        const pixel = new Pixel()
        expect(pixel.type).toBe(LayerType.pixel)
        expect(pixel.pixels.length).toBe(0)
    })

    it('get/set', () => {
        const pixel = new Pixel()
        pixel.set(new Point(2, 3), new Color(1, 2))
        expect(pixel.get(new Point(2, 3))).toEqual(new Color(1, 2))
        pixel.set(new Point(2, 3), new Color(3, 4))
        expect(pixel.pixels.length).toBe(1)
        expect(pixel.get(new Point(2, 3))).toEqual(new Color(3, 4))
        pixel.set(new Point(1, 2), new Color(4, 5))
        expect(pixel.pixels.length).toBe(2)
        expect(pixel.get(new Point(1, 2))).toEqual(new Color(4, 5))
    })

    it('save/load', () => {
        const pixel = new Pixel()
        pixel.set(new Point(2, 3), new Color(1, 2))
        pixel.set(new Point(1, 2), new Color(4, 5))
        const save = pixel.save()
        const pixel2 = new Pixel()
        pixel2.load(save)
        expect(pixel2.get(new Point(2, 3))).toEqual(new Color(1, 2))
        expect(pixel2.get(new Point(1, 2))).toEqual(new Color(4, 5))
    })
})