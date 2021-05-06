export interface ColorSave {
    color: number
    alpha: number
}

export class Color {
    color: number
    alpha: number

    constructor(color = 0, alpha = 1) {
        this.color = color
        this.alpha = alpha
    }

    clone(): Color {
        const clone = new Color()
        clone.color = this.color
        clone.alpha = this.alpha
        return clone
    }

    copy(copy: Color) {
        this.color = copy.color
        this.alpha = copy.alpha
    }

    save(): ColorSave {
        return {
            color: this.color,
            alpha: this.alpha,
        }
    }

    load(load: ColorSave) {
        this.color = load.color
        this.alpha = load.alpha
    }
}