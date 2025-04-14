<template>
    <div class="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        <!-- Toolbar -->
        <Toolbar @export-pdf="exportPdf" @toggle-theme="toggleTheme" @compile="compileLaTeX" @import-file="importFile"
            :isDarkMode="isDarkMode" :selectedTemplate="selectedTemplate" @template-changed="changeTemplate" />

        <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
            <!-- Left Panel: LaTeX Editor -->
            <div class="w-full md:w-1/2 p-4 overflow-hidden flex flex-col">
                <h2 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">LaTeX Editor</h2>
                <LatexEditor v-model="latexCode" :isDarkMode="isDarkMode" @update:modelValue="handleCodeChange"
                    class="flex-grow rounded shadow-md" />
            </div>

            <!-- Right Panel: PDF Preview -->
            <div class="w-full md:w-1/2 p-4 overflow-hidden flex flex-col">
                <h2 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">Preview</h2>
                <PdfPreview ref="pdfPreview" :latexCode="latexCode" :loading="compiling"
                    class="flex-grow rounded shadow-md bg-white dark:bg-gray-800" />
            </div>
        </div>
    </div>
</template>

<script>
import LatexEditor from '@/components/LatexEditor.vue';
import PdfPreview from '@/components/PdfPreview.vue';
import Toolbar from '@/components/Toolbar.vue';
import { templates } from '../utils/template';

export default {
    name: 'edit',
    components: {
        LatexEditor,
        PdfPreview,
        Toolbar
    },
    data() {
        return {
            latexCode: '',
            compiling: false,
            isDarkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
            selectedTemplate: 'moderncv',
            debouncedCompileTimeout: null
        };
    },
    mounted() {
        // Load saved content from localStorage if available
        this.loadSavedContent();

        // Set the default template if no content was loaded
        if (!this.latexCode) {
            this.loadTemplate(this.selectedTemplate);
        }

        // Apply dark mode to document if set
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        }

        // Add media query listener for dark mode
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.updateThemeFromSystem);
        }
    },
    beforeUnmount() {
        // Remove event listener
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.updateThemeFromSystem);
        }
    },
    methods: {
        handleCodeChange(newCode) {
            this.latexCode = newCode;
            this.saveContent();

            // Debounce the compilation to avoid excessive processing
            clearTimeout(this.debouncedCompileTimeout);
            this.debouncedCompileTimeout = setTimeout(() => {
                this.compileLaTeX();
            }, 1000);
        },

        loadTemplate(templateName) {
            if (templates[templateName]) {
                this.latexCode = templates[templateName];
                this.saveContent();
                this.compileLaTeX();
            }
        },

        changeTemplate(templateName) {
            if (confirm('Changing templates will replace your current content. Continue?')) {
                this.selectedTemplate = templateName;
                this.loadTemplate(templateName);
            }
        },

        compileLaTeX() {
            this.compiling = true;
            // The actual compilation will be handled by the PdfPreview component
            setTimeout(() => {
                this.compiling = false;
            }, 100);
        },

        exportPdf() {
            if (this.$refs.pdfPreview) {
                this.$refs.pdfPreview.exportPdf();
            } else {
                console.error('PDF preview component reference not found');
            }
        },

        importFile(fileContent) {
            this.latexCode = fileContent;
            this.saveContent();
            this.compileLaTeX();
        },

        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;

            // Apply dark mode to document
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },

        updateThemeFromSystem(e) {
            this.isDarkMode = e.matches;
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },

        saveContent() {
            localStorage.setItem('latex-resume-content', this.latexCode);
            localStorage.setItem('latex-resume-template', this.selectedTemplate);
        },

        loadSavedContent() {
            const savedContent = localStorage.getItem('latex-resume-content');
            const savedTemplate = localStorage.getItem('latex-resume-template');

            if (savedContent) {
                this.latexCode = savedContent;
            }

            if (savedTemplate) {
                this.selectedTemplate = savedTemplate;
            }
        }
    }
};
</script>

<style>

/* Ensure the app takes full height */
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

/* Dark mode support */
.dark {
    color-scheme: dark;
}
</style>