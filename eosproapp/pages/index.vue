<template>
    <div class="home-container">
        <h1 class="text-3xl font-bold">{{ greeting }}, System Administrator! {{ emoji }}</h1>
        <p class="mt-2">{{ randomOverviewText }}</p>
        <!-- KPI Grid Here -->
        <KpiGrid />
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
            randomOverviewText: ''
        };
    },
    mounted() {
        this.updateGreeting();
        this.randomOverviewText = this.getRandomOverviewText();
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
        name: "Home",
    }
};
</script>

<style scoped>
.home-container {
    padding: 20px;
}
</style>