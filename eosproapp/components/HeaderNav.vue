<template>
    <header class="bg-white border-b border-gray-300 px-9 py-4 flex items-center justify-between">
        <!-- Sidebar Toggle Button -->
        <div class="flex">
            <!-- <button @click="toggleSidebar" class="text-gray-500 hover:text-gray-700 pr-3">
                <Icon name="lucide:menu" class="w-6 h-6" />
            </button> -->
            <h1 class="text-lg font-semibold capitalize">{{ pageTitle }}</h1>
        </div>
        <div>Button here</div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            route: this.$route,
        };
    },
    computed: {
        pageTitle() {
            return this.route.name === 'index' ? 'Home' : this.route.name || 'EOSPro';
        }
    },
    methods: {
    }
};
</script>
