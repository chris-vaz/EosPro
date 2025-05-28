<template>
    <div :class="themeClasses" class="min-h-screen transition-colors duration-200">
        <!-- Header -->
        <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div class="px-6 py-2">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <h1 class="text-xl font-bold text-gray-900 dark:text-white ml-3">Resume Editor</h1>
                        <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {{ activeResume?.name || 'No Resume Selected' }}
                        </div>
                    </div>

                    <div class="flex items-center space-x-3">
                        <!-- Action Buttons -->
                        <button @click="createNewResume"
                            class="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span>New Resume</span>
                        </button>

                        <button @click="duplicateResume"
                            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Duplicate
                        </button>

                        <button @click="downloadPDF"
                            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Download PDF
                        </button>

                        <button @click="printResume"
                            class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                            Print
                        </button>

                        <button @click="togglePreview"
                            class="px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            {{ showPreview ? 'Hide' : 'Show' }} Preview
                        </button>

                        <button @click="toggleTheme"
                            class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            <svg v-if="isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                                </path>
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <div class="flex h-screen">
            <!-- Sidebar -->
            <div class="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                <div class="p-4">
                    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">My Resumes</h3>

                    <div class="space-y-2">
                        <div v-for="resume in resumes" :key="resume.id" @click="selectResume(resume.id)" :class="{
                            'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700': activeResumeId === resume.id,
                            'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600': activeResumeId !== resume.id
                        }" class="p-3 rounded-lg border cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-gray-900 dark:text-white">{{ resume.name }}</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">
                                        Modified {{ new Date(resume.lastModified).toLocaleDateString() }}
                                    </div>
                                </div>
                                <button v-if="resumes.length > 1" @click.stop="deleteResume(resume.id)"
                                    class="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="flex-1 flex">
                <!-- Editor Panel -->
                <div :class="showPreview ? 'w-1/2' : 'w-full'" class="overflow-y-auto">
                    <div class="p-6 space-y-8">

                        <!-- Personal Information -->
                        <div
                            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Personal Information
                            </h2>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full
                                        Name</label>
                                    <input v-model="resumeData.personalInfo.fullName" type="text"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                                    <input v-model="resumeData.personalInfo.email" type="email"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label>
                                    <input v-model="resumeData.personalInfo.phone" type="tel"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Location</label>
                                    <input v-model="resumeData.personalInfo.location" type="text"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Website</label>
                                    <input v-model="resumeData.personalInfo.website" type="url"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">LinkedIn</label>
                                    <input v-model="resumeData.personalInfo.linkedin" type="url"
                                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                </div>
                            </div>

                            <div class="mt-4">
                                <label
                                    class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Professional
                                    Summary</label>
                                <textarea v-model="resumeData.personalInfo.summary" rows="4"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Brief professional summary..."></textarea>
                            </div>
                        </div>

                        <!-- Work Experience -->
                        <div
                            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6">
                                        </path>
                                    </svg>
                                    Work Experience
                                </h2>
                                <button @click="addWorkExperience"
                                    class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    Add Experience
                                </button>
                            </div>

                            <div class="space-y-4">
                                <div v-for="(exp, index) in resumeData.workExperience" :key="exp.id"
                                    class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                    <div class="flex justify-between items-start mb-3">
                                        <h4 class="font-medium text-gray-900 dark:text-white">Experience {{ index + 1 }}
                                        </h4>
                                        <button @click="removeWorkExperience(index)"
                                            class="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 p-1 rounded">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Company</label>
                                            <input v-model="exp.company" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Position</label>
                                            <input v-model="exp.position" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Start
                                                Date</label>
                                            <input v-model="exp.startDate" type="month"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End
                                                Date</label>
                                            <input v-model="exp.endDate" type="month"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Present" />
                                        </div>
                                    </div>

                                    <div class="mt-3">
                                        <label
                                            class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                                        <textarea v-model="exp.description" rows="3"
                                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Describe your responsibilities and achievements..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Education -->
                        <div
                            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z">
                                        </path>
                                    </svg>
                                    Education
                                </h2>
                                <button @click="addEducation"
                                    class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    Add Education
                                </button>
                            </div>

                            <div class="space-y-4">
                                <div v-for="(edu, index) in resumeData.education" :key="edu.id"
                                    class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                    <div class="flex justify-between items-start mb-3">
                                        <h4 class="font-medium text-gray-900 dark:text-white">Education {{ index + 1 }}
                                        </h4>
                                        <button @click="removeEducation(index)"
                                            class="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 p-1 rounded">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div class="md:col-span-2">
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Institution</label>
                                            <input v-model="edu.institution" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div class="md:col-span-2">
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Degree</label>
                                            <input v-model="edu.degree" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Start
                                                Date</label>
                                            <input v-model="edu.startDate" type="month"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End
                                                Date</label>
                                            <input v-model="edu.endDate" type="month"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">GPA
                                                (Optional)</label>
                                            <input v-model="edu.gpa" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="3.8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Skills -->
                        <div
                            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                                        </path>
                                    </svg>
                                    Skills
                                </h2>
                                <button @click="addSkill"
                                    class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    Add Skill
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div v-for="(skill, index) in resumeData.skills" :key="skill.id"
                                    class="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <div class="flex-1">
                                        <input v-model="skill.name" type="text" placeholder="Skill name"
                                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        <select v-model="skill.category"
                                            class="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                            <option>Technical</option>
                                            <option>Programming</option>
                                            <option>Frontend</option>
                                            <option>Backend</option>
                                            <option>Soft Skills</option>
                                            <option>Languages</option>
                                            <option>Tools</option>
                                        </select>
                                    </div>
                                    <button @click="removeSkill(index)"
                                        class="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 p-2 rounded">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Projects -->
                        <div
                            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 11H5m14-7l-7 7-7-7"></path>
                                    </svg>
                                    Projects
                                </h2>
                                <button @click="addProject"
                                    class="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    Add Project
                                </button>
                            </div>

                            <div class="space-y-4">
                                <div v-for="(project, index) in resumeData.projects" :key="project.id"
                                    class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                    <div class="flex justify-between items-start mb-3">
                                        <h4 class="font-medium text-gray-900 dark:text-white">Project {{ index + 1 }}
                                        </h4>
                                        <button @click="removeProject(index)"
                                            class="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 p-1 rounded">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="space-y-3">
                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Project
                                                Name</label>
                                            <input v-model="project.name" type="text"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                                            <textarea v-model="project.description" rows="3"
                                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Describe the project and your role..."></textarea>
                                        </div>

                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label
                                                    class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Technologies</label>
                                                <input v-model="project.technologies" type="text"
                                                    placeholder="React, Node.js, MongoDB"
                                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                            </div>

                                            <div>
                                                <label
                                                    class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Link</label>
                                                <input v-model="project.link" type="url"
                                                    placeholder="github.com/username/project"
                                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Preview Panel -->
                <div v-if="showPreview"
                    class="w-1/2 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                    <div class="p-6">
                        <div class="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto" style="min-height: 11in;">
                            <!-- Header -->
                            <div class="text-center mb-8 border-b pb-6">
                                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ resumeData.personalInfo.fullName ||
                                    'Your Name' }}</h1>
                                <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                                    <span v-if="resumeData.personalInfo.email">{{ resumeData.personalInfo.email
                                        }}</span>
                                    <span v-if="resumeData.personalInfo.phone">{{ resumeData.personalInfo.phone
                                        }}</span>
                                    <span v-if="resumeData.personalInfo.location">{{ resumeData.personalInfo.location
                                        }}</span>
                                </div>
                                <div class="flex flex-wrap justify-center gap-4 text-sm text-blue-600 mt-2">
                                    <a v-if="resumeData.personalInfo.website"
                                        :href="'https://' + resumeData.personalInfo.website" target="_blank">{{
                                        resumeData.personalInfo.website }}</a>
                                    <a v-if="resumeData.personalInfo.linkedin"
                                        :href="'https://' + resumeData.personalInfo.linkedin" target="_blank">{{
                                        resumeData.personalInfo.linkedin }}</a>
                                </div>
                            </div>

                            <!-- Summary -->
                            <div v-if="resumeData.personalInfo.summary" class="mb-8">
                                <h2 class="text-xl font-bold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
                                    Professional Summary</h2>
                                <p class="text-gray-700 leading-relaxed">{{ resumeData.personalInfo.summary }}</p>
                            </div>

                            <!-- Work Experience -->
                            <div v-if="resumeData.workExperience.length > 0" class="mb-8">
                                <h2 class="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">Work
                                    Experience</h2>
                                <div class="space-y-6">
                                    <div v-for="exp in resumeData.workExperience" :key="exp.id"
                                        class="border-l-4 border-blue-200 pl-4">
                                        <div class="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 class="text-lg font-semibold text-gray-900">{{ exp.position ||
                                                    'Position Title' }}</h3>
                                                <p class="text-blue-600 font-medium">{{ exp.company || 'Company Name' }}
                                                </p>
                                            </div>
                                            <div class="text-sm text-gray-500 text-right">
                                                <p>{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</p>
                                            </div>
                                        </div>
                                        <p v-if="exp.description" class="text-gray-700 leading-relaxed">{{
                                            exp.description }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Education -->
                            <div v-if="resumeData.education.length > 0" class="mb-8">
                                <h2 class="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
                                    Education</h2>
                                <div class="space-y-4">
                                    <div v-for="edu in resumeData.education" :key="edu.id"
                                        class="border-l-4 border-green-200 pl-4">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <h3 class="text-lg font-semibold text-gray-900">{{ edu.degree || 'Degree Title' }}</h3>
                                                <p class="text-green-600 font-medium">{{ edu.institution || 'Institution Name' }}</p>
                                                <p v-if="edu.gpa" class="text-sm text-gray-600">GPA: {{ edu.gpa }}</p>
                                            </div>
                                            <div class="text-sm text-gray-500 text-right">
                                                <p>{{ edu.startDate }} - {{ edu.endDate }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Skills -->
                            <div v-if="resumeData.skills.length > 0" class="mb-8">
                                <h2 class="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">Skills
                                </h2>
                                <div class="space-y-3">
                                    <div v-for="category in [...new Set(resumeData.skills.map(s => s.category))]"
                                        :key="category">
                                        <div class="flex items-start">
                                            <span class="font-medium text-gray-900 w-24 flex-shrink-0">{{ category
                                                }}:</span>
                                            <div class="flex flex-wrap gap-2">
                                                <span
                                                    v-for="skill in resumeData.skills.filter(s => s.category === category)"
                                                    :key="skill.id"
                                                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                    {{ skill.name }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Projects -->
                            <div v-if="resumeData.projects.length > 0" class="mb-8">
                                <h2 class="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
                                    Projects</h2>
                                <div class="space-y-6">
                                    <div v-for="project in resumeData.projects" :key="project.id"
                                        class="border-l-4 border-purple-200 pl-4">
                                        <div class="mb-2">
                                            <h3 class="text-lg font-semibold text-gray-900">{{ project.name || 'Project Name' }}</h3>
                                            <p v-if="project.link" class="text-purple-600 text-sm">{{ project.link }}
                                            </p>
                                        </div>
                                        <p v-if="project.description" class="text-gray-700 leading-relaxed mb-2">{{
                                            project.description }}</p>
                                        <p v-if="project.technologies" class="text-sm text-gray-600">
                                            <strong>Technologies:</strong> {{ project.technologies }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

definePageMeta({
  layout: 'resume'
});

// Dark mode toggle
const isDarkMode = ref(false)

// Resume editor state
const resumes = ref([])
const activeResumeId = ref(null)
const showPreview = ref(true)

// Resume form data
const resumeData = ref({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: ''
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: []
})

// Initialize with sample resume
onMounted(() => {
  const sampleResume = {
    id: 1,
    name: 'My First Resume',
    lastModified: new Date().toISOString(),
    data: {
      personalInfo: {
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'johndoe.dev',
        linkedin: 'linkedin.com/in/johndoe',
        summary: 'Experienced software developer with a passion for creating innovative solutions and leading high-performing teams.'
      },
      workExperience: [
        {
          id: 1,
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          startDate: '2020-01',
          endDate: 'Present',
          description: 'Led development of scalable web applications serving 100k+ users daily. Mentored junior developers and improved team productivity by 30%.'
        }
      ],
      education: [
        {
          id: 1,
          institution: 'University of Technology',
          degree: 'Bachelor of Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          gpa: '3.8'
        }
      ],
      skills: [
        { id: 1, name: 'JavaScript', category: 'Programming' },
        { id: 2, name: 'React', category: 'Frontend' },
        { id: 3, name: 'Node.js', category: 'Backend' },
        { id: 4, name: 'Leadership', category: 'Soft Skills' }
      ],
      projects: [
        {
          id: 1,
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce solution with React and Node.js',
          technologies: 'React, Node.js, MongoDB',
          link: 'github.com/johndoe/ecommerce'
        }
      ],
      customSections: []
    }
  }

  resumes.value = [sampleResume]
  activeResumeId.value = sampleResume.id
  resumeData.value = JSON.parse(JSON.stringify(sampleResume.data))
})

// Computed properties
const activeResume = computed(() => resumes.value.find(r => r.id === activeResumeId.value))

const themeClasses = computed(() => ({
  'dark bg-gray-900 text-white': isDarkMode.value,
  'bg-gray-50 text-gray-900': !isDarkMode.value
}))

// Methods
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

const togglePreview = () => {
  showPreview.value = !showPreview.value
}

const createNewResume = () => {
  const newResume = {
    id: Date.now(),
    name: `Resume ${resumes.value.length + 1}`,
    lastModified: new Date().toISOString(),
    data: JSON.parse(JSON.stringify(resumeData.value))
  }

  resumes.value.push(newResume)
  activeResumeId.value = newResume.id
  resumeData.value = JSON.parse(JSON.stringify(newResume.data))
}

const selectResume = (resumeId) => {
  saveCurrentResume()
  const resume = resumes.value.find(r => r.id === resumeId)
  if (resume) {
    activeResumeId.value = resumeId
    resumeData.value = JSON.parse(JSON.stringify(resume.data))
  }
}

const saveCurrentResume = () => {
  const index = resumes.value.findIndex(r => r.id === activeResumeId.value)
  if (index !== -1) {
    resumes.value[index].data = JSON.parse(JSON.stringify(resumeData.value))
    resumes.value[index].lastModified = new Date().toISOString()
  }
}

const duplicateResume = () => {
  if (!activeResume.value) return
  const duplicated = {
    id: Date.now(),
    name: `${activeResume.value.name} (Copy)`,
    lastModified: new Date().toISOString(),
    data: JSON.parse(JSON.stringify(resumeData.value))
  }
  resumes.value.push(duplicated)
  activeResumeId.value = duplicated.id
  resumeData.value = JSON.parse(JSON.stringify(duplicated.data))
}

const deleteResume = (resumeId) => {
  if (resumes.value.length <= 1) return
  resumes.value = resumes.value.filter(r => r.id !== resumeId)
  if (activeResumeId.value === resumeId) {
    activeResumeId.value = resumes.value[0].id
    resumeData.value = JSON.parse(JSON.stringify(resumes.value[0].data)) 
  }
}

const downloadPDF = () => {
  alert('PDF download feature will be added soon.')
}

const printResume = () => {
  window.print()
}

// Resume section manipulation
const addWorkExperience = () => {
  resumeData.value.workExperience.push({
    id: Date.now(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeWorkExperience = index => resumeData.value.workExperience.splice(index, 1)

const addEducation = () => {
  resumeData.value.education.push({
    id: Date.now(),
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    gpa: ''
  })
}

const removeEducation = index => resumeData.value.education.splice(index, 1)

const addSkill = () => {
  resumeData.value.skills.push({
    id: Date.now(),
    name: '',
    category: 'Technical'
  })
}

const removeSkill = index => resumeData.value.skills.splice(index, 1)

const addProject = () => {
  resumeData.value.projects.push({
    id: Date.now(),
    name: '',
    description: '',
    technologies: '',
    link: ''
  })
}

const removeProject = index => resumeData.value.projects.splice(index, 1)

// Auto-save changes
watch(resumeData, () => {
  saveCurrentResume()
}, { deep: true })
</script>

