import { defineNuxtPlugin } from '#app'
import LaTeX from 'latex.js'

export default defineNuxtPlugin(async (nuxtApp) => {
    const LaTeX = await import('latex.js').then(m => m.default || m) as any

    return {
        provide: {
            latex: () => new LaTeX.Generator({ throwOnError: false })
        }
    }
})