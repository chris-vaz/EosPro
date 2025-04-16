<template>
    <div class="w-full h-full flex flex-col">
        <!-- Loading indicator -->
        <div v-if="loading || localLoading" class="flex-grow flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <!-- Error message -->
        <div v-else-if="error"
            class="flex-grow flex flex-col items-center justify-center text-red-500 p-4 overflow-auto">
            <h3 class="text-lg font-bold mb-2">Compilation Error</h3>
            <pre class="bg-red-100 dark:bg-red-900 p-3 rounded w-full overflow-auto">{{ error }}</pre>
        </div>

        <!-- PDF preview -->
        <div v-else ref="pdfContainer" class="flex-grow overflow-auto bg-white"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Generator } from 'latex.js'

const props = defineProps({
    latexCode: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const pdfContainer = ref(null)
const localLoading = ref(false)
const error = ref(null)
let generator = null
let compiledOutput = null

// Initialize LaTeX.js
onMounted(() => {
    // Create the generator
    try {
        generator = new Generator({
            throwOnError: false
        })
    } catch (err) {
        console.error('Error initializing LaTeX.js:', err)
        error.value = err.message || 'Failed to initialize LaTeX renderer'
    }
})

// Compile LaTeX code
const compile = async () => {
    if (!generator) return

    error.value = null
    localLoading.value = true

    try {
        // Clear the container
        if (pdfContainer.value) {
            pdfContainer.value.innerHTML = ''
        }

        // Process the LaTeX
        compiledOutput = await generator.createFragment(props.latexCode)

        // Render the output
        if (pdfContainer.value) {
            pdfContainer.value.appendChild(compiledOutput)
        }
    } catch (err) {
        console.error('LaTeX compilation error:', err)
        error.value = err.message || 'Failed to compile LaTeX code'
    } finally {
        localLoading.value = false
    }
}

// Download as PDF
const downloadPdf = async () => {
    if (!compiledOutput) {
        await compile()
    }

    try {
        // This is a simplified implementation
        // In a real-world scenario, you might want to use a library like jsPDF or html2pdf
        const printWindow = window.open('', '_blank')
        printWindow.document.write('<html><head><title>LaTeX PDF Export</title>')

        // Add styles
        printWindow.document.write(`
        <style>
          body { font-family: 'Latin Modern Roman', serif; margin: 1cm; }
          @media print { body { margin: 0; } }
        </style>
      `)

        printWindow.document.write('</head><body>')

        // Clone the compiled output
        const content = compiledOutput.cloneNode(true)
        printWindow.document.body.appendChild(content)

        printWindow.document.write('</body></html>')
        printWindow.document.close()

        // Wait for resources to load
        setTimeout(() => {
            printWindow.print()
        }, 250)
    } catch (err) {
        console.error('Error exporting PDF:', err)
        alert('Failed to export PDF. Please try again.')
    }
}

// Watch for latexCode changes
watch(() => props.latexCode, async () => {
    // Implement auto-compilation if desired
    // await compile()
})

// Expose functions to parent
defineExpose({
    compile,
    downloadPdf
})
</script>