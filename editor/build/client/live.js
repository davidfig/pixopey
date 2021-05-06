const PORT = 1235
const RESTART_TIME = 200
let first = true

function createSocket() {
    const socket = new WebSocket(`ws://localhost:${PORT}`)
    socket.addEventListener('message', () => window.location.reload())
    socket.addEventListener('close', () => {
        setTimeout(createSocket, RESTART_TIME)
    })
    socket.addEventListener('open', () => {
        if (!first) {
            window.location.reload()
        } else {
            first = false
        }
    })
}

window.addEventListener('load', () => {
    createSocket()
    console.log(`Live reload listening on port ${PORT}...`)
})