<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Cover Photo Section -->
        <div class="relative h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
            <div class="absolute inset-0 bg-black bg-opacity-20"></div>
            <button
                class="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-200 flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                    </path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-sm">Change Cover</span>
            </button>
        </div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Profile Header -->
            <div class="relative -mt-16 mb-8">
                <div class="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <div
                        class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div class="relative">
                            <img :src="user.avatar" alt="User Avatar"
                                class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover" />
                            <button
                                class="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </button>
                        </div>

                        <div class="flex-1">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ user.name }}</h1>
                                    <p class="text-gray-600 mt-1">{{ user.title }}</p>
                                    <div
                                        class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-sm text-gray-500 space-y-1 sm:space-y-0">
                                        <div class="flex items-center space-x-1">
                                            <span class="text-blue-600">✉</span>
                                            <span>{{ user.email }}</span>
                                        </div>
                                        <div class="flex items-center space-x-1">
                                            <span class="text-green-600">📍</span>
                                            <span>{{ user.location }}</span>
                                        </div>
                                        <div class="flex items-center space-x-1">
                                            <span class="text-purple-600">🕒</span>
                                            <span>Joined {{ user.joinDate }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex space-x-3 mt-4 sm:mt-0">
                                    <button @click="editProfile"
                                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                            </path>
                                        </svg>
                                        <span>Edit Profile</span>
                                    </button>
                                    <button
                                        class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span>Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Job Application Stats -->
                    <div class="bg-white rounded-2xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-6">Job Application Overview</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div
                                class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-blue-600 text-sm font-medium">Jobs Applied</p>
                                        <p class="text-3xl font-bold text-blue-700 mt-1">{{ stats.applied }}</p>
                                    </div>
                                    <div class="bg-blue-600 p-3 rounded-lg">
                                        <span class="text-white text-2xl">💼</span>
                                    </div>
                                </div>
                                <div class="mt-4 flex items-center text-sm">
                                    <span class="text-green-500 mr-1">📈</span>
                                    <span class="text-green-600">+{{ monthlyGrowth.applied }}% from last month</span>
                                </div>
                            </div>

                            <div
                                class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-md transition-shadow duration-200">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-green-600 text-sm font-medium">Interviews</p>
                                        <p class="text-3xl font-bold text-green-700 mt-1">{{ stats.interviews }}</p>
                                    </div>
                                    <div class="bg-green-600 p-3 rounded-lg">
                                        <span class="text-white text-2xl">🎯</span>
                                    </div>
                                </div>
                                <div class="mt-4 flex items-center text-sm">
                                    <span class="text-green-500 mr-1">📈</span>
                                    <span class="text-green-600">+{{ monthlyGrowth.interviews }}% from last month</span>
                                </div>
                            </div>

                            <div
                                class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-md transition-shadow duration-200">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-purple-600 text-sm font-medium">Success Rate</p>
                                        <p class="text-3xl font-bold text-purple-700 mt-1">{{ successRate }}%</p>
                                    </div>
                                    <div class="bg-purple-600 p-3 rounded-lg">
                                        <span class="text-white text-2xl">⭐</span>
                                    </div>
                                </div>
                                <div class="mt-4 flex items-center text-sm">
                                    <span class="text-green-500 mr-1">📈</span>
                                    <span class="text-green-600">+{{ monthlyGrowth.successRate }}% from last
                                        month</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-white rounded-2xl shadow-sm p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-semibold text-gray-900">Recent Activity</h2>
                            <button
                                class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
                                View All →
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div v-for="activity in recentActivities" :key="activity.id"
                                class="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                                @click="viewActivity(activity)">
                                <div :class="activity.iconBg" class="p-3 rounded-lg flex-shrink-0">
                                    <span class="text-white text-lg">{{ activity.icon }}</span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-gray-900 font-medium">{{ activity.title }}</p>
                                    <p class="text-gray-600 text-sm mt-1">{{ activity.description }}</p>
                                    <div class="flex items-center justify-between mt-2">
                                        <p class="text-gray-400 text-xs">{{ activity.time }}</p>
                                        <span v-if="activity.status" :class="getStatusClass(activity.status)"
                                            class="px-2 py-1 rounded-full text-xs font-medium">
                                            {{ activity.status }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Application Timeline -->
                    <div class="bg-white rounded-2xl shadow-sm p-6">
                        <h2 class="text-xl font-semibold text-gray-900 mb-6">Application Timeline</h2>
                        <div class="space-y-6">
                            <div v-for="(item, index) in timeline" :key="index" class="flex items-start space-x-4">
                                <div class="flex flex-col items-center">
                                    <div :class="item.completed ? 'bg-green-500' : 'bg-gray-300'"
                                        class="w-3 h-3 rounded-full"></div>
                                    <div v-if="index < timeline.length - 1" class="w-0.5 h-12 bg-gray-200 mt-2"></div>
                                </div>
                                <div class="flex-1 pb-6">
                                    <h3 class="font-medium text-gray-900">{{ item.title }}</h3>
                                    <p class="text-gray-600 text-sm mt-1">{{ item.description }}</p>
                                    <p class="text-gray-400 text-xs mt-2">{{ item.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-8">
                    <!-- Profile Completion -->
                    <div class="bg-white rounded-2xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">Overall Progress</span>
                                <span class="text-sm font-medium text-gray-900">{{ profileCompletion }}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 relative"
                                    :style="{ width: profileCompletion + '%' }">
                                    <div
                                        class="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-sm transform translate-x-1">
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <div v-for="item in completionItems" :key="item.name"
                                    class="flex items-center justify-between text-sm">
                                    <div class="flex items-center space-x-3">
                                        <span v-if="item.completed" class="text-green-500 text-lg">✅</span>
                                        <span v-else class="text-gray-400 text-lg">⭕</span>
                                        <span :class="item.completed ? 'text-gray-900' : 'text-gray-500'">{{ item.name
                                            }}</span>
                                    </div>
                                    <button v-if="!item.completed"
                                        class="text-blue-600 hover:text-blue-700 text-xs font-medium">
                                        Complete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="bg-white rounded-2xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div class="space-y-3">
                            <button v-for="action in quickActions" :key="action.name"
                                @click="handleQuickAction(action.action)"
                                class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 group">
                                <div :class="action.iconBg"
                                    class="p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
                                    <span class="text-white">{{ action.icon }}</span>
                                </div>
                                <span class="text-gray-700 font-medium">{{ action.name }}</span>
                                <span class="ml-auto text-gray-400 group-hover:text-gray-600">→</span>
                            </button>
                        </div>
                    </div>

                    <!-- Skills & Expertise -->
                    <div class="bg-white rounded-2xl shadow-sm p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">Skills & Expertise</h3>
                            <button @click="editSkills" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Edit
                            </button>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="skill in user.skills" :key="skill"
                                class="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium hover:shadow-sm transition-shadow duration-200 cursor-pointer">
                                {{ skill }}
                            </span>
                        </div>
                        <button @click="addSkill"
                            class="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                            <span class="text-lg">➕</span>
                            <span>Add Skills</span>
                        </button>
                    </div>

                    <!-- Contact Information -->
                    <div class="bg-white rounded-2xl shadow-sm p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div class="space-y-3">
                            <div class="flex items-center space-x-3">
                                <span class="text-blue-600 text-lg">📧</span>
                                <span class="text-gray-700">{{ user.email }}</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="text-green-600 text-lg">📱</span>
                                <span class="text-gray-700">{{ user.phone }}</span>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="text-purple-600 text-lg">🌐</span>
                                <a :href="user.website" class="text-blue-600 hover:text-blue-700">{{ user.website }}</a>
                            </div>
                            <div class="flex items-center space-x-3">
                                <span class="text-blue-600 text-lg">💼</span>
                                <a :href="user.linkedin" class="text-blue-600 hover:text-blue-700">LinkedIn Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Enhanced user data with reactive properties
const user = reactive({
    name: "John Doe",
    title: "Senior Frontend Developer",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    avatar: "https://i.pravatar.cc/150?img=3",
    skills: ["JavaScript", "Vue.js", "React", "TypeScript", "Node.js", "Python", "Tailwind CSS", "MongoDB"]
})

// Enhanced job application stats with reactive updates
const stats = ref({
    applied: 24,
    interviews: 8,
    rejections: 5,
})

// Monthly growth data
const monthlyGrowth = ref({
    applied: 12,
    interviews: 8,
    successRate: 5
})

// Computed success rate
const successRate = computed(() => {
    const total = stats.value.applied
    const successful = stats.value.interviews
    return total > 0 ? Math.round((successful / total) * 100) : 0
})

// Profile completion data with reactive updates
const profileCompletion = ref(75)
const completionItems = ref([
    { name: "Profile Photo", completed: true },
    { name: "Contact Information", completed: true },
    { name: "Work Experience", completed: true },
    { name: "Skills & Endorsements", completed: false },
    { name: "Portfolio Projects", completed: false },
])

// Recent activities with enhanced data
const recentActivities = ref([
    {
        id: 1,
        title: "Applied to Frontend Developer at TechCorp",
        description: "Your application has been submitted successfully and is under review",
        time: "2 hours ago",
        icon: "💼",
        iconBg: "bg-blue-600",
        status: "Pending"
    },
    {
        id: 2,
        title: "Interview scheduled with StartupXYZ",
        description: "Video interview scheduled for Friday at 2:00 PM PST",
        time: "1 day ago",
        icon: "🎯",
        iconBg: "bg-green-600",
        status: "Scheduled"
    },
    {
        id: 3,
        title: "Profile viewed by 5 recruiters",
        description: "Your profile is gaining attention from top companies",
        time: "2 days ago",
        icon: "👀",
        iconBg: "bg-purple-600",
        status: "Active"
    },
    {
        id: 4,
        title: "Application update from DevCorp",
        description: "Your application has moved to the next round",
        time: "3 days ago",
        icon: "📈",
        iconBg: "bg-orange-600",
        status: "Progress"
    }
])

// Application timeline
const timeline = ref([
    {
        title: "Profile Created",
        description: "Welcome to your job search journey!",
        date: "March 15, 2024",
        completed: true
    },
    {
        title: "First Application Submitted",
        description: "Applied to Frontend Developer position",
        date: "March 18, 2024",
        completed: true
    },
    {
        title: "First Interview Scheduled",
        description: "Technical interview with TechCorp",
        date: "March 25, 2024",
        completed: true
    },
    {
        title: "Portfolio Review",
        description: "Complete portfolio review and optimization",
        date: "Pending",
        completed: false
    }
])

// Quick actions with enhanced functionality
const quickActions = ref([
    { name: "Update Resume", icon: "📄", iconBg: "bg-blue-600", action: "updateResume" },
    { name: "Upload Portfolio", icon: "🎨", iconBg: "bg-green-600", action: "uploadPortfolio" },
    { name: "Job Alerts", icon: "🔔", iconBg: "bg-yellow-600", action: "manageAlerts" },
    { name: "Privacy Settings", icon: "🔒", iconBg: "bg-red-600", action: "privacySettings" },
    { name: "Download Data", icon: "💾", iconBg: "bg-gray-600", action: "downloadData" },
    { name: "Contact Support", icon: "💬", iconBg: "bg-purple-600", action: "contactSupport" }
])

// Enhanced functions with better UX
const editProfile = () => {
    console.log("Opening profile editor...")
    // Here you would typically open a modal or navigate to edit page
}

const viewActivity = (activity) => {
    console.log("Viewing activity:", activity.title)
    // Handle activity click - could open details modal
}

const getStatusClass = (status) => {
    const statusClasses = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Scheduled': 'bg-green-100 text-green-800',
        'Active': 'bg-blue-100 text-blue-800',
        'Progress': 'bg-purple-100 text-purple-800'
    }
    return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const handleQuickAction = (action) => {
    console.log("Executing action:", action)
    // Handle different quick actions
    switch (action) {
        case 'updateResume':
            alert("Opening resume editor...")
            break
        case 'uploadPortfolio':
            alert("Opening portfolio uploader...")
            break
        case 'manageAlerts':
            alert("Opening job alerts settings...")
            break
        default:
            alert(`${action} feature coming soon!`)
    }
}

const editSkills = () => {
    console.log("Opening skills editor...")
}

const addSkill = () => {
    const newSkill = prompt("Enter a new skill:")
    if (newSkill && !user.skills.includes(newSkill)) {
        user.skills.push(newSkill)
    }
}

// Watch for profile completion changes
import { watch } from 'vue'
watch(completionItems, (newItems) => {
    const completed = newItems.filter(item => item.completed).length
    profileCompletion.value = Math.round((completed / newItems.length) * 100)
}, { deep: true })
</script>

<style scoped>
/* Custom animations for smooth interactions */
.hover\:scale-105:hover {
    transform: scale(1.05);
}

/* Smooth gradient animation */
@keyframes gradient-shift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.bg-gradient-to-r {
    background-size: 200% 200%;
    animation: gradient-shift 6s ease infinite;
}
</style>