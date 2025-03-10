<template>
    <aside class="bg-[#1C1C1F] h-screen flex flex-col transition-all duration-200 ease-out relative"
        :class="{ 'w-[--sidebar-width]': isExpanded, 'w-12': !isExpanded }">
        <!-- Logo -->
        <div class="flex items-center justify-between border-b border-gray-800"
            :class="{ 'p-4': isExpanded, 'p-2 justify-center': !isExpanded }">
            <div class="flex items-center" :class="{ 'justify-center w-full': !isExpanded }">
                <div class="text-emerald-500" :class="{ 'mr-2': isExpanded }">
                    <Icon name="logos:nuxt-icon" class="w-6 h-6" />
                </div>
                <span v-if="isExpanded"
                    class="text-white font-bold text-lg transition-opacity duration-200">EOSPro</span>
            </div>
            <!-- Temporarily Hiding the chevron left toggle sidebar -->
            <!-- <button v-if="isExpanded" @click="toggleSidebar" class="text-gray-400 hover:text-white">
                <Icon name="lucide:chevrons-left" class="w-5 h-5" />
            </button> -->
        </div>

        <!-- Search Bar -->
        <div v-if="isExpanded" class="px-4 py-3">
            <div class="relative flex items-center">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="lucide:search" class="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Search..."
                    class="w-full bg-[#222832] text-gray-200 text-base rounded-md py-1 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    :class="{ 'pr-12': isExpanded }" />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-xs text-gray-500 bg-gray-700 px-1.5 py-0.5 rounded">K</span>
                </div>
            </div>
        </div>
        <div v-else class="p-2">
            <button class="w-full flex justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
                <Icon name="lucide:search" class="w-6 h-6" />
            </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 mt-4 overflow-y-auto">
            <NuxtLink to="/"
                class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white group relative"
                :class="{ 'bg-[#2D3748] text-white': $route.path === '/', 'justify-center': !isExpanded }">
                <div class="flex items-center">
                    <Icon name="lucide:home" class="w-6 h-6 text-gray-400 group-hover:text-white"
                        :class="{ 'text-white': $route.path === '/' }" />
                    <span v-if="isExpanded" class="ml-3 text-base leading-6">Home</span>
                </div>
            </NuxtLink>

            <NuxtLink to="/inbox"
                class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white group relative"
                :class="{ 'bg-[#2D3748] text-white': $route.path === '/inbox', 'justify-center': !isExpanded }">
                <div class="flex items-center">
                    <Icon name="lucide:inbox" class="w-6 h-6 text-gray-400 group-hover:text-white"
                        :class="{ 'text-white': $route.path === '/inbox' }" />
                    <span v-if="isExpanded" class="ml-3 text-base leading-6">Inbox</span>
                </div>
                <div v-if="isExpanded"
                    class="ml-auto bg-[#0075DC] text-white text-xs rounded-full px-2 py-0.5 min-w-6 text-center">
                    4
                </div>
                <!-- Show badge as dot when collapsed -->
                <div v-if="!isExpanded" class="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#0075DC]"></div>
            </NuxtLink>

            <NuxtLink to="/customers"
                class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white group relative"
                :class="{ 'bg-[#2D3748] text-white': $route.path === '/customers', 'justify-center': !isExpanded }">
                <div class="flex items-center">
                    <Icon name="lucide:users" class="w-6 h-6 text-gray-400 group-hover:text-white"
                        :class="{ 'text-white': $route.path === '/customers' }" />
                    <span v-if="isExpanded" class="ml-3 text-base leading-6">Customers</span>
                </div>
            </NuxtLink>

            <!-- Settings Group -->
            <div>
                <button @click="toggleSettingsGroup"
                    class="w-full flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white group"
                    :class="{ 'justify-center': !isExpanded, 'bg-[#2D3748]': isSettingsOpen }">
                    <div class="flex items-center flex-1">
                        <Icon name="lucide:settings" class="w-6 h-6 text-gray-400 group-hover:text-white"
                            :class="{ 'text-white': isSettingsOpen }" />
                        <span v-if="isExpanded" class="ml-3 text-base leading-6">Settings</span>
                    </div>
                    <div v-if="isExpanded" class="text-gray-400 transition-transform duration-200"
                        :class="{ 'rotate-180': isSettingsOpen }">
                        <Icon name="lucide:chevron-down" class="w-5 h-5" />
                    </div>
                </button>
                <div v-if="isSettingsOpen && isExpanded" class="mt-2 ml-6">
                    <NuxtLink v-for="(item, index) in settingsItems" :key="index" :to="item.to"
                        class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white text-base leading-6">
                        {{ item.label }}
                    </NuxtLink>
                </div>
                <!-- Dots for collapsed state -->
                <div v-if="isSettingsOpen && !isExpanded" class="flex flex-col items-center gap-2 py-2">
                    <div v-for="(_, index) in settingsItems" :key="index" class="w-2 h-2 rounded-full bg-gray-500">
                    </div>
                </div>
            </div>
        </nav>

        <!-- Footer Links -->
        <div class="mt-auto border-t border-gray-800 pt-4 px-4">
            <NavItem to="/feedback" icon="lucide:message-circle" :expanded="isExpanded" external>
                Feedback
            </NavItem>

            <NavItem to="/help" icon="lucide:help-circle" :expanded="isExpanded" external>
                Support
            </NavItem>

            <!-- User Profile -->
            <div class="p-2 mt-4 border-t border-gray-800 relative user-menu">
                <button @click.stop="toggleUserMenu"
                    class="w-full flex items-center rounded-md hover:bg-[#2D3748] transition-colors"
                    :class="{ 'justify-center p-2': !isExpanded, 'p-2': isExpanded }">
                    <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                        <img src="https://i.pravatar.cc/100?img=8" alt="User avatar"
                            class="w-full h-full object-cover" />
                    </div>
                    <div v-if="isExpanded" class="ml-3 overflow-hidden">
                        <p class="text-base font-medium text-white truncate">System Administrator</p>
                    </div>
                    <Icon v-if="isExpanded" name="lucide:chevron-down"
                        class="w-5 h-5 ml-auto text-gray-400 transition-transform"
                        :class="{ 'rotate-180': isUserMenuOpen }" />
                </button>

                <!-- User Menu Dropdown -->
                <div v-if="isUserMenuOpen && isExpanded"
                    class="absolute bottom-full left-0 w-full bg-[#1b1718] rounded-md border border-gray-800 shadow-lg py-2 mb-2 z-10">
                    <!-- Main Options -->
                    <NuxtLink to="/profile"
                        class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white">
                        <Icon name="lucide:user" class="w-5 h-5 text-gray-400" />
                        <span class="ml-3 text-base">Profile</span>
                    </NuxtLink>

                    <NuxtLink to="/billing"
                        class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white">
                        <Icon name="lucide:credit-card" class="w-5 h-5 text-gray-400" />
                        <span class="ml-3 text-base">Billing</span>
                    </NuxtLink>

                    <NuxtLink to="/settings"
                        class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white">
                        <Icon name="lucide:settings" class="w-5 h-5 text-gray-400" />
                        <span class="ml-3 text-base">Settings</span>
                    </NuxtLink>

                    <!-- Submenu Items -->
                    <button @click.stop="toggleThemeMenu"
                        class="w-full flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:palette" class="w-5 h-5 text-gray-400" />
                            <span class="ml-3 text-base">Theme</span>
                        </div>
                        <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-400" />
                    </button>

                    <button @click.stop="toggleAppearanceMenu"
                        class="w-full flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:monitor" class="w-5 h-5 text-gray-400" />
                            <span class="ml-3 text-base">Appearance</span>
                        </div>
                        <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-400" />
                    </button>

                    <button @click.stop="toggleTemplatesMenu"
                        class="w-full flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:layout-template" class="w-5 h-5 text-gray-400" />
                            <span class="ml-3 text-base">Templates</span>
                        </div>
                        <Icon name="lucide:chevron-right" class="w-5 h-5 text-gray-400" />
                    </button>

                    <!-- External Links -->
                    <NuxtLink to="/documentation" target="_blank"
                        class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:book-open" class="w-5 h-5 text-gray-400" />
                            <span class="ml-3 text-base">Documentation</span>
                        </div>
                        <Icon name="lucide:external-link" class="w-4 h-4 text-gray-500" />
                    </NuxtLink>

                    <NuxtLink to="https://github.com" target="_blank"
                        class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:github" class="w-5 h-5 text-gray-400" />
                            <span class="ml-3 text-base">GitHub repository</span>
                        </div>
                        <Icon name="lucide:external-link" class="w-4 h-4 text-gray-500" />
                    </NuxtLink>

                    <NuxtLink to="/upgrade" target="_blank"
                        class="flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white justify-between group">
                        <div class="flex items-center">
                            <Icon name="lucide:zap" class="w-5 h-5 text-gray-400" />
                            <span class="ml-3 text-base">Upgrade to Pro</span>
                        </div>
                        <Icon name="lucide:external-link" class="w-4 h-4 text-gray-500" />
                    </NuxtLink>

                    <div class="border-t border-gray-800 my-2"></div>

                    <!-- Logout -->
                    <button @click="logout"
                        class="w-full flex items-center px-4 py-1 text-gray-300 hover:bg-[#2D3748] hover:text-white">
                        <Icon name="lucide:log-out" class="w-5 h-5 text-gray-400" />
                        <span class="ml-3 text-base">Log out</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Add a resize handle to the right edge of the sidebar -->
        <div v-if="isExpanded"
            class="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-800 hover:bg-[#0075DC]"
            @mousedown="startResize"></div>
    </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';

// Get current route
const route = useRoute();

// Local storage keys
const SIDEBAR_WIDTH_KEY = 'eos-pro-sidebar-width';
const SIDEBAR_EXPANDED_KEY = 'eos-pro-sidebar-expanded';

// Sidebar state with composition API
const isExpanded = ref(true);
const sidebarWidth = ref(256); // Default width
const isSettingsOpen = ref(false);
const isUserMenuOpen = ref(false);
const isThemeMenuOpen = ref(false);
const isAppearanceMenuOpen = ref(false);
const isTemplatesMenuOpen = ref(false);

// Save sidebar width to localStorage
const saveSidebarWidth = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.value.toString());
    }
};

// Save sidebar expanded state to localStorage
const saveSidebarExpandedState = () => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(SIDEBAR_EXPANDED_KEY, isExpanded.value.toString());
    }
};

// Reset sidebar width to default
const resetSidebarWidth = () => {
    sidebarWidth.value = 256;
    document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth.value}px`);
    saveSidebarWidth();
};

// Toggle functions
const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value;
    // Close menus when toggling sidebar
    if (!isExpanded.value) {
        isUserMenuOpen.value = false;
        isSettingsOpen.value = false;
    }
    // Save state
    saveSidebarExpandedState();
};

const toggleUserMenu = (event) => {
    // Stop event propagation to prevent immediate closing
    event.stopPropagation();
    isUserMenuOpen.value = !isUserMenuOpen.value;
};

const toggleSettingsGroup = () => {
    isSettingsOpen.value = !isSettingsOpen.value;
};

const toggleThemeMenu = () => {
    isThemeMenuOpen.value = !isThemeMenuOpen.value;
    // Close other menus
    isAppearanceMenuOpen.value = false;
    isTemplatesMenuOpen.value = false;
};

const toggleAppearanceMenu = () => {
    isAppearanceMenuOpen.value = !isAppearanceMenuOpen.value;
    // Close other menus
    isThemeMenuOpen.value = false;
    isTemplatesMenuOpen.value = false;
};

const toggleTemplatesMenu = () => {
    isTemplatesMenuOpen.value = !isTemplatesMenuOpen.value;
    // Close other menus
    isThemeMenuOpen.value = false;
    isAppearanceMenuOpen.value = false;
};

// Function for logging out - implement your actual logout logic here
const logout = () => {
    console.log('Logging out...');
    // Example: redirect to login page
    // navigateTo('/login');
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
    // Set minimum width to 200px and maximum to 384px
    const newWidth = Math.max(200, Math.min(384, e.clientX));
    sidebarWidth.value = newWidth;
    document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
};

const stopResize = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);

    // Save width after resizing stops
    saveSidebarWidth();
};

// Close menu when clicking outside
const handleOutsideClick = (event) => {
    // If click is outside the user menu
    if (isUserMenuOpen.value && !event.target.closest('.user-menu')) {
        isUserMenuOpen.value = false;
    }
};

// Watch for route changes to close menus
watch(() => route.path, () => {
    isUserMenuOpen.value = false;
    isThemeMenuOpen.value = false;
    isAppearanceMenuOpen.value = false;
    isTemplatesMenuOpen.value = false;
});

// Set up event listeners and restore saved state
onMounted(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
        // Restore saved sidebar width
        const savedWidth = localStorage.getItem(SIDEBAR_WIDTH_KEY);
        if (savedWidth) {
            sidebarWidth.value = parseInt(savedWidth);
        }

        // Restore saved expanded state
        const savedExpandedState = localStorage.getItem(SIDEBAR_EXPANDED_KEY);
        if (savedExpandedState !== null) {
            isExpanded.value = savedExpandedState === 'true';
        }
    }

    // Set initial sidebar width
    document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth.value}px`);

    // Add click listener for closing menus when clicking outside
    document.addEventListener('click', handleOutsideClick);
});

// Clean up event listeners on component unmount
onUnmounted(() => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
    document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
aside {
    width: var(--sidebar-width, 256px);
    transition: width 0.2s ease-out;
    background-color: #1C1C1F;
    /* Match the dark background */
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

/* Make sure user menu has proper positioning */
.user-menu {
    position: relative;
    z-index: 50;
}

/* Custom styles for navigation items */
nav a,
nav button {
    color: #A0AEC0;
    /* Default text color */
    transition: all 0.2s ease;
}

nav a:hover,
nav button:hover {
    background-color: #2D3748;
    /* Hover background */
    color: #FFFFFF;
    /* Hover text color */
}

/* Icon styles */
nav .w-6.h-6 {
    color: #A0AEC0;
    /* Default icon color */
}

nav .group:hover .w-6.h-6,
nav .text-white {
    color: #FFFFFF;
    /* Hover/active icon color */
}

/* Footer links */
footer a {
    color: #A0AEC0;
    /* Default text color */
}

footer a:hover {
    background-color: #2D3748;
    /* Hover background */
    color: #FFFFFF;
    /* Hover text color */
}

/* User menu dropdown */
.user-menu .absolute {
    /* Match dropdown background */
    border-color: #27272A;
    /* Subtle border */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Subtle shadow */
}

.user-menu a,
.user-menu button {
    color: #A0AEC0;
    /* Default text color */
}

.user-menu a:hover,
.user-menu button:hover {
    background-color: #2D3748;
    /* Hover background */
    color: #FFFFFF;
    /* Hover text color */
}

.user-menu .w-5.h-5 {
    color: #A0AEC0;
    /* Default icon color */
}

.user-menu a:hover .w-5.h-5,
.user-menu button:hover .w-5.h-5 {
    color: #FFFFFF;
    /* Hover icon color */
}
</style>