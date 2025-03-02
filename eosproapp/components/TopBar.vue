<template>
    <header class="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">EOSPRO</h1>
        <nav>
            <ul class="flex space-x-4">
                <li>
                    <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/jobs" class="hover:underline">Jobs</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/profile" class="hover:underline">Profile</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>