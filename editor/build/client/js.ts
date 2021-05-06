import fs from 'fs-extra'
import { performance } from 'perf_hooks'
import readLines from 'n-readlines'
import esbuild from 'esbuild'
import he from 'he'

import { log } from '../log'

const linesToShow = 3

// from https://stackoverflow.com/a/43532829/1955997
function roundTo(value: number, digits: number): number {
    value = value * Math.pow(10, digits)
    value = Math.round(value)
    value = value / Math.pow(10, digits)
    return value
}

async function outputError(dir: string, cache: string, e: esbuild.BuildFailure) {
    log('[BUILD]', 'error compiling javascript.')
    let s = ''
    if (!e.errors) {
        s += e.stack.replaceAll('\n', '<br>')
    } else {
        for (const error of e.errors) {
            const lines = new readLines(error.location.file)
            let i = 1, line
            while (line = lines.next()) {
                if (i >= error.location.line - linesToShow && i <= error.location.line + linesToShow) {
                    if (i === error.location.line) {
                        let actual = line.toString()
                        actual = `${he.encode(actual.substr(0, error.location.column))}` +
                            `<span style="background:red">${he.encode(actual.substr(error.location.column, error.location.length))}</span>` +
                            he.encode(actual.substr(error.location.column + error.location.length))
                        s += `<div style="background:blue;color:white">${actual}</div>`
                    } else {
                        s += `${he.encode(line.toString())}<br>`
                    }
                }
                i++
            }
        }
    }
    const script = `window.addEventListener('load', () => {
        document.body.style.background = 'white'
        document.body.style.fontFamily = 'Consolas,monaco,monospace'
        document.body.style.margin = '1rem'
        document.body.style.width = 'auto'
        document.body.style.height = 'auto'
        document.body.innerHTML = '${he.encode(e.toString()).replaceAll('\n', '<br>')}<br><br>${s}'
    });` + await fs.readFile('./build/live.js')
    await fs.outputFile(`${dir}/index${cache}.js`, script)
}

export async function buildJs(dir: string, cache: string, minify: boolean = false) {
    const now = performance.now()
    try {
        await esbuild.build({
            entryPoints: ['editor/code/main.ts'],
            bundle: true,
            inject: ['editor/build/client/live.js'],
            define: minify ? { 'window.RELEASE': 'false' } : { 'window.RELEASE': 'true' },
            outfile: `${dir}/index${cache}.js`,
            minify,
            sourcemap: !minify,
            incremental: !minify,
        })
        log('[BUILD]', `packaged javascript (${roundTo(performance.now() - now, 2)}ms).`)
    } catch (e) {
        log('[BUILD]', e)
        outputError(dir, cache, e)
    }
}
