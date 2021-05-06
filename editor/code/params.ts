const searchParams = new URLSearchParams(window.location.search);

export function params(name: string): boolean {
    return searchParams.has(name)
}