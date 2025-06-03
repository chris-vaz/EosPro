<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div>
            <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div class="py-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-xl font-bold mt-1">Manage your subscription, billing, and payment methods
                            </h3>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button
                                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Add Payment Method</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Current Plan -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                            <div class="flex items-center justify-between">
                                <div class="text-white">
                                    <h2 class="text-xl font-semibold">Current Plan</h2>
                                    <p class="text-blue-100 text-sm">{{ currentPlan.name }} Plan</p>
                                </div>
                                <div class="text-white text-right">
                                    <div class="text-2xl font-bold">${{ currentPlan.price }}</div>
                                    <div class="text-blue-100 text-sm">per {{ currentPlan.billing }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="p-6">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-gray-900">{{ usage.users }}</div>
                                    <div class="text-gray-600 text-sm">Active Users</div>
                                    <div class="text-xs text-gray-500 mt-1">of {{ currentPlan.limits.users }} included
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-gray-900">{{ usage.storage }}GB</div>
                                    <div class="text-gray-600 text-sm">Storage Used</div>
                                    <div class="text-xs text-gray-500 mt-1">of {{ currentPlan.limits.storage }}GB
                                        included</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-gray-900">{{ usage.apiCalls.toLocaleString() }}
                                    </div>
                                    <div class="text-gray-600 text-sm">API Calls</div>
                                    <div class="text-xs text-gray-500 mt-1">of {{
                                        currentPlan.limits.apiCalls.toLocaleString() }} included</div>
                                </div>
                            </div>

                            <!-- Usage Progress Bars -->
                            <div class="space-y-4 mb-6">
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Users</span>
                                        <span class="text-gray-900">{{ Math.round((usage.users /
                                            currentPlan.limits.users) * 100) }}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                            :style="{ width: Math.min((usage.users / currentPlan.limits.users) * 100, 100) + '%' }">
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">Storage</span>
                                        <span class="text-gray-900">{{ Math.round((usage.storage /
                                            currentPlan.limits.storage) * 100) }}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-600 h-2 rounded-full transition-all duration-500"
                                            :style="{ width: Math.min((usage.storage / currentPlan.limits.storage) * 100, 100) + '%' }">
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-600">API Calls</span>
                                        <span class="text-gray-900">{{ Math.round((usage.apiCalls /
                                            currentPlan.limits.apiCalls) * 100) }}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-purple-600 h-2 rounded-full transition-all duration-500"
                                            :style="{ width: Math.min((usage.apiCalls / currentPlan.limits.apiCalls) * 100, 100) + '%' }">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-3">
                                <button @click="showUpgradeModal = true"
                                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-center">
                                    Upgrade Plan
                                </button>
                                <button @click="managePlan"
                                    class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 text-center">
                                    Manage Plan
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Billing History -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <h2 class="text-xl font-semibold text-gray-900">Billing History</h2>
                                <button class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    Download All
                                </button>
                            </div>
                        </div>

                        <div class="p-6">
                            <div class="space-y-4">
                                <div v-for="invoice in billingHistory" :key="invoice.id"
                                    class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    <div class="flex items-center space-x-4">
                                        <div :class="getInvoiceStatusClass(invoice.status)" class="p-2 rounded-lg">
                                            <span class="text-white text-lg">{{ getInvoiceIcon(invoice.status) }}</span>
                                        </div>
                                        <div>
                                            <div class="font-medium text-gray-900">{{ invoice.description }}</div>
                                            <div class="text-sm text-gray-600">{{ invoice.date }}</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-4">
                                        <div class="text-right">
                                            <div class="font-semibold text-gray-900">${{ invoice.amount }}</div>
                                            <div :class="getStatusTextClass(invoice.status)"
                                                class="text-sm font-medium">
                                                {{ invoice.status }}
                                            </div>
                                        </div>
                                        <button @click="downloadInvoice(invoice)"
                                            class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Methods -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-xl font-semibold text-gray-900">Payment Methods</h2>
                        </div>

                        <div class="p-6">
                            <div class="space-y-4">
                                <div v-for="method in paymentMethods" :key="method.id"
                                    class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                                    <div class="flex items-center space-x-4">
                                        <div class="p-2 bg-gray-100 rounded-lg">
                                            <span class="text-2xl">{{ getCardIcon(method.type) }}</span>
                                        </div>
                                        <div>
                                            <div class="font-medium text-gray-900">
                                                {{ method.type }} ending in {{ method.last4 }}
                                            </div>
                                            <div class="text-sm text-gray-600">
                                                Expires {{ method.expiry }}
                                                <span v-if="method.isDefault"
                                                    class="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                    Default
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <button v-if="!method.isDefault" @click="setDefaultPayment(method)"
                                            class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                            Set Default
                                        </button>
                                        <button @click="removePaymentMethod(method)"
                                            class="text-red-600 hover:text-red-700 text-sm font-medium">
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <!-- Add Payment Method Button -->
                                <button @click="addPaymentMethod"
                                    class="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200 text-gray-600 hover:text-gray-700">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    <span>Add New Payment Method</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-8">
                    <!-- Next Billing -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Next Billing</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Next charge</span>
                                <span class="font-semibold text-gray-900">${{ nextBilling.amount }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Billing date</span>
                                <span class="font-semibold text-gray-900">{{ nextBilling.date }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Payment method</span>
                                <span class="font-semibold text-gray-900">•••• {{ nextBilling.card }}</span>
                            </div>
                            <div class="pt-4 border-t border-gray-200">
                                <div class="text-sm text-gray-600 mb-2">Days until next billing</div>
                                <div class="text-2xl font-bold text-blue-600">{{ daysUntilBilling }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Plan Comparison -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Available Plans</h3>
                        <div class="space-y-4">
                            <div v-for="plan in availablePlans" :key="plan.id"
                                :class="plan.id === currentPlan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
                                class="border-2 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors duration-200"
                                @click="selectPlan(plan)">
                                <div class="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 class="font-semibold text-gray-900">{{ plan.name }}</h4>
                                        <p class="text-sm text-gray-600">{{ plan.description }}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="font-bold text-gray-900">${{ plan.price }}</div>
                                        <div class="text-xs text-gray-500">per {{ plan.billing }}</div>
                                    </div>
                                </div>
                                <div class="space-y-1 text-sm text-gray-600">
                                    <div>👥 {{ plan.limits.users }} users</div>
                                    <div>💾 {{ plan.limits.storage }}GB storage</div>
                                    <div>🔌 {{ plan.limits.apiCalls.toLocaleString() }} API calls</div>
                                </div>
                                <div v-if="plan.id === currentPlan.id" class="mt-2">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Current
                                        Plan</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Billing Settings -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Billing Settings</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium text-gray-900">Auto-renewal</div>
                                    <div class="text-sm text-gray-600">Automatically renew subscription</div>
                                </div>
                                <button @click="toggleAutoRenewal"
                                    :class="billingSettings.autoRenewal ? 'bg-blue-600' : 'bg-gray-300'"
                                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200">
                                    <span :class="billingSettings.autoRenewal ? 'translate-x-6' : 'translate-x-1'"
                                        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"></span>
                                </button>
                            </div>

                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium text-gray-900">Email receipts</div>
                                    <div class="text-sm text-gray-600">Send receipts to email</div>
                                </div>
                                <button @click="toggleEmailReceipts"
                                    :class="billingSettings.emailReceipts ? 'bg-blue-600' : 'bg-gray-300'"
                                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200">
                                    <span :class="billingSettings.emailReceipts ? 'translate-x-6' : 'translate-x-1'"
                                        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"></span>
                                </button>
                            </div>

                            <div class="pt-4 border-t border-gray-200">
                                <button @click="cancelSubscription"
                                    class="w-full text-red-600 hover:text-red-700 font-medium text-sm py-2">
                                    Cancel Subscription
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Upgrade Modal -->
        <div v-if="showUpgradeModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-gray-900">Upgrade Your Plan</h2>
                        <button @click="showUpgradeModal = false" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="plan in availablePlans.filter(p => p.id !== currentPlan.id)" :key="plan.id"
                            class="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                            @click="upgradeToPlan(plan)">
                            <div class="text-center mb-4">
                                <h3 class="text-xl font-bold text-gray-900">{{ plan.name }}</h3>
                                <p class="text-gray-600 text-sm">{{ plan.description }}</p>
                                <div class="mt-4">
                                    <span class="text-3xl font-bold text-gray-900">${{ plan.price }}</span>
                                    <span class="text-gray-600">/ {{ plan.billing }}</span>
                                </div>
                            </div>

                            <div class="space-y-2 text-sm">
                                <div class="flex items-center space-x-2">
                                    <span class="text-green-500">✓</span>
                                    <span>{{ plan.limits.users }} users included</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-green-500">✓</span>
                                    <span>{{ plan.limits.storage }}GB storage</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-green-500">✓</span>
                                    <span>{{ plan.limits.apiCalls.toLocaleString() }} API calls</span>
                                </div>
                            </div>

                            <button
                                class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200">
                                Upgrade to {{ plan.name }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Current plan and usage data
const currentPlan = ref({
    id: 'pro',
    name: 'Professional',
    price: 49,
    billing: 'month',
    limits: {
        users: 10,
        storage: 100,
        apiCalls: 100000
    }
})

const usage = ref({
    users: 7,
    storage: 65,
    apiCalls: 75000
})

// Available plans
const availablePlans = ref([
    {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small teams',
        price: 19,
        billing: 'month',
        limits: {
            users: 5,
            storage: 25,
            apiCalls: 25000
        }
    },
    {
        id: 'pro',
        name: 'Professional',
        description: 'Great for growing businesses',
        price: 49,
        billing: 'month',
        limits: {
            users: 10,
            storage: 100,
            apiCalls: 100000
        }
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large organizations',
        price: 99,
        billing: 'month',
        limits: {
            users: 50,
            storage: 500,
            apiCalls: 500000
        }
    }
])

// Billing history
const billingHistory = ref([
    {
        id: 1,
        description: 'Professional Plan - Monthly',
        amount: 49.00,
        date: 'Dec 1, 2024',
        status: 'Paid'
    },
    {
        id: 2,
        description: 'Professional Plan - Monthly',
        amount: 49.00,
        date: 'Nov 1, 2024',
        status: 'Paid'
    },
    {
        id: 3,
        description: 'Professional Plan - Monthly',
        amount: 49.00,
        date: 'Oct 1, 2024',
        status: 'Paid'
    },
    {
        id: 4,
        description: 'Starter Plan - Monthly',
        amount: 19.00,
        date: 'Sep 1, 2024',
        status: 'Paid'
    }
])

// Payment methods
const paymentMethods = ref([
    {
        id: 1,
        type: 'Visa',
        last4: '4242',
        expiry: '12/25',
        isDefault: true
    },
    {
        id: 2,
        type: 'Mastercard',
        last4: '8888',
        expiry: '08/26',
        isDefault: false
    }
])

// Next billing info
const nextBilling = ref({
    amount: 49.00,
    date: 'Jan 1, 2025',
    card: '4242'
})

// Billing settings
const billingSettings = reactive({
    autoRenewal: true,
    emailReceipts: true
})

// Modal state
const showUpgradeModal = ref(false)

// Computed properties
const daysUntilBilling = computed(() => {
    const today = new Date()
    const billingDate = new Date('2025-01-01')
    const diffTime = billingDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
})

// Helper functions
const getInvoiceStatusClass = (status) => {
    const classes = {
        'Paid': 'bg-green-600',
        'Pending': 'bg-yellow-600',
        'Failed': 'bg-red-600'
    }
    return classes[status] || 'bg-gray-600'
}

const getInvoiceIcon = (status) => {
    const icons = {
        'Paid': '✓',
        'Pending': '⏳',
        'Failed': '✗'
    }
    return icons[status] || '📄'
}

const getStatusTextClass = (status) => {
    const classes = {
        'Paid': 'text-green-600',
        'Pending': 'text-yellow-600',
        'Failed': 'text-red-600'
    }
    return classes[status] || 'text-gray-600'
}

const getCardIcon = (type) => {
    const icons = {
        'Visa': '💳',
        'Mastercard': '💳',
        'American Express': '💳',
        'Discover': '💳'
    }
    return icons[type] || '💳'
}

// Action functions
const managePlan = () => {
    console.log('Managing plan...')
    alert('Plan management options coming soon!')
}

const downloadInvoice = (invoice) => {
    console.log('Downloading invoice:', invoice.id)
    alert(`Downloading invoice for ${invoice.description}`)
}

const setDefaultPayment = (method) => {
    paymentMethods.value.forEach(m => m.isDefault = false)
    method.isDefault = true
    nextBilling.value.card = method.last4
    alert(`${method.type} ending in ${method.last4} is now your default payment method`)
}

const removePaymentMethod = (method) => {
    if (method.isDefault) {
        alert('Cannot remove default payment method. Please set another card as default first.')
        return
    }

    const index = paymentMethods.value.findIndex(m => m.id === method.id)
    if (index > -1) {
        paymentMethods.value.splice(index, 1)
        alert('Payment method removed successfully')
    }
}

const addPaymentMethod = () => {
    console.log('Adding payment method...')
    alert('Payment method form would open here')
}

const selectPlan = (plan) => {
    if (plan.id === currentPlan.value.id) return

    console.log('Selecting plan:', plan.name)
    alert(`Would you like to switch to the ${plan.name} plan for $${plan.price}/${plan.billing}?`)
}

const upgradeToPlan = (plan) => {
    console.log('Upgrading to plan:', plan.name)
    currentPlan.value = plan
    showUpgradeModal.value = false
    alert(`Successfully upgraded to ${plan.name} plan!`)
}

const toggleAutoRenewal = () => {
    billingSettings.autoRenewal = !billingSettings.autoRenewal
    console.log('Auto-renewal:', billingSettings.autoRenewal)
}

const toggleEmailReceipts = () => {
    billingSettings.emailReceipts = !billingSettings.emailReceipts
    console.log('Email receipts:', billingSettings.emailReceipts)
}

const cancelSubscription = () => {
    const confirmed = confirm('Are you sure you want to cancel your subscription? This action cannot be undone.')
    if (confirmed) {
        console.log('Cancelling subscription...')
        alert('Subscription cancellation process would start here')
    }
}

// Meta for Nuxt 3
definePageMeta({
    title: 'Billing & Subscription',
    description: 'Manage your subscription, billing, and payment methods'
})
</script>

<style scoped>
/* Custom animations and transitions */
.hover\:scale-105:hover {
    transform: scale(1.05);
}

/* Smooth transitions for toggles */
.transition-transform {
    transition: transform 0.2s ease-in-out;
}

/* Progress bar animations */
@keyframes progress-fill {
    from {
        width: 0%;
    }

    to {
        width: var(--progress-width);
    }
}

/* Modal backdrop blur */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}
</style>