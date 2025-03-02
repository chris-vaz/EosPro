<template>
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <!-- Profile Header -->
        <div class="flex items-center space-x-4">
            <img :src="user.avatar" alt="User Avatar" class="w-20 h-20 rounded-full border-2 border-blue-500" />
            <div>
                <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
                <p class="text-gray-600">{{ user.email }}</p>
            </div>
        </div>

        <!-- Job Stats -->
        <div class="mt-6 grid grid-cols-3 gap-4 text-center">
            <div class="p-4 bg-blue-100 rounded-lg">
                <h3 class="text-xl font-bold">{{ stats.applied }}</h3>
                <p class="text-gray-600">Jobs Applied</p>
            </div>
            <div class="p-4 bg-green-100 rounded-lg">
                <h3 class="text-xl font-bold">{{ stats.interviews }}</h3>
                <p class="text-gray-600">Interviews</p>
            </div>
            <div class="p-4 bg-red-100 rounded-lg">
                <h3 class="text-xl font-bold">{{ stats.rejections }}</h3>
                <p class="text-gray-600">Rejections</p>
            </div>
        </div>

        <!-- Edit Profile Button -->
        <div class="mt-6 text-center">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                @click="editProfile">
                Edit Profile
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// Mock user data (Replace with real data from Firebase)
const user = ref({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
});

// Job application stats
const stats = ref({
    applied: 10,
    interviews: 3,
    rejections: 5,
});

// Future function for profile editing
const editProfile = () => {
    alert("Profile editing coming soon!");
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>