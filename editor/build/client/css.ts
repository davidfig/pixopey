import fs from 'fs-extra'
import path from 'path'

import { log } from '../log'

let _css = ''

async function css(dir: string) {
    const files = await fs.readdir(dir, { withFileTypes: true })
    for (const file of files) {
        if (file.isDirectory()) {
            await css(dir + file.name + '/')
        } else if (path.extname(file.name) === '.css') {
            const data = await fs.readFile(dir + file.name)
            _css += data
        }
    }
    _css = _css.replaceAll('  ', '')
    _css = _css.replaceAll(': ', ':')
    _css = _css.replaceAll('\n', '')
    _css = _css.replaceAll('\r', '')
}

export async function buildCss(dir: string, cache: string) {
    _css = ''
    await css('code/')
    await fs.outputFile(`${dir}index${cache}.css`, _css)
    log('BUILD', 'packaged css.', 0)
}