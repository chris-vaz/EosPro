<template>
    <NuxtLink :to="to"
        class="flex items-center pl-11 pr-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors text-sm"
        :class="{ 'text-white': active }">
        <span v-if="expanded">{{ $slots.default?.()?.[0]?.children || '' }}</span>
    </NuxtLink>
</template>

<script setup>
defineProps({
    to: {
        type: String,
        required: true
    },
    expanded: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: false
    }
});
</script>