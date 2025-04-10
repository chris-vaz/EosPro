<template>
    <div class="h-screen flex overflow-hidden">
        <!-- Sidebar -->
        <SideNav />

        <!-- Main Area -->
        <div class="flex flex-col flex-1">
            <!-- Sticky Header -->
            <HeaderNav />

            <!-- Scrollable Content Area -->
            <main class="flex-1 overflow-y-auto px-4">
                <slot />
            </main>
        </div>
    </div>
</template>