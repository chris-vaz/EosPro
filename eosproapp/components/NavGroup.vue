<template>
    <div>
        <button @click="toggleExpanded"
            class="w-full flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors relative"
            :class="{
                'bg-gray-800': isOpen,
                'justify-center p-2': !expanded,
                'px-3 py-2': expanded
            }">
            <Icon :name="icon" class="w-5 h-5 flex-shrink-0" />
            <span v-if="expanded" class="ml-3 text-sm">{{ label }}</span>
            <Icon v-if="expanded" :name="isOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="ml-auto w-4 h-4 transition-transform" />
        </button>

        <div v-show="isOpen && expanded" class="mt-1 space-y-1">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  expanded: {
    type: Boolean,
    default: true
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
});

const isOpen = ref(props.defaultOpen);

const toggleExpanded = () => {
  isOpen.value = !isOpen.value;
};
</script>

