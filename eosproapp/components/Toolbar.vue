<template>
    <div class="bg-white shadow-md p-3 flex flex-wrap items-center justify-between">
        <!-- Title -->
        <div class="flex items-center space-x-2">
            <h1 class="ml-2 text-2xl font-bold text-gray-800">Resume Builder</h1>
        </div>

        <!-- Controls -->
        <div class="flex flex-wrap items-center space-x-2">
            <!-- Template Selection -->
            <div class="flex items-center">
                <label for="template" class="mr-2 text-gray-700 ">Template:</label>
                <select id="template" :value="selectedTemplate" @change="$emit('template-change', $event.target.value)"
                    class="px-2 py-1 border rounded text-gray-700  border-gray-300">
                    <option value="blank">Blank</option>
                    <option value="article">Article</option>
                    <option value="report">Report</option>
                    <option value="letter">Letter</option>
                </select>
            </div>

            <!-- Action Buttons -->
            <button @click="$emit('compile')" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Compile
            </button>

            <button @click="$emit('export')" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Export PDF
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    selectedTemplate: {
        type: String,
        required: true,
    },
    isDarkMode: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['template-change', 'compile', 'export', 'toggle-theme'])
</script>