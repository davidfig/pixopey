import ts from 'typescript'
import chokidar from 'chokidar'
import { log } from './log'

const ENTRY_POINTS = ['editor/code/main.ts']
const WATCH = ['editor/code/**/*', 'lib/**/*']

export function checkTypescript() {
    const tsWatch = chokidar.watch(WATCH, {
        awaitWriteFinish: {
            stabilityThreshold: 250,
            pollInterval: 100,
        },
    })
    tsWatch.on('change', async () => check())
    check()
}

function check() {
    const program = ts.createProgram({
        "rootNames": ENTRY_POINTS,
        options: {
            "target": ts.ScriptTarget.ESNext,
            "sourceMap": true,
            "allowJs": false,
            "esModuleInterop": true,
            "noEmit": true,
            "declaration": false,
            "module": ts.ModuleKind.ESNext,
            "resolveJsonModule": true,
            "skipLibCheck": true,
            "moduleResolution": ts.ModuleResolutionKind.NodeJs,
        }
    })
    const diagnostics = ts.getPreEmitDiagnostics(program)
    if (diagnostics.length === 0) {
        log('[TYPESCRIPT] compiled clean.')
    } else {
        let s = '[TYPESCRIPT] Errors:\n\n'
        for (const diagnostic of diagnostics) {
            const message = diagnostic.messageText
            const file = diagnostic.file
            const filename = file.fileName

            const lineAndChar = file.getLineAndCharacterOfPosition(
                diagnostic.start
            )

            const line = lineAndChar.line + 1
            const character = lineAndChar.character + 1

            s += `${message}\n(${filename}:${line}:${character})\n\n`
        }
        log(s)
    }
}