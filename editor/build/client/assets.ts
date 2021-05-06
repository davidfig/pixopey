import fs from 'fs-extra'
import path from 'path'

import { log } from '../log'

const publicDir = 'editor/public/'
const title = 'Pixopey'

const exceptions = ['index.html']

async function index(dir: string, cache: string) {
    let index = await fs.readFile(`${publicDir}index.html`) + ''
    index = index.replace('{{css}}', `<link rel="stylesheet" href="index${cache}.css">`)
    index = index.replace('{{script}}', `<script src="index${cache}.js"></script>`)
    index = index.replaceAll('{{title}}', title)
    await fs.outputFile(`${dir}index.html`, index)
}

async function copyDir(from: string, to: string, cache: string, skipEmpty?: boolean) {
    if (!skipEmpty) {
        await fs.emptyDir(to)
    }
    const files = await fs.readdir(from)
    for (const file of files) {
        const full = path.join(from, file)
        if ((await fs.lstat(full)).isDirectory()) {
            await copyDir(full, path.join(to, file), cache)
        } else {
            if (!exceptions.includes(file)) {
                await fs.copyFile(full, path.join(to, file))
            }
        }
    }
}

export async function buildAssets(dir: string, cache: string, skipEmpty?: boolean) {
    log('BUILD', `Copying ${publicDir} to ${dir} with cache=${cache}...`, 0)
    await copyDir(publicDir, dir, cache, skipEmpty)
    await index(dir, cache)
}
