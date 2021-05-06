import { LayerType } from '../../../lib/layers/layer'
import { Ellipse } from '../../../lib/layers/ellipse'

describe('Ellipse', () => {
    it('constructor()', () => {
        const ellipse = new Ellipse()
        expect(ellipse.type).toBe(LayerType.ellipse)
        expect(ellipse.radiusWidth).toBe(1)
        expect(ellipse.radiusHeight).toBe(1)
    })

    it('.radiusWidth, .radiusHeight', () => {
        const ellipse = new Ellipse()
        ellipse.radiusWidth = 2
        ellipse.radiusHeight = 3
        expect(ellipse.radiusWidth).toBe(2)
        expect(ellipse.radiusHeight).toBe(3)
    })

    it('.center', () => {
        const ellipse = new Ellipse()
        ellipse.center.set(2, 3)
        expect(ellipse.center.x).toBe(2)
        expect(ellipse.center.y).toBe(3)
    })

    it('save/load', () => {
        const ellipse = new Ellipse()
        ellipse.center.set(2, 3)
        ellipse.radiusWidth = 4
        ellipse.radiusHeight = 5
        const save = ellipse.save()
        const ellipse2 = new Ellipse()
        ellipse2.load(save)
        expect(ellipse2.center.x).toBe(2)
        expect(ellipse2.center.y).toBe(3)
        expect(ellipse2.radiusWidth).toBe(4)
        expect(ellipse2.radiusHeight).toBe(5)
    })
})