declare module 'latex.js' {
    class Generator {
        constructor(options?: { throwOnError?: boolean })
        createFragment(source: string): Promise<DocumentFragment>
    }

    const _default: {
        Generator: typeof Generator
    }

    export default _default
}