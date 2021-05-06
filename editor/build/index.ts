import { log } from './log'
import { serve } from './serve'
import { development } from './development'

async function start() {
    log('[BUILD] Starting live-reload development server script')
    development()
    serve()
}

start()