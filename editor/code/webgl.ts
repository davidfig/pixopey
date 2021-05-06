import { FPS } from 'yy-fps'
import { Container, Renderer } from 'pixi.js'

import { params } from './params'

const renderer = new Renderer({
    resolution: window.devicePixelRatio,
    antialias: true,
    backgroundAlpha: 0,
})

const stage = new Container()
let dirty = true
let fps: FPS

export function resize() {
    renderer.resize(window.innerWidth, window.innerHeight)
}

function update() {
    if (dirty) {
        renderer.render(stage)
        dirty = false
    }
    if (fps) {
        fps.frame()
    }
    requestAnimationFrame(update)
}

export function webgl() {
    if (params('fps')) {
        fps = new FPS()
    }
    resize()
    renderer.view.className = 'webgl'
    document.body.appendChild(renderer.view)
    update()
}