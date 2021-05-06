function addZero(s: number): string {
    if (s.toString().length < 2) {
        return `0${s}`
    } else {
        return s.toString()
    }
}

function time() {
    const time = new Date()
    let hours = time.getHours()
    let pm = false
    if (hours > 12) {
        hours -= 12
        pm = true
    }
    return `[${hours}:${addZero(time.getMinutes())}:${addZero(time.getSeconds())}${pm ? 'pm' : 'am'}]`
}

export function warn(...args: any) {
    console.warn(time(), ...args)
}

export function log(...args: any) {
    let lines = []
    for (let i = 0; i < args.length; i++) {
        lines.push(args[i])
    }
    console.log(time(), ...lines)
}
