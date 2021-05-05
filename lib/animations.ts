export interface AnimationsSave {

}

export class Animations {
    load(animationsSave: AnimationsSave) {

    }

    save(): AnimationsSave {
        const animationsSave: Partial<AnimationsSave> = {}

        return animationsSave as AnimationsSave
    }
}