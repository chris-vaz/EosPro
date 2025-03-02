<template>
    <aside class="bg-white shadow-md h-screen flex flex-col transition-all duration-200 ease-out"
        :class="{ 'w-64': isHovered || !isCollapsed, 'w-20': !isHovered && isCollapsed }" @mouseenter="isHovered = true"
        @mouseleave="isHovered = false">

        <!-- Topbar Inside Sidebar -->
        <div class="p-4 text-white font-semibold flex items-center justify-between bg-blue-500 transition-all">
            <span v-if="isHovered || !isCollapsed" class="text-lg transition-opacity duration-200">EOSPRO</span>
            <button @click="toggleSidebar">
                <Icon :name="isCollapsed ? 'lucide:chevron-right' : 'lucide:chevron-left'" class="w-6 h-6" />
            </button>
        </div>

        <!-- User Profile (Hidden in Collapsed Mode) -->
        <div v-if="isHovered || !isCollapsed" class="p-4 text-center border-b transition-opacity duration-200">
            <img :src="user.avatar" alt="Avatar" class="w-16 h-16 rounded-full mx-auto border-2 border-blue-500" />
            <h3 class="mt-2 font-medium">{{ user.name }}</h3>
            <p class="text-sm text-gray-600">{{ user.email }}</p>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 mt-4">
            <SidebarLink to="/profile" icon="user" :collapsed="!isHovered && isCollapsed">Profile</SidebarLink>
            <SidebarLink to="/jobs" icon="briefcase" :collapsed="!isHovered && isCollapsed">Jobs</SidebarLink>
            <SidebarLink to="/applications" icon="file-text" :collapsed="!isHovered && isCollapsed">Applications
            </SidebarLink>
            <SidebarLink to="/settings" icon="settings" :collapsed="!isHovered && isCollapsed">Settings</SidebarLink>
        </nav>

        <!-- Logout Button (Always Visible) -->
        <div class="p-4">
            <button class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Logout
            </button>
        </div>
    </aside>
</template>

<script setup>
import SidebarLink from "@/components/Layout/SidebarLink.vue";
import { ref } from "vue";

const user = ref({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://i.pravatar.cc/100?img=3",
});

// Sidebar states
const isCollapsed = ref(true); // Default: collapsed
const isHovered = ref(false); // Tracks hover state

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed;
};
</script>

<style scoped>
/* Smoother transitions for high refresh rate screens */
aside {
    transition: width 0.2s ease-out;
}
</style>
