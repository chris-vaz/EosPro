<template>
    <div class="kpi-grid mt-3">
        <div class="kpi-card">
            <div class="kpi-icon" :style="{ backgroundColor: '#212EBD' }">
                <Icon name="lucide:briefcase" size="24" class="w-6 h-6 text-gray-400 group-hover:text-white"
                :class="{ 'text-white': $route.path === '/' }" />
            </div>
            <div class="kpi-content">
                <h2 class="kpi-value">{{ totalJobsApplied }}</h2>
                <p class="kpi-label">Total Jobs Applied</p>
            </div>
        </div>

        <div class="kpi-card">
            <div class="kpi-icon" :style="{ backgroundColor: '#D9AF8A' }">
                <Icon name="lucide:clipboard" size="24" class="w-6 h-6 text-gray-400 group-hover:text-white"
                :class="{ 'text-white': $route.path === '/' }" />
            </div>
            <div class="kpi-content">
                <h2 class="kpi-value">{{ totalListedJobs }}</h2>
                <p class="kpi-label">Total Listed Jobs</p>
            </div>
        </div>

        <div class="kpi-card">
            <div class="kpi-icon" :style="{ backgroundColor: '#067FFC' }">
                <Icon name="lucide:video" size="24" class="w-6 h-6 text-gray-400 group-hover:text-white"
                :class="{ 'text-white': $route.path === '/' }" />
            </div>
            <div class="kpi-content">
                <h2 class="kpi-value">{{ interviewingNow }}</h2>
                <p class="kpi-label">Interviewing Now</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KpiGrid',
    data() {
        return {
            totalJobsApplied: 37,
            totalListedJobs: 52,
            interviewingNow: 12
        }
    }
}
</script>

<style scoped>
.kpi-grid {
    display: flex;
    width: 100%;
    gap: 1rem;
}

.kpi-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.kpi-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    color: white;
}

.icon {
    width: 1.5rem;
    height: 1.5rem;
}

.kpi-content {
    display: flex;
    flex-direction: column;
}

.kpi-value {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    line-height: 1;
}

.kpi-label {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #757273;
    font-weight: 600;
}

@media (max-width: 768px) {
    .kpi-grid {
        flex-direction: column;
    }

    .kpi-card {
        margin-bottom: 1rem;
    }
}
</style>