<template>
    <aside class="bg-gray-900 h-screen flex flex-col transition-all duration-200 ease-out relative"
        :class="{ 'w-[--sidebar-width]': isExpanded, 'w-12': !isExpanded }">
        <!-- Logo -->
        <div class="flex items-center justify-between border-b border-gray-800"
            :class="{ 'p-3': isExpanded, 'p-2 justify-center': !isExpanded }">
            <div class="flex items-center" :class="{ 'justify-center w-full': !isExpanded }">
                <div class="text-emerald-500" :class="{ 'mr-2': isExpanded }">
                    <Icon name="logos:nuxt-icon" class="w-6 h-6" />
                </div>
                <span v-if="isExpanded"
                    class="text-white font-medium text-lg transition-opacity duration-200">EOSPro</span>
            </div>
            <!-- Temporarily Hiding the chevron left toggle sidebar -->
            <!-- <button v-if="isExpanded" @click="toggleSidebar" class="text-gray-400 hover:text-white">
                <Icon name="lucide:chevrons-left" class="w-5 h-5" />
            </button> -->
        </div>

        <!-- Search Bar -->
        <div v-if="isExpanded" class="px-3 py-2">
            <div class="relative flex items-center">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="lucide:search" class="w-4 h-4 text-gray-400" />
                </div>
                <input type="text" placeholder="Search..."
                    class="w-full bg-gray-800 text-gray-200 text-sm rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    :class="{ 'pr-12': isExpanded }" />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-xs text-gray-500 bg-gray-700 px-1.5 py-0.5 rounded">K</span>
                </div>
            </div>
        </div>
        <div v-else class="p-2">
            <button class="w-full flex justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
                <Icon name="lucide:search" class="w-5 h-5" />
            </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 mt-2 overflow-y-auto">
            <NuxtLink to="/"
                class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white group relative"
                :class="{ 'bg-gray-800 text-white': $route.path === '/', 'justify-center': !isExpanded }">
                <div class="flex items-center">
                    <Icon name="lucide:home" class="w-5 h-5 text-gray-400 group-hover:text-white"
                        :class="{ 'text-white': $route.path === '/' }" />
                    <span v-if="isExpanded" class="ml-3 text-sm leading-6">Home</span>
                </div>
            </NuxtLink>

            <NuxtLink to="/inbox"
                class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white group relative"
                :class="{ 'bg-gray-800 text-white': $route.path === '/inbox', 'justify-center': !isExpanded }">
                <div class="flex items-center">
                    <Icon name="lucide:inbox" class="w-5 h-5 text-gray-400 group-hover:text-white"
                        :class="{ 'text-white': $route.path === '/inbox' }" />
                    <span v-if="isExpanded" class="ml-3 text-sm leading-6">Inbox</span>
                </div>
                <div v-if="isExpanded"
                    class="ml-auto bg-emerald-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-5 text-center">
                    4
                </div>
                <!-- Show badge as dot when collapsed -->
                <div v-if="!isExpanded" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500"></div>
            </NuxtLink>

            <NuxtLink to="/customers"
                class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white group relative"
                :class="{ 'bg-gray-800 text-white': $route.path === '/customers', 'justify-center': !isExpanded }">
                <div class="flex items-center">
                    <Icon name="lucide:users" class="w-5 h-5 text-gray-400 group-hover:text-white"
                        :class="{ 'text-white': $route.path === '/customers' }" />
                    <span v-if="isExpanded" class="ml-3 text-sm leading-6">Customers</span>
                </div>
            </NuxtLink>

            <!-- Settings Group -->
            <div>
                <button @click="toggleSettingsGroup"
                    class="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white group"
                    :class="{ 'justify-center': !isExpanded, 'bg-gray-800': isSettingsOpen }">
                    <div class="flex items-center flex-1">
                        <Icon name="lucide:settings" class="w-5 h-5 text-gray-400 group-hover:text-white"
                            :class="{ 'text-white': isSettingsOpen }" />
                        <span v-if="isExpanded" class="ml-3 text-sm leading-6">Settings</span>
                    </div>
                    <div v-if="isExpanded" class="text-gray-400 transition-transform duration-200"
                        :class="{ 'rotate-180': isSettingsOpen }">
                        <Icon name="lucide:chevron-down" class="w-4 h-4" />
                    </div>
                </button>
                <div v-if="isSettingsOpen && isExpanded" class="mt-1 ml-4 space-y-1">
                    <NuxtLink v-for="(item, index) in settingsItems" :key="index" :to="item.to"
                        class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white text-sm leading-6">
                        {{ item.label }}
                    </NuxtLink>
                </div>
                <!-- Dots for collapsed state -->
                <div v-if="isSettingsOpen && !isExpanded" class="flex flex-col items-center gap-2 py-2">
                    <div v-for="(_, index) in settingsItems" :key="index" class="w-1.5 h-1.5 rounded-full bg-gray-500">
                    </div>
                </div>
            </div>
        </nav>

        <!-- Footer Links -->
        <div class="mt-auto border-t border-gray-800 pt-2 px-2">
            <NavItem to="/feedback" icon="lucide:message-circle" :expanded="isExpanded" external>
                Feedback
            </NavItem>

            <NavItem to="/help" icon="lucide:help-circle" :expanded="isExpanded" external>
                Help & Support
            </NavItem>

            <!-- User Profile -->
            <div class="p-2 mt-2 border-t border-gray-800 relative">
                <button @click="isUserMenuOpen = !isUserMenuOpen"
                    class="w-full flex items-center rounded-md hover:bg-gray-800 transition-colors"
                    :class="{ 'justify-center p-2': !isExpanded, 'p-2': isExpanded }">
                    <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                        <img src="https://i.pravatar.cc/100?img=3" alt="User avatar"
                            class="w-full h-full object-cover" />
                    </div>
                    <div v-if="isExpanded" class="ml-3 overflow-hidden">
                        <p class="text-sm font-medium text-white truncate">System Administrator</p>
                    </div>
                    <Icon v-if="isExpanded" name="lucide:chevron-down"
                        class="w-4 h-4 ml-auto text-gray-400 transition-transform"
                        :class="{ 'rotate-180': isUserMenuOpen }" />
                </button>

                <!-- User Menu Dropdown -->
                <div v-if="isUserMenuOpen && isExpanded"
                    class="absolute bottom-full left-0 w-full bg-gray-900 rounded-lg border border-gray-800 shadow-lg py-1 mb-2">
                    <!-- Main Options -->
                    <NuxtLink to="/profile"
                        class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                        <Icon name="lucide:user" class="w-4 h-4 text-gray-400" />
                        <span class="ml-3 text-sm">Profile</span>
                    </NuxtLink>

                    <NuxtLink to="/billing"
                        class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                        <Icon name="lucide:credit-card" class="w-4 h-4 text-gray-400" />
                        <span class="ml-3 text-sm">Billing</span>
                    </NuxtLink>

                    <NuxtLink to="/settings"
                        class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                        <Icon name="lucide:settings" class="w-4 h-4 text-gray-400" />
                        <span class="ml-3 text-sm">Settings</span>
                    </NuxtLink>

                    <!-- Submenu Items -->
                    <button @click="toggleThemeMenu"
                        class="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:palette" class="w-4 h-4 text-gray-400" />
                            <span class="ml-3 text-sm">Theme</span>
                        </div>
                        <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
                    </button>

                    <button @click="toggleAppearanceMenu"
                        class="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:monitor" class="w-4 h-4 text-gray-400" />
                            <span class="ml-3 text-sm">Appearance</span>
                        </div>
                        <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
                    </button>

                    <button @click="toggleTemplatesMenu"
                        class="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:layout-template" class="w-4 h-4 text-gray-400" />
                            <span class="ml-3 text-sm">Templates</span>
                        </div>
                        <Icon name="lucide:chevron-right" class="w-4 h-4 text-gray-400" />
                    </button>

                    <!-- External Links -->
                    <NuxtLink to="/documentation" target="_blank"
                        class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:book-open" class="w-4 h-4 text-gray-400" />
                            <span class="ml-3 text-sm">Documentation</span>
                        </div>
                        <Icon name="lucide:external-link" class="w-3.5 h-3.5 text-gray-500" />
                    </NuxtLink>

                    <NuxtLink to="https://github.com" target="_blank"
                        class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:github" class="w-4 h-4 text-gray-400" />
                            <span class="ml-3 text-sm">GitHub repository</span>
                        </div>
                        <Icon name="lucide:external-link" class="w-3.5 h-3.5 text-gray-500" />
                    </NuxtLink>

                    <NuxtLink to="/upgrade" target="_blank"
                        class="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:zap" class="w-4 h-4 text-gray-400" />
                            <span class="ml-3 text-sm">Upgrade to Pro</span>
                        </div>
                        <Icon name="lucide:external-link" class="w-3.5 h-3.5 text-gray-500" />
                    </NuxtLink>

                    <div class="border-t border-gray-800 my-1"></div>

                    <!-- Logout -->
                    <button @click="logout"
                        class="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                        <Icon name="lucide:log-out" class="w-4 h-4 text-gray-400" />
                        <span class="ml-3 text-sm">Log out</span>
                    </button>
                </div>
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
const isSettingsOpen = ref(false);
const isUserMenuOpen = ref(false);
const isThemeMenuOpen = ref(false);
const isAppearanceMenuOpen = ref(false);
const isTemplatesMenuOpen = ref(false);

const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;
};

const toggleSettingsGroup = () => {
    isSettingsOpen.value = !isSettingsOpen.value;
};

const toggleThemeMenu = () => {
    isThemeMenuOpen.value = !isThemeMenuOpen.value;
};

const toggleAppearanceMenu = () => {
    isAppearanceMenuOpen.value = !isAppearanceMenuOpen.value;
};

const toggleTemplatesMenu = () => {
    isTemplatesMenuOpen.value = !isTemplatesMenuOpen.value;
};

const logout = () => {
    // Implement logout logic here
    console.log('Logging out...');
};

// Settings items for better maintenance
const settingsItems = [
    { label: 'General', to: '/settings/general' },
    { label: 'Members', to: '/settings/members' },
    { label: 'Notifications', to: '/settings/notifications' },
    { label: 'Security', to: '/settings/security' }
];

// Resize functionality
const startResize = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
};

const resize = (e) => {
    // Change 256 to your desired minimum width, e.g., 200
    const newWidth = Math.max(200, Math.min(384, e.clientX));
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

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.user-menu')) {
            isUserMenuOpen.value = false;
        }
    });
});
</script>

<style scoped>
aside {
    width: var(--sidebar-width, 256px);
    transition: width 0.2s ease-out;
}

aside.w-12 {
    width: 48px !important;
}

/* Add smooth transitions for padding changes */
div {
    transition: padding 0.2s ease-out;
}

/* Improve alignment of text with icons */
.leading-6 {
    line-height: 1.5rem;
}

.user-menu {
    position: relative;
}
</style>
