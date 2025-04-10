<template>
  <section class="mt-8">
    <h2 class="text-2xl font-semibold">Quick Links to Help You Get Ahead</h2>
    <p class="mt-1 mb-2">
      Explore tools to simplify your job search. Build your resume, craft the perfect cover letter, access top job
      boards, and network like a pro.
    </p>

    <div class="grid grid-cols-2 gap-4 mt-5">
      <!-- Resume Builder Link -->
      <div class="quick-link-card p-4 rounded-md flex items-center shadow-sm"
        style="background: linear-gradient(to right, #922852, #B03A68);">
        <div class="icon-container bg-black/25 p-3 rounded-md mr-4">
          <Icon name="lucide:pencil" size="24" class="w-5 h-5 text-white" />
        </div>
        <div class="content">
          <h3 class="font-medium text-white text-lg leading-tight">Resume Builder</h3>
          <p class="text-white/90 text-sm mt-0.5">Create a standout resume in minutes.</p>
        </div>
      </div>

      <!-- Cover Letter Templates Link -->
      <div class="quick-link-card p-4 rounded-md flex items-center shadow-sm"
        style="background: linear-gradient(to right, #212EBD, #3D49D1);">
        <div class="icon-container bg-black/25 p-3 rounded-md mr-4">
          <Icon name="lucide:file-text" size="24" class="w-5 h-5 text-white" />
        </div>
        <div class="content">
          <h3 class="font-medium text-white text-lg leading-tight">Cover Letter Templates</h3>
          <p class="text-white/90 text-sm mt-0.5">Create a standout cover letter in minutes.</p>
        </div>
      </div>

      <!-- Job Boards Link -->
      <div class="quick-link-card p-4 rounded-md flex items-center shadow-sm"
        style="background: linear-gradient(to right, #402892, #5438B0);">
        <div class="icon-container bg-black/25 p-3 rounded-md mr-4">
          <Icon name="lucide:search" size="24" class="w-5 h-5 text-white" />
        </div>
        <div class="content">
          <h3 class="font-medium text-white text-lg leading-tight">Job Boards</h3>
          <p class="text-white/90 text-sm mt-0.5">Find the perfect job opportunities.</p>
        </div>
      </div>

      <!-- Networking Tools Link -->
      <div class="quick-link-card p-4 rounded-md flex items-center shadow-sm"
        style="background: linear-gradient(to right, #056D76, #0A8A96);">
        <div class="icon-container bg-black/25 p-3 rounded-md mr-4">
          <Icon name="lucide:users" size="24" class="w-5 h-5 text-white" />
        </div>
        <div class="content">
          <h3 class="font-medium text-white text-lg leading-tight">Networking Tools</h3>
          <p class="text-white/90 text-sm mt-0.5">Connect with professionals in your field.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.quick-link-card {
  height: auto;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.quick-link-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.quick-link-card:active {
  transform: scale(0.98);
}

.icon {
  background-color: #4c9df1;
  /* Gradient from blue to light blue */
}
</style>