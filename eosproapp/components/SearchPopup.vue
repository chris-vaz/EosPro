<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-[#1C1C1F] rounded-lg shadow-lg w-full max-w-md p-6">
            <!-- Close Button -->
            <button @click="closePopup" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                <Icon name="lucide:x" class="w-6 h-6" />
            </button>

            <!-- Search Input -->
            <div class="relative flex items-center">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="lucide:search" class="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Search..."
                    class="w-full bg-[#222832] text-gray-200 text-base rounded-md py-1 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    :class="{ 'pr-12': true }" v-model="searchQuery" @keyup.enter="handleSearch" />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-xs text-gray-500 bg-gray-700 px-1.5 py-0.5 rounded">K</span>
                </div>
            </div>

            <!-- Optional: Search Results (Placeholder) -->
            <div v-if="searchQuery" class="mt-4 text-gray-300">
                <p class="text-sm">Search results for "{{ searchQuery }}" will appear here...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// Emits for communication with parent
const emit = defineEmits(['update:isOpen', 'search']);

// State
const isOpen = ref(true); // Controlled by parent, but default to true for demo
const searchQuery = ref('');

// Close the popup
const closePopup = () => {
    emit('update:isOpen', false);
};

// Handle search action (e.g., on Enter key)
const handleSearch = () => {
    if (searchQuery.value) {
        emit('search', searchQuery.value);
        closePopup(); // Optional: Close after search
    }
};

// Watch for isOpen prop changes (if used as a prop)
defineProps({
    isOpen: Boolean,
});
</script>

<style scoped>
/* Ensure smooth transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>