<template>
  <div class="h-screen bg-gray-900 text-white flex flex-col">
    <!-- Header -->
    <div class="bg-gray-800 border-b border-gray-700 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold text-blue-400">Job Agent Browser</h1>
          <div class="flex items-center space-x-2">
            <span class="w-3 h-3 rounded-full" :class="agentStatus.color"></span>
            <span class="text-sm">{{ agentStatus.text }}</span>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="toggleAgent" 
            class="px-4 py-2 rounded-lg font-medium transition-colors"
            :class="isAgentActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
          >
            {{ isAgentActive ? 'Stop Agent' : 'Start Agent' }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <div class="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <!-- Instructions Panel -->
        <div class="p-4 border-b border-gray-700">
          <h3 class="font-semibold mb-3">Agent Instructions</h3>
          <textarea
            v-model="agentInstructions"
            placeholder="Enter instructions for the agent (e.g., 'Search for software engineer jobs in San Francisco, filter by remote work, and apply to positions at startups')"
            class="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none text-sm"
          ></textarea>
          <button 
            @click="executeInstructions"
            :disabled="!agentInstructions.trim() || isExecuting || !isAgentActive"
            class="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            {{ isExecuting ? 'Executing...' : 'Execute Instructions' }}
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="p-4 border-b border-gray-700">
          <h3 class="font-semibold mb-3">Quick Actions</h3>
          <div class="space-y-2">
            <button 
              v-for="action in quickActions" 
              :key="action.name"
              @click="executeQuickAction(action)"
              :disabled="!isAgentActive"
              class="w-full p-2 text-left bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-sm transition-colors"
            >
              {{ action.name }}
            </button>
          </div>
        </div>

        <!-- Job Sites -->
        <div class="p-4 border-b border-gray-700">
          <h3 class="font-semibold mb-3">Popular Job Sites</h3>
          <div class="space-y-2">
            <button 
              v-for="site in jobSites" 
              :key="site.name"
              @click="navigateToSite(site.url)"
              :disabled="!isAgentActive"
              class="w-full p-2 text-left bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-sm transition-colors flex items-center space-x-2"
            >
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>{{ site.name }}</span>
            </button>
          </div>
        </div>

        <!-- Activity Log -->
        <div class="flex-1 p-4">
          <h3 class="font-semibold mb-3">Activity Log</h3>
          <div class="space-y-2 text-xs max-h-64 overflow-y-auto activity-log">
            <div 
              v-for="(log, index) in activityLog" 
              :key="index"
              class="p-2 bg-gray-700 rounded text-gray-300"
            >
              <div class="font-medium text-white">{{ log.timestamp }}</div>
              <div>{{ log.message }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Browser Area -->
      <div class="flex-1 flex flex-col">
        <!-- Browser Controls -->
        <div class="bg-gray-800 border-b border-gray-700 p-3">
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full" :class="isConnected ? 'bg-green-400' : 'bg-red-400'"></div>
              <span class="text-sm text-gray-300">{{ isConnected ? 'Connected' : 'Disconnected' }}</span>
            </div>
            
            <div class="flex-1 text-center">
              <span class="text-sm text-gray-400">{{ currentPageTitle || 'Agent Control Panel' }}</span>
            </div>

            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-400">Backend:</span>
              <span class="text-sm" :class="isConnected ? 'text-green-400' : 'text-red-400'">
                {{ isConnected ? 'Online' : 'Offline' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Browser Display Area -->
        <div class="flex-1 bg-gray-900 relative overflow-hidden">
          <!-- Screenshot Display -->
          <div v-if="currentScreenshot && isAgentActive" class="absolute inset-0">
            <img 
              :src="`data:image/jpeg;base64,${currentScreenshot}`"
              alt="Browser Screenshot"
              class="w-full h-full object-contain cursor-crosshair"
              @click="handleScreenshotClick"
              @load="onScreenshotLoad"
            />
            
            <!-- Interaction Overlay -->
            <div class="absolute top-4 right-4 bg-black bg-opacity-75 rounded-lg p-2">
              <div class="flex items-center space-x-2 text-xs">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live View</span>
              </div>
            </div>

            <!-- Loading Overlay -->
            <div v-if="isExecuting" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div class="bg-gray-800 rounded-lg p-6 text-center">
                <div class="w-12 h-12 mx-auto mb-4 animate-spin">
                  <svg class="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2">{{ currentAction }}</h3>
                <p class="text-gray-400">Agent is working...</p>
              </div>
            </div>
          </div>

          <!-- Agent Status Display (when no screenshot) -->
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div v-if="!isAgentActive" class="space-y-4">
                <div class="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white mb-2">Agent Ready</h3>
                  <p class="text-gray-400">Click "Start Agent" to begin browser automation</p>
                </div>
              </div>

              <div v-else-if="isConnected" class="space-y-4">
                <div class="w-24 h-24 mx-auto bg-green-600 rounded-full flex items-center justify-center animate-pulse">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-green-400 mb-2">Agent Active</h3>
                  <p class="text-gray-400">Waiting for browser view... Navigate to a website to see live view.</p>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div class="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-red-400 mb-2">Connection Lost</h3>
                  <p class="text-gray-400">Reconnecting to backend server...</p>
                </div>
              </div>
            </div>

            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5">
              <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 20px 20px;"></div>
            </div>
          </div>
        </div>

        <!-- Manual Controls (when agent is active) -->
        <div v-if="isAgentActive && currentScreenshot" class="bg-gray-800 border-t border-gray-700 p-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <button @click="scrollUp" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">↑ Scroll Up</button>
              <button @click="scrollDown" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">↓ Scroll Down</button>
            </div>
            <div class="flex items-center space-x-2">
              <input 
                v-model="manualInput" 
                placeholder="Type text..."
                class="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm w-48"
                @keyup.enter="sendText"
              />
              <button @click="sendText" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">Send</button>
            </div>
          </div>
        </div>

        <!-- Status Bar -->
        <div class="bg-gray-800 border-t border-gray-700 px-4 py-2 text-xs text-gray-400">
          <div class="flex items-center justify-between">
            <div>{{ statusMessage }}</div>
            <div v-if="isAgentActive" class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <div class="animate-pulse w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Agent Running</span>
              </div>
              <div v-if="currentScreenshot" class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Live View Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

definePageMeta({
  layout: 'job-agent'
});

// Reactive data
const agentInstructions = ref('')
const isAgentActive = ref(false)
const isExecuting = ref(false)
const currentAction = ref('')
const statusMessage = ref('Ready')
const currentScreenshot = ref(null)
const currentPageTitle = ref('')
const manualInput = ref('')

// Backend connection
const socket = ref(null)
const sessionId = ref(null)
const isConnected = ref(false)

// Activity log
const activityLog = ref([
  {
    timestamp: new Date().toLocaleTimeString(),
    message: 'Job Agent Browser initialized'
  }
])

// Job sites configuration
const jobSites = ref([
  { name: 'Indeed', url: 'https://www.indeed.com' },
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs' },
  { name: 'Google Jobs', url: 'https://www.google.com/search?q=software+engineer+jobs&lang=en' },
  { name: 'Glassdoor', url: 'https://www.glassdoor.com/Job/index.htm' },
  { name: 'Monster', url: 'https://www.monster.com' },
  { name: 'ZipRecruiter', url: 'https://www.ziprecruiter.com' },
  { name: 'AngelList', url: 'https://angel.co/jobs' },
  { name: 'Stack Overflow Jobs', url: 'https://stackoverflow.com/jobs' }
])

// Quick actions
const quickActions = ref([
  { name: 'Search Software Engineer Jobs', action: 'search_swe' },
  { name: 'Filter Remote Positions', action: 'filter_remote' },
  { name: 'Apply to Matching Jobs', action: 'auto_apply' },
  { name: 'Save Interesting Positions', action: 'save_jobs' },
  { name: 'Update Profile', action: 'update_profile' }
])

// Computed properties
const agentStatus = computed(() => {
  if (!isConnected.value) {
    return { color: 'bg-red-400', text: 'Disconnected' }
  }
  if (isAgentActive.value) {
    return { color: 'bg-green-400', text: 'Active' }
  }
  return { color: 'bg-yellow-400', text: 'Ready' }
})

// Methods
const connectToBackend = () => {
  socket.value = io('http://localhost:3001')
  
  socket.value.on('connect', () => {
    isConnected.value = true
    addToLog('Connected to backend server')
    statusMessage.value = 'Connected to agent backend'
  })

  socket.value.on('disconnect', () => {
    isConnected.value = false
    isAgentActive.value = false
    currentScreenshot.value = null
    addToLog('Disconnected from backend server')
    statusMessage.value = 'Disconnected from backend'
  })

  socket.value.on('agent_initialized', (data) => {
    sessionId.value = data.sessionId
    isAgentActive.value = true
    addToLog('Browser agent initialized successfully')
    statusMessage.value = 'Agent ready and waiting for instructions'
  })

  // Screenshot streaming
  socket.value.on('browser_screenshot', (data) => {
    currentScreenshot.value = data.screenshot
  })

  socket.value.on('navigation_complete', (data) => {
    currentPageTitle.value = data.title
    currentScreenshot.value = data.screenshot
    addToLog(`Navigation complete: ${data.title}`)
  })

  socket.value.on('agent_status', (data) => {
    addToLog(data.message)
    statusMessage.value = data.message
  })

  socket.value.on('task_started', (data) => {
    isExecuting.value = true
    currentAction.value = 'Processing instructions'
    addToLog(`Task started: ${data.instructions}`)
  })

  socket.value.on('agent_action', (data) => {
    currentAction.value = data.action
    addToLog(`Agent: ${data.action}`)
    if (data.url) addToLog(`Navigating to: ${data.url}`)
    if (data.jobTitle) addToLog(`Searching for: ${data.jobTitle}`)
  })

  socket.value.on('search_completed', (data) => {
    addToLog(`Search completed on ${data.site} for "${data.jobTitle}"`)
  })

  socket.value.on('filter_applied', (data) => {
    addToLog(`Applied ${data.filter} filter`)
  })

  socket.value.on('applications_completed', (data) => {
    addToLog(`Applied to ${data.count} jobs`)
    isExecuting.value = false
  })

  socket.value.on('task_completed', (data) => {
    isExecuting.value = false
    currentAction.value = ''
    addToLog('Task completed successfully')
    statusMessage.value = 'Task completed successfully'
  })

  socket.value.on('task_error', (data) => {
    isExecuting.value = false
    currentAction.value = ''
    addToLog(`Task failed: ${data.error}`)
    statusMessage.value = `Error: ${data.error}`
  })

  socket.value.on('agent_error', (data) => {
    addToLog(`Agent error: ${data.error}`)
    statusMessage.value = `Error: ${data.error}`
  })

  socket.value.on('agent_stopped', (data) => {
    isAgentActive.value = false
    sessionId.value = null
    currentScreenshot.value = null
    addToLog('Agent stopped')
    statusMessage.value = 'Agent stopped'
  })
}

const addToLog = (message) => {
  activityLog.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    message
  })
  // Keep only last 50 entries
  if (activityLog.value.length > 50) {
    activityLog.value = activityLog.value.slice(0, 50)
  }
}

const toggleAgent = () => {
  if (!isConnected.value) {
    addToLog('Please wait for backend connection')
    return
  }

  if (!isAgentActive.value) {
    // Initialize agent
    socket.value.emit('initialize_agent', {})
    addToLog('Initializing browser agent...')
    statusMessage.value = 'Starting agent...'
  } else {
    // Stop agent
    socket.value.emit('stop_agent', { sessionId: sessionId.value })
    addToLog('Stopping agent...')
    statusMessage.value = 'Stopping agent...'
  }
}

const executeInstructions = async () => {
  if (!agentInstructions.value.trim() || !sessionId.value) return
  
  isExecuting.value = true
  
  socket.value.emit('execute_instructions', {
    sessionId: sessionId.value,
    instructions: agentInstructions.value
  })
  
  addToLog(`Sending instructions to agent: ${agentInstructions.value}`)
}

const executeQuickAction = async (action) => {
  if (!sessionId.value) {
    addToLog('Please start the agent first')
    return
  }

  try {
    const response = await fetch('http://localhost:3001/api/agent/quick-action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: action.action,
        sessionId: sessionId.value
      })
    })

    const result = await response.json()
    if (result.success) {
      addToLog(`Quick action executed: ${action.name}`)
    } else {
      addToLog(`Quick action failed: ${result.error}`)
    }
  } catch (error) {
    addToLog(`Quick action error: ${error.message}`)
  }
}

const navigateToSite = (url) => {
  if (!sessionId.value) {
    addToLog('Please start the agent first')
    return
  }
  
  socket.value.emit('navigate_to_site', {
    sessionId: sessionId.value,
    url: url
  })
  
  addToLog(`Instructing agent to navigate to ${url}`)
}

// Manual browser controls
const handleScreenshotClick = (event) => {
  if (!sessionId.value || !currentScreenshot.value) return
  
  const rect = event.target.getBoundingClientRect()
  const x = Math.round((event.clientX - rect.left) * (1200 / rect.width))
  const y = Math.round((event.clientY - rect.top) * (800 / rect.height))
  
  socket.value.emit('user_click', {
    sessionId: sessionId.value,
    coordinates: { x, y }
  })
  
  addToLog(`Manual click at (${x}, ${y})`)
}

const scrollUp = () => {
  if (!sessionId.value) return
  socket.value.emit('user_scroll', {
    sessionId: sessionId.value,
    direction: 'up'
  })
  addToLog('Manual scroll up')
}

const scrollDown = () => {
  if (!sessionId.value) return
  socket.value.emit('user_scroll', {
    sessionId: sessionId.value,
    direction: 'down'
  })
  addToLog('Manual scroll down')
}

const sendText = () => {
  if (!sessionId.value || !manualInput.value.trim()) return
  
  socket.value.emit('user_type', {
    sessionId: sessionId.value,
    text: manualInput.value
  })
  
  addToLog(`Manual text input: ${manualInput.value}`)
  manualInput.value = ''
}

const onScreenshotLoad = () => {
  // Screenshot loaded successfully
}

// Lifecycle
onMounted(() => {
  connectToBackend()
  addToLog('Browser interface ready')
  statusMessage.value = 'Connecting to backend...'
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
})
</script>

<style scoped>
/* Custom scrollbar for activity log */
.activity-log {
  scrollbar-width: thin;
  scrollbar-color: #4B5563 #374151;
}

.activity-log::-webkit-scrollbar {
  width: 6px;
}

.activity-log::-webkit-scrollbar-track {
  background: #374151;
}

.activity-log::-webkit-scrollbar-thumb {
  background-color: #4B5563;
  border-radius: 3px;
}

/* Cursor for interactive screenshot */
.cursor-crosshair:hover {
  cursor: crosshair;
}
</style>