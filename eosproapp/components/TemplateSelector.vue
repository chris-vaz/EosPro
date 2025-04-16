<template>
    <div class="relative inline-block text-left">
        <div>
            <button @click="toggleDropdown" type="button"
                class="flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none">
                Template: {{ displayName }}
                <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <div v-if="isOpen"
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div class="py-1" role="menu" aria-orientation="vertical">
                <button v-for="template in templates" :key="template.id" @click="selectTemplate(template.id)"
                    class="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem">
                    {{ template.name }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAttrs, defineProps, defineEmits } from 'vue';

const props = defineProps({
    selectedTemplate: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['template-changed']);

const isOpen = ref(false);

const templates = [
    { id: 'moderncv', name: 'Modern CV' },
    { id: 'awesome-cv', name: 'Awesome CV' },
    { id: 'deedy-resume', name: 'Deedy Resume' },
    { id: 'basic', name: 'Basic Resume' }
];

const displayName = computed(() => {
    const template = templates.find(t => t.id === props.selectedTemplate);
    return template ? template.name : 'Select Template';
});

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function selectTemplate(templateId) {
    emit('template-changed', templateId);
    isOpen.value = false;
}

function closeDropdown(event) {
    if (!event.target.closest('.inline-block')) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>