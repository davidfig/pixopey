import { Point } from '../../lib/point'

describe('point', () => {
    it('new Point()', () => {
        const point = new Point()
        expect(point.x).toEqual(0)
        expect(point.y).toEqual(0)
    })

    it('new Point(x, y)', () => {
        const point = new Point(1, 2)
        expect(point.x).toEqual(1)
        expect(point.y).toEqual(2)
    })

    it('new Point(point)', () => {
        const point = new Point(1, 2)
        const point2 = new Point(point)
        expect(point2.x).toEqual(1)
        expect(point2.y).toEqual(2)
    })

    it('.x, .y', () => {
        const point = new Point(1, 2)
        point.x = 3
        expect(point.x).toEqual(3)
        expect(point.y).toEqual(2)
        point.y = 4
        expect(point.x).toEqual(3)
        expect(point.y).toEqual(4)
    })

    it('point.copy()', () => {
        const point = new Point(1, 2)
        const point2 = new Point()
        point2.copy(point)
        expect(point2.x).toEqual(1)
        expect(point2.y).toEqual(2)
    })

    it('point.save()', () => {
        const point = new Point(1, 2)
        const save = point.save()
        expect(save.x).toEqual(1)
        expect(save.y).toEqual(2)
    })

    it('point.clone()', () => {
        const point = new Point(1, 2)
        const clone = point.clone()
        expect(clone.x).toEqual(point.x)
        expect(clone.y).toEqual(point.y)
    })

    it('point.equals()', () => {
        const point = new Point(1, 2)
        const point2 = new Point(1, 2)
        const point3 = new Point(1, 3)
        const point4 = new Point(2, 2)
        const point5 = new Point(3, 4)
        expect(point.equals(point2)).toBeTruthy()
        expect(point.equals(point3)).not.toBeTruthy()
        expect(point.equals(point4)).not.toBeTruthy()
        expect(point.equals(point5)).not.toBeTruthy()
    })

    it('point.load()', () => {
        const point = new Point(1, 2)
        const save = point.save()
        const point2 = new Point(3, 4)
        point2.load(save)
        expect(point2.x).toEqual(point.x)
        expect(point2.y).toEqual(point.y)
    })

    it('point.set()', () => {
        const point = new Point(1, 2)
        point.set(3, 4)
        expect(point.x).toBe(3)
        expect(point.y).toBe(4)
        point.set(5)
        expect(point.x).toBe(5)
        expect(point.y).toBe(5)
    })
})
