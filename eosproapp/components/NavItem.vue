<template>
    <NuxtLink :to="to" :target="external ? '_blank' : undefined" :rel="external ? 'noopener noreferrer' : undefined"
        class="flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors group relative"
        :class="{
            'text-emerald-500': active,
            'justify-center p-2': !expanded,
            'px-3 py-1': expanded
        }">
        <Icon :name="icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="expanded" class="ml-3 text-sm">{{ $slots.default?.()?.[0]?.children || '' }}</span>
        <span v-if="expanded && badge"
            class="ml-auto bg-gray-700 text-xs font-medium px-1.5 py-0.5 rounded-full">{{ badge }}</span>
        <Icon v-if="expanded && external" name="lucide:external-link" class="ml-auto w-3.5 h-3.5 text-gray-500" />
        
        <!-- Badge for collapsed state -->
        <span v-if="!expanded && badge"
            class="absolute -top-1 -right-1 bg-gray-700 text-xs font-medium px-1.5 py-0.5 rounded-full">{{ badge }}</span>
    </NuxtLink>
</template>

<script setup>
defineProps({
    to: {
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
    active: {
        type: Boolean,
        default: false
    },
    badge: {
        type: [Number, String],
        default: null
    },
    external: {
        type: Boolean,
        default: false
    }
});
</script>

