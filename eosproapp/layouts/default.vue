<template>
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <SideNav />

        <div class="flex flex-col flex-1">
            <!-- Persistent Header -->
            <HeaderNav />

            <!-- Main Content Area -->
            <main class="flex-1 px-4">
                <slot />
            </main>
        </div>
    </div>
</template>
