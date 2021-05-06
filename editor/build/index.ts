import { log } from './log'
import { development } from './development'

async function start() {
    log('[BUILD] Starting live-reload development server script')
    development()
    serve()
}

start()