<template>
    <div class="home-container">
        <h1 class="text-3xl font-bold">{{ greeting }}, System Administrator! {{ emoji }}</h1>
        <h1>Welcome to EOSPRO</h1>
        <p>Find and apply for the best jobs effortlessly.</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            greeting: '', // Initialize greeting as an empty string
            emoji: '',    // Initialize emoji as an empty string
        };
    },
    mounted() {
        this.updateGreeting(); // Call the method to set the greeting when the component is mounted
    },
    methods: {
        updateGreeting() {
            const hour = new Date().getHours(); // Get the current hour (0-23)
            if (hour >= 5 && hour < 12) {
                this.greeting = 'Good morning';
                this.emoji = '🌞'; // Sun emoji for morning
            } else if (hour >= 12 && hour < 18) {
                this.greeting = 'Good afternoon';
                this.emoji = '🌤️'; // Sun behind cloud emoji for afternoon
            } else {
                this.greeting = 'Good evening';
                this.emoji = '🌙'; // Moon emoji for evening
            }
        },
    },
    definePageMeta: {
        name: "Home", // This sets the route name to "Home"
    }
};
</script>

<style scoped>
.home-container {
    padding: 20px;
}
</style>