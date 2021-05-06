import WebSocket from 'ws'

import { log } from './log'

const RELOAD_PORT = 1235

class Reload {
    private client: WebSocket
    private wss: WebSocket.Server
    private locked: number

    start() {
        this.wss = new WebSocket.Server({
            port: RELOAD_PORT,
        })
        this.wss.on('connection', (websocket: WebSocket) => this.client = websocket)
        log(`[RELOAD] Live reload socket server running on port ${RELOAD_PORT}`)
        this.locked = 0
    }

    lock() {
        this.locked++
    }

    signal() {
        this.locked--
        if (this.locked === 0) {
            log('[RELOAD]', `Requesting live reload of connected client.`)
            this.client.send()
        }
    }
}

export const reload = new Reload()