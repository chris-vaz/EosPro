<template>
    <section class="quick-links-section mt-8">
      <h2 class="text-3xl font-semibold text-center mb-4">Quick Links to Help You Get Ahead</h2>
      <p class="text-center text-lg text-gray-600 mb-8">
        Explore tools to simplify your job search. Build your resume, craft the perfect cover letter, access top job boards, and network like a pro.
      </p>
  
      <div class="grid grid-cols-2 gap-8">
        <!-- Resume Builder Link -->
        <div class="quick-link-card">
          <div class="icon bg-gradient-to-r from-blue-500 to-blue-400 p-4 rounded-full mb-4">
            <Icon name="lucide:file-text" size="24" class="w-8 h-8 text-white" />
          </div>
          <span class="font-semibold text-lg">Resume Builder</span>
        </div>
  
        <!-- Cover Letter Templates Link -->
        <div class="quick-link-card">
          <div class="icon bg-gradient-to-r from-blue-500 to-blue-400 p-4 rounded-full mb-4">
            <Icon name="lucide:file-text" size="24" class="w-8 h-8 text-white" />
          </div>
          <span class="font-semibold text-lg">Cover Letter Templates</span>
        </div>
  
        <!-- Job Boards Link -->
        <div class="quick-link-card">
          <div class="icon bg-gradient-to-r from-blue-500 to-blue-400 p-4 rounded-full mb-4">
            <Icon name="lucide:search" size="24" class="w-8 h-8 text-white" />
          </div>
          <span class="font-semibold text-lg">Job Boards</span>
        </div>
  
        <!-- Networking Tools Link -->
        <div class="quick-link-card">
          <div class="icon bg-gradient-to-r from-blue-500 to-blue-400 p-4 rounded-full mb-4">
            <Icon name="lucide:users" size="24" class="w-8 h-8 text-white" />
          </div>
          <span class="font-semibold text-lg">Networking Tools</span>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .quick-links-section {
    background-color: #f9f9f9;
  }
  
  .quick-link-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .quick-link-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    background-color: #4c9df1; /* Gradient from blue to light blue */
  }
  
  h2 {
    color: #1e3a8a; /* Dark blue color for the title */
  }
  </style>
  