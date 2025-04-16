<template>
    <ClientOnly>
        <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
            <!-- Toolbar -->
            <Toolbar :selected-template="selectedTemplate" :is-dark-mode="isDarkMode"
                @template-change="(val) => { selectedTemplate = val; changeTemplate(); }" @compile="compileLaTeX"
                @export="exportPdf" @toggle-theme="toggleTheme" />

            <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
                <!-- Left Panel: LaTeX Editor -->
                <div class="w-full md:w-1/2 p-4 overflow-hidden flex flex-col">
                    <h2 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">LaTeX Editor</h2>
                    <textarea v-model="latexCode"
                        class="flex-grow rounded shadow-md p-2 w-full font-mono border dark:bg-gray-800 dark:text-gray-100"
                        @input="handleCodeChange"></textarea>
                </div>

                <!-- Right Panel: Preview -->
                <div class="w-full md:w-1/2 p-4 overflow-hidden flex flex-col">
                    <h2 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">Preview</h2>
                    <div class="flex-grow rounded shadow-md bg-white p-4 overflow-auto"
                        ref="previewContainer">
                        <div v-if="compiling" class="flex items-center justify-center h-full">
                            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
                            </div>
                        </div>
                        <div v-else-if="error" class="text-red-500 p-4">
                            <h3 class="text-lg font-bold">Error:</h3>
                            <pre class="bg-red-100 dark:bg-red-900 p-3 rounded overflow-auto">{{ error }}</pre>
                        </div>
                        <div v-else v-html="renderedContent" class="latex-content"></div>
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { templates } from '~/utils/template.js'

// State management
const latexCode = ref('')
const isDarkMode = ref(false)
const compiling = ref(false)
const selectedTemplate = ref('blank')
const error = ref(null)
const renderedContent = ref('')

// Initialize with default template
onMounted(() => {
    latexCode.value = templates.blank
    isDarkMode.value = false
})

const handleCodeChange = () => {
    // You could implement auto-compilation here if desired
}

const compileLaTeX = async () => {
    if (process.server) return

    compiling.value = true
    error.value = null
    renderedContent.value = ''

    try {
        // Load from CDN if not already loaded
        if (!window.latexjs) {
            await loadScript('https://cdn.jsdelivr.net/npm/latex.js@0.12.4/dist/latex.js')
            // Give it a moment to initialize properly
            await new Promise(resolve => setTimeout(resolve, 100))
        }

        if (!window.latexjs || typeof window.latexjs.parse !== 'function') {
            throw new Error("LaTeX.js library didn't load correctly")
        }

        // Prepare LaTeX code - ensure it has proper structure
        let codeToCompile = latexCode.value.trim()

        // If the code doesn't have document structure, add a basic one
        if (!codeToCompile.includes('\\begin{document}')) {
            codeToCompile = '\\documentclass{article}\n\\begin{document}\n' + codeToCompile + '\n\\end{document}'
        }

        try {
            // Try to compile with LaTeX.js
            const parsed = window.latexjs.parse(codeToCompile, { generator: new window.latexjs.HtmlGenerator() })
            const fragment = parsed.domFragment()
            const tempDiv = document.createElement('div')
            tempDiv.appendChild(fragment)
            renderedContent.value = tempDiv.innerHTML
        } catch (latexError) {
            console.error('LaTeX.js parsing error:', latexError)

            // If we get an error, it might be due to unsupported LaTeX packages
            // Fall back to a more basic rendering
            renderedContent.value = renderBasicLatex(codeToCompile)

            // Show a warning about unsupported features
            error.value = 'Some LaTeX features may not be properly rendered. ' +
                (latexError.message || 'Complex document class or package not supported')
        }
    } catch (err) {
        console.error('LaTeX compilation error:', err)
        error.value = err.message || 'Failed to compile LaTeX code'
    } finally {
        compiling.value = false
    }
}

// Function to render basic LaTeX content without full LaTeX.js parsing
const renderBasicLatex = (code) => {
    // Extract content between \begin{document} and \end{document}
    const docStartIndex = code.indexOf('\\begin{document}')
    const docEndIndex = code.indexOf('\\end{document}')

    let content = code
    if (docStartIndex >= 0 && docEndIndex >= 0) {
        content = code.substring(docStartIndex + '\\begin{document}'.length, docEndIndex)
    }

    // Basic parsing of common LaTeX commands
    let html = '<div class="latex-document">'

    // Process the content by lines
    const lines = content.split('\n')
    let inSection = false
    let inItemize = false
    let inCvEntry = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        // Skip empty lines
        if (!line) continue

        // Handle sections
        if (line.startsWith('\\section{')) {
            const match = line.match(/\\section\{(.*?)\}/)
            if (match) {
                html += `<h2 class="text-xl font-bold mt-4 mb-2">${match[1]}</h2>`
            }
            continue
        }

        // Handle moderncv specific commands
        if (line.startsWith('\\cventry{')) {
            const parts = parseCvEntry(line)
            html += `<div class="cv-entry mb-3">
                <div class="flex justify-between">
                    <span class="font-bold">${parts.date}</span>
                    <span class="font-semibold">${parts.title}</span>
                </div>
                <div>${parts.organization}, ${parts.location}</div>
            </div>`

            // Look ahead for itemize blocks
            inCvEntry = true
            continue
        }

        if (line.startsWith('\\cvitem{')) {
            const match = line.match(/\\cvitem\{(.*?)\}\{(.*?)\}/)
            if (match) {
                html += `<div class="cv-item mb-2">
                    <span class="font-bold">${match[1]}:</span> ${match[2]}
                </div>`
            }
            continue
        }

        // Handle itemize environments
        if (line.startsWith('\\begin{itemize}')) {
            html += '<ul class="list-disc ml-6 my-2">'
            inItemize = true
            continue
        }

        if (line.startsWith('\\end{itemize}')) {
            html += '</ul>'
            inItemize = false
            continue
        }

        if (line.startsWith('\\item') && inItemize) {
            const itemContent = line.substring('\\item'.length).trim()
            html += `<li class="my-1">${itemContent}</li>`
            continue
        }

        // Handle makecvtitle and other special commands
        if (line.startsWith('\\makecvtitle')) {
            // Extract name and title from preamble
            const nameMatch = code.match(/\\name\{(.*?)\}\{(.*?)\}/)
            const titleMatch = code.match(/\\title\{(.*?)\}/)

            if (nameMatch) {
                html += `<div class="cv-title text-center mb-6">
                    <h1 class="text-2xl font-bold">${nameMatch[1]} ${nameMatch[2]}</h1>`

                if (titleMatch) {
                    html += `<div class="text-lg">${titleMatch[1]}</div>`
                }

                html += '</div>'
            }
            continue
        }

        // Regular content (not handled by specific rules)
        if (!inItemize && !inSection && !inCvEntry) {
            html += `<p class="my-2">${line}</p>`
        }
    }

    html += '</div>'
    return html
}

// Helper function to parse cventry command
const parseCvEntry = (line) => {
    const result = {
        date: '',
        title: '',
        organization: '',
        location: '',
        grade: '',
        description: ''
    }

    // Extract parameters from \cventry{date}{title}{organization}{location}{grade}{description}
    let content = line.substring('\\cventry{'.length)
    let params = []
    let currentParam = ''
    let braceCount = 0

    // Parse parameters handling nested braces
    for (let i = 0; i < content.length; i++) {
        const char = content[i]
        if (char === '{') {
            braceCount++
            if (braceCount > 1) currentParam += char
        } else if (char === '}') {
            braceCount--
            if (braceCount === 0) {
                params.push(currentParam)
                currentParam = ''
            } else {
                currentParam += char
            }
        } else {
            currentParam += char
        }
    }

    // Assign parsed parameters
    if (params.length >= 1) result.date = params[0]
    if (params.length >= 2) result.title = params[1]
    if (params.length >= 3) result.organization = params[2]
    if (params.length >= 4) result.location = params[3]
    if (params.length >= 5) result.grade = params[4]
    if (params.length >= 6) result.description = params[5]

    return result
}

// Helper function to load scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}

const exportPdf = () => {
    if (!renderedContent.value) {
        error.value = 'Please compile first before exporting'
        return
    }

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
      <head>
        <title>LaTeX PDF Export</title>
        <style>
          body { 
            font-family: serif; 
            margin: 1cm; 
            line-height: 1.6;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${renderedContent.value}
      </body>
      </html>
    `)
    printWindow.document.close()
    setTimeout(() => printWindow.print(), 250)
}

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
}

const changeTemplate = () => {
    latexCode.value = templates[selectedTemplate.value]
}
</script>

<style>
.latex-content {
    font-family: "Latin Modern Roman", serif;
    line-height: 1.6;
}
</style>