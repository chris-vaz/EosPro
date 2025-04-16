<template>
    <div class="w-full h-full">
        <div class="w-full h-full" ref="editorContainer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    isDarkMode: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const editorContainer = ref(null)
let editor = null

// Initialize Monaco editor
onMounted(async () => {
    if (process.client && editorContainer.value) {
        try {
            // Dynamically import monaco-editor only on client side
            const monaco = await import('monaco-editor')

            // Register LaTeX language if not already registered
            if (!monaco.languages.getLanguages().some(lang => lang.id === 'latex')) {
                monaco.languages.register({ id: 'latex' })

                // Basic LaTeX syntax highlighting definition
                monaco.languages.setMonarchTokensProvider('latex', {
                    defaultToken: '',
                    tokenizer: {
                        root: [
                            [/\\[a-zA-Z]+/, 'keyword'],
                            [/\{|\}|\[|\]/, 'delimiter.bracket'],
                            [/%.*$/, 'comment'],
                            [/\$\$?/, 'string'],
                            [/&/, 'operator'],
                        ]
                    }
                })
            }

            editor = monaco.editor.create(editorContainer.value, {
                value: props.modelValue,
                language: 'latex',
                theme: props.isDarkMode ? 'vs-dark' : 'vs',
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                fontSize: 14,
                tabSize: 2
            })

            // Update the v-model when the editor content changes
            editor.onDidChangeModelContent(() => {
                emit('update:modelValue', editor.getValue())
            })

            // Watch for dark mode changes
            watch(() => props.isDarkMode, (isDark) => {
                if (editor) {
                    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
                }
            })

            // Watch for modelValue changes from parent
            watch(() => props.modelValue, (newValue) => {
                if (editor && newValue !== editor.getValue()) {
                    editor.setValue(newValue)
                }
            })

        } catch (error) {
            console.error('Failed to initialize Monaco editor:', error)
        }
    }
})

// Clean up on component unmount
onBeforeUnmount(() => {
    if (editor) {
        editor.dispose()
    }
})
</script>