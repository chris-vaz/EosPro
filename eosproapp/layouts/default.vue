<template>
    <div class="min-h-screen flex">
        <!-- Sidebar (Now contains the top bar) -->
        <SideNav />

        <div class="flex flex-col flex-1">
            <!-- Top Bar (Inside Sidebar but appears in content for spacing) -->
            <!-- <TopBar /> -->

            <!-- Main Content Area -->
            <main class="flex-1 p-4">
                <slot />
            </main>
        </div>
    </div>
</template>