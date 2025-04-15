<template>
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
                <div class="flex-grow rounded shadow-md bg-white dark:bg-gray-800 p-4 overflow-auto"
                    ref="previewContainer">
                    <div v-if="compiling" class="flex items-center justify-center h-full">
                        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                    <div v-else-if="error" class="text-red-500 p-4">
                        <h3 class="text-lg font-bold">Error:</h3>
                        <pre class="bg-red-100 dark:bg-red-900 p-3 rounded overflow-auto">{{ error }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'

// State management
const latexCode = ref('')
const isDarkMode = ref(false)
const compiling = ref(false)
const selectedTemplate = ref('blank')
const error = ref(null)
const previewContainer = ref(null)

// Templates
const templates = {
    blank: '\\documentclass{article}\n\\begin{document}\nYour content here\n\\end{document}',
    article: `\\documentclass{article}
  \\title{Sample Article}
  \\author{Your Name}
  \\date{\\today}
  
  \\begin{document}
  \\maketitle
  \\section{Introduction}
  This is a sample article.
  
  \\section{Methodology}
  Explain your methodology here.
  
  \\section{Results}
  Present your results here.
  
  \\section{Conclusion}
  Conclude your article here.
  
  \\end{document}`,
    report: `\\documentclass{report}
  \\title{Comprehensive Report}
  \\author{Your Name}
  \\date{\\today}
  
  \\begin{document}
  \\maketitle
  \\chapter{Introduction}
  This is the introduction to your report.
  
  \\chapter{Literature Review}
  Review of relevant literature.
  
  \\end{document}`,
    letter: `\\documentclass{letter}
  \\address{Your Address\\\\City, State ZIP}
  \\signature{Your Name}
  
  \\begin{document}
  \\begin{letter}{Recipient Name\\\\Recipient Address\\\\City, State ZIP}
  \\opening{Dear Sir or Madam,}
  
  This is the content of your letter.
  
  \\closing{Sincerely,}
  
  \\end{letter}
  \\end{document}`
}

// LaTeX.js and related variables
let latex = null

// Initialize client-side only imports
onBeforeMount(() => {
    if (process.client) {
        // Import LaTeX.js only on client side
        import('latex.js').then(module => {
            const LaTeX = module.default || module
            latex = new LaTeX.Generator({ throwOnError: false })
        }).catch(err => {
            console.error('Failed to load LaTeX.js:', err)
            error.value = 'Failed to load LaTeX renderer'
        })
    }
})

// Initialize with default template
onMounted(() => {
    latexCode.value = templates.blank

    isDarkMode.value = false
})

// Methods
const handleCodeChange = () => {
    // You could implement auto-compilation here if desired
}

const compileLaTeX = async () => {
    if (!latex) {
        error.value = 'LaTeX renderer not initialized'
        return
    }

    compiling.value = true
    error.value = null

    try {
        // Clear the container
        if (previewContainer.value) {
            previewContainer.value.innerHTML = ''
        }

        // Process the LaTeX
        const fragment = await latex.createFragment(latexCode.value)

        // Render the output
        if (previewContainer.value) {
            previewContainer.value.appendChild(fragment)
        }
    } catch (err) {
        console.error('LaTeX compilation error:', err)
        error.value = err.message || 'Failed to compile LaTeX code'
    } finally {
        compiling.value = false
    }
}

const exportPdf = () => {
    // Simplified PDF export using browser print
    if (previewContainer.value) {
        const printWindow = window.open('', '_blank')
        printWindow.document.write('<html><head><title>LaTeX PDF Export</title>')
        printWindow.document.write('<style>body { font-family: serif; margin: 1cm; }</style>')
        printWindow.document.write('</head><body>')
        printWindow.document.body.appendChild(previewContainer.value.cloneNode(true))
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        setTimeout(() => printWindow.print(), 250)
    }
}

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
}

const changeTemplate = () => {
    latexCode.value = templates[selectedTemplate.value]
}
</script>