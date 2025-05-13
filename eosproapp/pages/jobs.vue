<template>
    <div class="min-h-screen bg-white px-4 py-10 md:px-10">
        <!-- Filters -->
        <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input v-model="searchQuery" type="text" placeholder="Search jobs..."
                class="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

            <select v-model="selectedCategory"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm md:w-60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">All Categories</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
            </select>
        </div>

        <!-- Job Cards -->
        <div v-if="filteredJobs.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="job in filteredJobs" :key="job.id"
                class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                <h2 class="text-lg font-semibold text-gray-800">{{ job.title }}</h2>
                <p class="mt-1 text-sm text-gray-600">{{ job.company }}</p>
                <p class="mt-2 text-sm text-gray-500 truncate">{{ job.description }}</p>
                <div class="mt-4 flex justify-between text-sm text-gray-400">
                    <span>{{ job.location }}</span>
                    <span>{{ job.type }}</span>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="mt-20 text-center text-gray-500">
            <p>No jobs found. Try adjusting your filters or search terms.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const selectedCategory = ref('')

// Simulated job data
const jobs = ref([
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'OpenAI',
        description: 'Work on ChatGPT frontend with Vue 3 and Nuxt.',
        location: 'Remote',
        type: 'Full-Time',
        category: 'engineering',
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Figma',
        description: 'Design intuitive interfaces for millions of users.',
        location: 'Remote',
        type: 'Contract',
        category: 'design',
    },
    {
        id: 3,
        title: 'Marketing Manager',
        company: 'Notion',
        description: 'Drive growth with creative marketing campaigns.',
        location: 'San Francisco, CA',
        type: 'Full-Time',
        category: 'marketing',
    },
])

const filteredJobs = computed(() =>
    jobs.value.filter(
        (job) =>
            (!selectedCategory.value || job.category === selectedCategory.value) &&
            job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)
</script>

<style scoped>
/* Optional: Custom primary color if not set globally */
:root {
    --tw-color-primary: #6366f1;
}
</style>