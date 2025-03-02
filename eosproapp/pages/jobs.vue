<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <!-- Search Bar -->
        <div class="mb-6 flex items-center space-x-2">
            <input v-model="searchQuery" type="text" placeholder="Search jobs..."
                class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button @click="fetchJobs" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Search
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center text-gray-500">Loading jobs...</div>

        <!-- Job Listings -->
        <div v-else class="space-y-4">
            <div v-for="job in filteredJobs" :key="job.id"
                class="p-4 border rounded-lg flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-bold">{{ job.title }}</h3>
                    <p class="text-gray-600">{{ job.company }} - {{ job.location }}</p>
                </div>
                <a :href="job.link" target="_blank"
                    class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    Apply
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Mock jobs data (Replace with real API call)
const jobs = ref([
    {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        location: "Remote",
        link: "https://www.google.com/careers",
    },
    {
        id: 2,
        title: "Backend Engineer",
        company: "Amazon",
        location: "New York",
        link: "https://www.amazon.jobs",
    },
]);

const loading = ref(false);
const searchQuery = ref("");

// Filter jobs based on search input
const filteredJobs = computed(() =>
    jobs.value.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

// Simulated fetch function (replace with real SerpAPI call)
const fetchJobs = async () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 1000);
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>