export interface PointSave {
    x: number
    y: number
}

export class Point {
    x: number
    y: number

    constructor(x?: number | Point, y?: number) {
        if (typeof x === 'undefined') {
            this.x = 0
            this.y = 0
        } else if (x instanceof Point) {
            this.copy(x as Point)
        } else {
            this.x = x
            this.y = y
        }
    }

    copy(point: Point) {
        this.x = point.x
        this.y = point.y
    }

    clone(): Point {
        return new Point(this.x, this.y)
    }

    save(): PointSave {
        return {
            x: this.x,
            y: this.y,
        }
    }

    equals(point: Point): boolean {
        return point.x === this.x && point.y === this.y
    }

    load(save: PointSave) {
        this.x = save.x
        this.y = save.y
    }
}