import fs from 'fs-extra'
import chokidar from 'chokidar'

import { log } from './log'
import { reload } from './socket'
import { buildJs } from './client/js'
import { buildCss } from './client/css'
import { buildAssets } from './client/assets'
import { checkTypescript } from './typescript'

let _cache: string,
    _dir: string

async function watch() {
    const awaitWriteFinish = {
        stabilityThreshold: 250,
        pollInterval: 100
    }

    const jsWatch = chokidar.watch(['lib/**/*.ts', 'editor/code/**/*.ts'], { awaitWriteFinish })
    jsWatch.on('change', async file => {
        reload.lock()
        log(`[BUILD] ${file} changed...`)
        await buildJs(_dir, _cache, false)
        reload.signal()
    })
    const cssWatch = chokidar.watch('editor/code/**/*.css', { awaitWriteFinish })
    cssWatch.on('change', async () => {
        reload.lock()
        await buildCss(_dir, _cache)
        reload.signal()
    })

    const assets = chokidar.watch(['editor/public/**/*'], { awaitWriteFinish })
    assets.on('change', async () => {
        reload.lock()
        await buildAssets(_dir, _cache, true)
        reload.signal()
    })
}

export async function development() {
    _cache = ''
    _dir = 'editor/dist/'
    await fs.emptyDir(_dir)
    await buildAssets(_dir, _cache)
    await buildCss(_dir, _cache)
    await buildJs(_dir, _cache, false)
    watch()
    reload.start()
    checkTypescript()
    return _dir
}