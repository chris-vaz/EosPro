<template>
  <div class="browser-viewer">
    <div class="browser-toolbar">
      <button @click="refresh" class="toolbar-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </button>
      <button @click="goBack" :disabled="!canGoBack" class="toolbar-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button @click="goForward" :disabled="!canGoForward" class="toolbar-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <input 
        v-model="currentUrl" 
        @keyup.enter="navigateToUrl" 
        class="url-bar" 
        type="text"
      />
    </div>
    <iframe 
      ref="browserFrame"
      :src="proxyUrl" 
      class="browser-frame"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  debugPort: {
    type: Number,
    default: 9222
  }
});

const browserFrame = ref(null);
const currentUrl = ref('about:blank');
const canGoBack = ref(false);
const canGoForward = ref(false);
const history = ref([]);
const currentIndex = ref(-1);

const proxyUrl = computed(() => {
  return `http://localhost:3001/proxy?url=${encodeURIComponent(currentUrl.value)}`;
});

const onIframeLoad = () => {
  try {
    // Update navigation state
    canGoBack.value = browserFrame.value.contentWindow.history.length > 1;
    canGoForward.value = false; // Iframe doesn't expose forward history
    
    // Update current URL
    currentUrl.value = browserFrame.value.contentWindow.location.href;
  } catch (e) {
    // Cross-origin restrictions may prevent access
    console.log('Could not access iframe content:', e);
  }
};

const navigateToUrl = () => {
  if (!currentUrl.value) return;
  if (!currentUrl.value.startsWith('http')) {
    currentUrl.value = 'https://' + currentUrl.value;
  }
  browserFrame.value.src = proxyUrl.value;
};

const goBack = () => {
  browserFrame.value.contentWindow.history.back();
};

const goForward = () => {
  browserFrame.value.contentWindow.history.forward();
};

const refresh = () => {
  browserFrame.value.contentWindow.location.reload();
};

onMounted(() => {
  // Initialize with blank page
  currentUrl.value = 'about:blank';
});
</script>

<style scoped>
.browser-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
}

.browser-toolbar {
  display: flex;
  padding: 8px;
  background: #eaeaea;
  align-items: center;
  gap: 8px;
}

.toolbar-button {
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.url-bar {
  flex: 1;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.browser-frame {
  flex: 1;
  border: none;
  background: white;
}
</style>