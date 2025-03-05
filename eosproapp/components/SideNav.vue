<template>
    <aside class="bg-gray-900 h-screen flex flex-col transition-all duration-200 ease-out relative"
        :class="{ 'w-64': isExpanded, 'w-16': !isExpanded }">
        <!-- Logo -->
        <div class="p-3 flex items-center justify-between border-b border-gray-800">
            <div class="flex items-center">
                <div class="text-emerald-500 mr-2">
                    <Icon name="logos:nuxt-icon" class="w-6 h-6" />
                </div>
                <span v-if="isExpanded"
                    class="text-white font-medium text-lg transition-opacity duration-200">Nuxt</span>
            </div>
            <button v-if="isExpanded" @click="toggleSidebar" class="text-gray-400 hover:text-white">
                <Icon name="lucide:chevrons-left" class="w-5 h-5" />
            </button>
            <button v-else @click="toggleSidebar" class="text-gray-400 hover:text-white">
                <Icon name="lucide:chevrons-right" class="w-5 h-5" />
            </button>
        </div>

        <!-- Search Bar -->
        <div class="px-3 py-2">
            <div class="relative flex items-center">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="lucide:search" class="w-4 h-4 text-gray-400" />
                </div>
                <input type="text" placeholder="Search..."
                    class="w-full bg-gray-800 text-gray-200 text-sm rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    :class="{ 'pr-12': isExpanded }" />
                <div v-if="isExpanded" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-xs text-gray-500 bg-gray-700 px-1.5 py-0.5 rounded">K</span>
                </div>
            </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 mt-2 overflow-y-auto">
            <NavItem to="/" icon="lucide:home" :expanded="isExpanded" active>
                Home
            </NavItem>

            <NavItem to="/inbox" icon="lucide:inbox" :expanded="isExpanded" :badge="4">
                Inbox
            </NavItem>

            <NavItem to="/customers" icon="lucide:users" :expanded="isExpanded">
                Customers
            </NavItem>

            <NavGroup label="Settings" icon="lucide:settings" :expanded="isExpanded">
                <NavSubItem to="/settings/general" :expanded="isExpanded">General</NavSubItem>
                <NavSubItem to="/settings/members" :expanded="isExpanded">Members</NavSubItem>
                <NavSubItem to="/settings/notifications" :expanded="isExpanded">Notifications</NavSubItem>
                <NavSubItem to="/settings/security" :expanded="isExpanded">Security</NavSubItem>
            </NavGroup>
        </nav>

        <!-- Footer Links -->
        <div class="mt-auto border-t border-gray-800 pt-2">
            <NavItem to="/feedback" icon="lucide:message-circle" :expanded="isExpanded" external>
                Feedback
            </NavItem>

            <NavItem to="/help" icon="lucide:help-circle" :expanded="isExpanded" external>
                Help & Support
            </NavItem>

            <!-- User Profile -->
            <div class="p-3 mt-2 border-t border-gray-800 flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=3" alt="User avatar" class="w-full h-full object-cover" />
                </div>
                <div v-if="isExpanded" class="ml-3 overflow-hidden">
                    <p class="text-sm font-medium text-white truncate">Benjamin Canac</p>
                </div>
                <button v-if="isExpanded" class="ml-auto text-gray-400 hover:text-white">
                    <Icon name="lucide:chevron-down" class="w-4 h-4" />
                </button>
            </div>
        </div>

        <!-- Add a resize handle to the right edge of the sidebar -->
        <div v-if="isExpanded"
            class="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-800 hover:bg-emerald-500"
            @mousedown="startResize"></div>
    </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Sidebar state
const isExpanded = ref(true);
const sidebarWidth = ref(256); // Default width (64px * 4)

const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;
};

// Resize functionality
const startResize = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
};

const resize = (e) => {
    // Set minimum width to 256px (16rem) and maximum to 384px (24rem)
    const newWidth = Math.max(256, Math.min(384, e.clientX));
    sidebarWidth.value = newWidth;
    document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
};

const stopResize = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
};

// Clean up event listeners
onUnmounted(() => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
});

// Set initial width
onMounted(() => {
    document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth.value}px`);
});
</script>

<style scoped>
aside {
    width: var(--sidebar-width, 256px);
    transition: width 0.2s ease-out;
}

aside.w-16 {
    width: 64px !important;
}
</style>