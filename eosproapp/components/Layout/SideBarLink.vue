<template>
    <NuxtLink :to="to" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition"
        active-class="bg-gray-300 font-semibold">
        <span class="mr-3">
            <Icon :name="`lucide:${icon}`" class="w-5 h-5" />
        </span>
        <span v-if="!collapsed">
            <slot />
        </span>
    </NuxtLink>
</template>

<script setup>
defineProps({
    to: String,
    icon: String,
    collapsed: Boolean,
});
</script>