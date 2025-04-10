<template>
    <div class="home-container">
        <!-- Greeting Heading -->
        <h1 class="text-3xl font-bold">
            <template v-if="skeletonLoading">
                <div class="skeleton skeleton-text w-64 h-8" />
            </template>
            <template v-else>
                {{ greeting }}, System Administrator! {{ emoji }}
            </template>
        </h1>

        <!-- Overview Text -->
        <p class="mt-2">
            <template v-if="skeletonLoading">
                <div class="skeleton skeleton-text w-80 h-5" />
            </template>
            <template v-else>
                {{ randomOverviewText }}
            </template>
        </p>

        <!-- KPI Grid or Skeleton -->
        <KpiGrid v-if="!skeletonLoading" />
        <div v-else class="mt-4">
            <div class="skeleton w-full h-40 rounded-lg" />
        </div>

        <!-- Saved Jobs or Skeleton -->
        <div class="mt-10">
            <SavedJobs v-if="!skeletonLoading" />
            <div v-else class="flex flex-col gap-4">
                <div class="skeleton w-48 h-6" /> <!-- Heading Skeleton -->
                <div class="flex gap-4">
                    <div class="skeleton h-32 flex-1 rounded-lg" />
                    <div class="skeleton h-32 flex-1 rounded-lg" />
                    <div class="skeleton h-32 flex-1 rounded-lg" />
                    <div class="skeleton h-32 w-24 rounded-lg" />
                </div>
            </div>
        </div>

        <!-- Quick Links or Skeleton -->
        <div>
            <QuickLink v-if="!skeletonLoading" />
            <div v-else class="flex flex-col gap-4">
                <div class="skeleton w-48 h-6" /> <!-- Heading Skeleton -->
                <div class="flex gap-4">
                    <div class="skeleton h-32 flex-1 rounded-lg" />
                    <div class="skeleton h-32 flex-1 rounded-lg" />
                    <div class="skeleton h-32 flex-1 rounded-lg" />
                    <div class="skeleton h-32 w-24 rounded-lg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            greeting: '',
            emoji: '',
            overviewTexts: [
                "Here's your job search overview at a glance!",
                "Your job search insights at a glance.",
                "Quick insights into your job hunt.",
                "A snapshot of your job search progress.",
                "Tracking your job search, made simple.",
                "Stay on top of your job hunt with ease.",
                "Your job search progress at a glance.",
                "A quick overview of your job applications.",
                "See how far you've come in your job search.",
                "Your job hunt, all in one place.",
                "Monitor your job search journey effortlessly.",
                "Stay organized and land your dream job.",
                "Your job search dashboard, simplified.",
                "Keeping track of your job hunt, stress-free."
            ],
            randomOverviewText: '',
            skeletonLoading: true,
        };
    },
    mounted() {
        this.updateGreeting();
        this.randomOverviewText = this.getRandomOverviewText();

        this.$nextTick(() => {
            this.skeletonLoading = false;
        });
    },
    methods: {
        updateGreeting() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                this.greeting = 'Good morning';
                this.emoji = '🌞';
            } else if (hour >= 12 && hour < 18) {
                this.greeting = 'Good afternoon';
                this.emoji = '🌤️';
            } else {
                this.greeting = 'Good evening';
                this.emoji = '🌙';
            }
        },
        getRandomOverviewText() {
            return this.overviewTexts[Math.floor(Math.random() * this.overviewTexts.length)];
        }
    },
    definePageMeta: {
        name: "Home"
    }
};
</script>

<style scoped>
.home-container {
    padding: 20px;
}
</style>