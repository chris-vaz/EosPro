<template>
    <section class="saved-jobs-section mt-6">
        <h2 class="text-2xl font-semibold mb-4">Saved Jobs — Just a Step Away</h2>

        <div v-if="savedJobs.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(job, index) in displayedJobs" :key="index"
                class="bg-white p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
                <h3 class="text-lg font-medium">{{ job.title }}</h3>
                <p class="text-sm text-gray-500">{{ job.company }}</p>
                <p class="text-sm text-gray-400">{{ job.location }}</p>
            </div>

            <div
                class="bg-white p-4 border border-gray-200 rounded-md shadow-sm hover:transition cursor-pointer flex items-center justify-center hover:bg-[#E3F1FF]">
                <span class="text-blue-600 font-semibold">View All Saved Jobs →</span>
            </div>
        </div>

        <div v-else class="border border-gray-300 p-6 text-center rounded-md bg-gray-50">
            <p class="text-black text-lg">You haven’t saved any jobs yet.</p>
            <p class="text-gray-400 mt-2">Tap the ✨ bookmark icon on listings you love — we’ll keep them safe for you
                here.</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'SavedJobs',
    data() {
        return {
            savedJobs: []
        };
    },
    computed: {
        displayedJobs() {
            return this.savedJobs.slice(0, 3);
        }
    }
};
</script>