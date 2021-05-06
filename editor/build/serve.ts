import express from 'express'

import { PORT } from './settings'
import { log } from './log'

export function serve() {
    const app = express()
    app.use(express.static('editor/dist/'))
    app.listen(PORT, () => log(`[BUILD] editor listening on http://localhost:${PORT}`))
}