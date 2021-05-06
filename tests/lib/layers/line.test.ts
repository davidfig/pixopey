import { LayerType } from '../../../lib/layers/layer'
import { Line } from '../../../lib/layers/line'
import { Point } from '../../../lib/point'

describe('Line', () => {
    it('constructor()', () => {
        const line = new Line()
        expect(line.type).toBe(LayerType.line)
        expect(line.point1).toEqual(Point.ZERO)
        expect(line.point2).toEqual(Point.ZERO)
    })

    it('.point1, .point2', () => {
        const line = new Line()
        line.point1.set(2, 3)
        line.point2.set(4, 5)
        expect(line.point1).toEqual(new Point(2, 3))
        expect(line.point2).toEqual(new Point(4, 5))
    })

    it('save/load', () => {
        const line = new Line()
        line.point1.set(2, 3)
        line.point2.set(4, 5)
        const save = line.save()
        const line2 = new Line()
        line2.load(save)
        expect(line2.point1).toEqual(new Point(2, 3))
        expect(line2.point2).toEqual(new Point(4, 5))
    })
})