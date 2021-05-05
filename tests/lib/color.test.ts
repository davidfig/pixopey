import { Color } from '../../lib/color'

describe('color', () => {
    it('constructor', () => {
        const color = new Color()
        expect(color.color).toEqual(0)
        expect(color.alpha).toEqual(1)
    })

    it('.color, .alpha', () => {
        const color = new Color()
        color.color = 2
        expect(color.color).toEqual(2)
        expect(color.alpha).toEqual(1)
        color.alpha = 0.5
        expect(color.color).toEqual(2)
        expect(color.alpha).toEqual(0.5)
    })

    it('clone()', () => {
        const color = new Color()
        color.color = 2
        color.alpha = 0.25
        const color2 = color.clone()
        expect(color2.color).toEqual(2)
        expect(color2.alpha).toEqual(0.25)
    })

    it('copy()', () => {
        const color = new Color()
        color.color = 2
        color.alpha = 0.25
        const color2 = new Color()
        color2.copy(color)
        expect(color2.color).toEqual(2)
        expect(color2.alpha).toEqual(0.25)
    })

    it('save()', () => {
        const color = new Color()
        color.color = 2
        color.alpha = 0.25
        const save = color.save()
        expect(save.color).toEqual(color.color)
        expect(save.alpha).toEqual(color.alpha)
    })

    it('load()', () => {
        const color = new Color()
        color.color = 2
        color.alpha = 0.25
        const save = color.save()
        const color2 = new Color()
        color2.load(save)
        expect(save.color).toEqual(color.color)
        expect(save.alpha).toEqual(color.alpha)
    })
})