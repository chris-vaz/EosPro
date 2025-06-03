const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store active browser sessions
const activeSessions = new Map();

class JobAgent {
    constructor(sessionId, socketId) {
        this.sessionId = sessionId;
        this.socketId = socketId;
        this.browser = null;
        this.page = null;
        this.isActive = false;
        this.currentTask = null;
        this.screenshotInterval = null;
        this.lastScreenshot = null;
        this.isScreenshotting = false;
    }

    async initialize() {
        try {
            // Enhanced browser configuration to avoid detection
            this.browser = await puppeteer.launch({
                headless: 'new', // Use new headless mode for better stealth
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor',
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--disable-extensions',
                    '--disable-plugins',
                    '--disable-images', // Speed up loading
                    '--window-size=1200,800',
                    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                ],
                defaultViewport: { width: 1200, height: 800 }
            });

            this.page = await this.browser.newPage();

            // Enhanced stealth configuration
            await this.page.evaluateOnNewDocument(() => {
                // Remove webdriver property
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => undefined,
                });

                // Mock plugins
                Object.defineProperty(navigator, 'plugins', {
                    get: () => [1, 2, 3, 4, 5],
                });

                // Mock languages
                Object.defineProperty(navigator, 'languages', {
                    get: () => ['en-US', 'en'],
                });

                // Add chrome object
                window.chrome = {
                    runtime: {},
                    loadTimes: function() {},
                    csi: function() {},
                    app: {}
                };

                // Override permissions
                const originalQuery = window.navigator.permissions.query;
                window.navigator.permissions.query = (parameters) => (
                    parameters.name === 'notifications' ?
                        Promise.resolve({ state: Notification.permission }) :
                        originalQuery(parameters)
                );

                // Mock platform
                Object.defineProperty(navigator, 'platform', {
                    get: () => 'Win32'
                });
            });

            // Set realistic headers
            await this.page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'max-age=0'
            });

            // Block unnecessary resources to speed up
            await this.page.setRequestInterception(true);
            this.page.on('request', (req) => {
                const resourceType = req.resourceType();
                if (resourceType === 'stylesheet' || resourceType === 'font' || resourceType === 'image') {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            this.isActive = true;
            this.startScreenshotStream();
            this.emitToClient('agent_status', { status: 'initialized', message: 'Browser agent initialized successfully' });

            return true;
        } catch (error) {
            console.error('Failed to initialize agent:', error);
            this.emitToClient('agent_error', { error: 'Failed to initialize browser agent' });
            return false;
        }
    }

    // Optimized screenshot streaming
    startScreenshotStream() {
        this.screenshotInterval = setInterval(async () => {
            if (this.page && this.isActive && !this.isScreenshotting) {
                this.isScreenshotting = true;
                try {
                    const screenshot = await this.page.screenshot({ 
                        encoding: 'base64',
                        fullPage: false,
                        quality: 60, // Reduced quality for better performance
                        type: 'jpeg'
                    });
                    
                    // Only send if screenshot changed significantly
                    if (this.hasSignificantChange(screenshot)) {
                        this.emitToClient('browser_screenshot', { screenshot });
                        this.lastScreenshot = screenshot;
                    }
                } catch (error) {
                    // Ignore screenshot errors
                } finally {
                    this.isScreenshotting = false;
                }
            }
        }, 2000); // Reduced frequency to every 2 seconds
    }

    hasSignificantChange(newScreenshot) {
        if (!this.lastScreenshot) return true;
        
        // Simple hash comparison for performance
        const newHash = this.simpleHash(newScreenshot);
        const oldHash = this.simpleHash(this.lastScreenshot);
        
        return newHash !== oldHash;
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < Math.min(str.length, 1000); i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    async executeInstructions(instructions) {
        if (!this.isActive || !this.page) {
            throw new Error('Agent not initialized');
        }

        this.currentTask = instructions;
        this.emitToClient('task_started', { instructions });

        try {
            await this.intelligentExecution(instructions);
            this.emitToClient('task_completed', { instructions, success: true });
        } catch (error) {
            console.error('Task execution failed:', error);
            this.emitToClient('task_error', { instructions, error: error.message });
        }
    }

    async intelligentExecution(instructions) {
        const steps = this.parseInstructionsToSteps(instructions);
        
        for (const step of steps) {
            await this.executeStep(step);
            await this.page.waitForTimeout(3000); // Wait between steps
        }
    }

    parseInstructionsToSteps(instructions) {
        const steps = [];
        const lowerInstructions = instructions.toLowerCase();

        // Enhanced parsing for Google Jobs
        if (lowerInstructions.includes('google jobs') || lowerInstructions.includes('google.com/jobs')) {
            steps.push({ action: 'navigate', url: 'https://www.google.com/search?q=jobs+near+me&ibp=htl;jobs' });
        } else if (lowerInstructions.includes('indeed')) {
            steps.push({ action: 'navigate', url: 'https://www.indeed.com' });
        } else if (lowerInstructions.includes('linkedin')) {
            steps.push({ action: 'navigate', url: 'https://www.linkedin.com/jobs' });
        } else if (lowerInstructions.includes('glassdoor')) {
            steps.push({ action: 'navigate', url: 'https://www.glassdoor.com/Job/index.htm' });
        } else if (lowerInstructions.includes('ziprecruiter')) {
            steps.push({ action: 'navigate', url: 'https://www.ziprecruiter.com/jobs' });
        }

        if (lowerInstructions.includes('search')) {
            const jobTitle = this.extractJobTitle(instructions);
            const location = this.extractLocation(instructions);
            steps.push({ action: 'search', jobTitle, location });
        }

        if (lowerInstructions.includes('remote')) {
            steps.push({ action: 'filter_remote' });
        }

        if (lowerInstructions.includes('apply')) {
            steps.push({ action: 'apply_to_jobs' });
        }

        return steps;
    }

    async executeStep(step) {
        this.emitToClient('agent_action', { action: `Executing: ${step.action}`, step });

        switch (step.action) {
            case 'navigate':
                await this.navigateToJobSite(step.url);
                break;
            case 'search':
                await this.searchJobs(step.jobTitle, step.location);
                break;
            case 'filter_remote':
                await this.applyRemoteFilter();
                break;
            case 'apply_to_jobs':
                await this.applyToJobs();
                break;
        }
    }

    async navigateToJobSite(url) {
        this.emitToClient('agent_action', { action: 'Navigating to job site', url });

        try {
            // Navigate with better error handling
            await this.page.goto(url, {
                waitUntil: 'domcontentloaded', // Faster than networkidle2
                timeout: 30000
            });

            // Wait for page to be interactive
            await this.page.waitForTimeout(3000);

            // Handle potential Cloudflare challenges
            await this.handleCloudflareChallenge();

            const title = await this.page.title();
            this.emitToClient('agent_action', { action: `Successfully loaded: ${title}` });

            // Take screenshot after navigation
            const screenshot = await this.page.screenshot({ encoding: 'base64', type: 'jpeg', quality: 60 });
            this.emitToClient('navigation_complete', { url, title, screenshot });

        } catch (error) {
            this.emitToClient('agent_action', { action: `Navigation failed: ${error.message}` });
            throw error;
        }
    }

    async handleCloudflareChallenge() {
        try {
            // Check for Cloudflare challenge
            const challengeElements = await this.page.$$eval('*', els => 
                els.some(el => 
                    el.textContent && 
                    (el.textContent.includes('Checking your browser') || 
                     el.textContent.includes('Ray ID') ||
                     el.textContent.includes('Cloudflare'))
                )
            );

            if (challengeElements) {
                this.emitToClient('agent_action', { action: 'Detected Cloudflare challenge, waiting...' });
                
                // Wait longer for challenge to complete
                await this.page.waitForTimeout(10000);
                
                // Try to detect when challenge is complete
                await this.page.waitForFunction(() => {
                    return !document.body.textContent.includes('Checking your browser');
                }, { timeout: 30000 });
                
                this.emitToClient('agent_action', { action: 'Cloudflare challenge completed' });
            }
        } catch (error) {
            this.emitToClient('agent_action', { action: 'Cloudflare handling timeout, continuing...' });
        }
    }

    async searchJobs(jobTitle = 'software engineer', location = '') {
        this.emitToClient('agent_action', { action: 'Searching for jobs', jobTitle, location });

        const currentUrl = this.page.url();

        if (currentUrl.includes('indeed.com')) {
            await this.searchOnIndeed(jobTitle, location);
        } else if (currentUrl.includes('linkedin.com')) {
            await this.searchOnLinkedIn(jobTitle, location);
        } else if (currentUrl.includes('google.com')) {
            await this.searchOnGoogleJobs(jobTitle, location);
        }
    }

    async searchOnGoogleJobs(jobTitle, location) {
        try {
            // Wait for Google Jobs interface to load
            await this.page.waitForTimeout(3000);

            // Look for job search input
            const searchSelectors = [
                'input[aria-label*="Job title"]',
                'input[placeholder*="Job title"]',
                'input[jsname*="job"]',
                '.gws-plugins-horizon-jobs__tit-field input'
            ];

            for (const selector of searchSelectors) {
                try {
                    const searchInput = await this.page.waitForSelector(selector, { timeout: 3000 });
                    if (searchInput) {
                        await searchInput.click({ clickCount: 3 });
                        await searchInput.type(jobTitle);
                        await this.page.keyboard.press('Enter');
                        this.emitToClient('agent_action', { action: `Searched for: ${jobTitle} on Google Jobs` });
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }

            await this.page.waitForTimeout(3000);
            this.emitToClient('search_completed', { site: 'Google Jobs', jobTitle, location });
        } catch (error) {
            throw new Error(`Google Jobs search failed: ${error.message}`);
        }
    }

    async searchOnIndeed(jobTitle, location) {
        try {
            await this.page.waitForTimeout(2000);

            // Enhanced selectors for Indeed
            const jobInputSelectors = [
                'input[name="q"]',
                'input[id="text-input-what"]',
                'input[aria-label*="job title"]',
                'input[placeholder*="job title"]',
                '#what'
            ];

            let jobInput = null;
            for (const selector of jobInputSelectors) {
                try {
                    jobInput = await this.page.waitForSelector(selector, { timeout: 3000 });
                    if (jobInput) {
                        await jobInput.click({ clickCount: 3 });
                        await jobInput.type(jobTitle, { delay: 100 });
                        this.emitToClient('agent_action', { action: `Entered job title: ${jobTitle}` });
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }

            // Location input
            if (location) {
                const locationSelectors = [
                    'input[name="l"]',
                    'input[id="text-input-where"]',
                    'input[aria-label*="location"]',
                    'input[placeholder*="location"]',
                    '#where'
                ];

                for (const selector of locationSelectors) {
                    try {
                        const locationInput = await this.page.waitForSelector(selector, { timeout: 2000 });
                        if (locationInput) {
                            await locationInput.click({ clickCount: 3 });
                            await locationInput.type(location, { delay: 100 });
                            this.emitToClient('agent_action', { action: `Entered location: ${location}` });
                            break;
                        }
                    } catch (e) {
                        continue;
                    }
                }
            }

            // Search button
            const searchSelectors = [
                'button[type="submit"]',
                'button:has-text("Find jobs")',
                'button[aria-label*="search"]',
                '.yosegi-InlineWhatWhere-primaryButton',
                'input[type="submit"]'
            ];

            for (const selector of searchSelectors) {
                try {
                    const searchButton = await this.page.waitForSelector(selector, { timeout: 2000 });
                    if (searchButton) {
                        await searchButton.click();
                        this.emitToClient('agent_action', { action: 'Clicked search button' });
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }

            await this.page.waitForTimeout(5000);
            this.emitToClient('search_completed', { site: 'Indeed', jobTitle, location });

        } catch (error) {
            throw new Error(`Indeed search failed: ${error.message}`);
        }
    }

    async searchOnLinkedIn(jobTitle, location) {
        try {
            const searchSelectors = [
                'input[placeholder*="Search jobs"]',
                'input[aria-label*="Search jobs"]',
                '.jobs-search-box__text-input',
                'input[id*="job-search"]'
            ];

            for (const selector of searchSelectors) {
                try {
                    const searchInput = await this.page.waitForSelector(selector, { timeout: 3000 });
                    if (searchInput) {
                        await searchInput.click({ clickCount: 3 });
                        await searchInput.type(jobTitle);
                        await this.page.keyboard.press('Enter');
                        this.emitToClient('agent_action', { action: `Searched for: ${jobTitle}` });
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }

            await this.page.waitForTimeout(3000);
            this.emitToClient('search_completed', { site: 'LinkedIn', jobTitle, location });
        } catch (error) {
            throw new Error(`LinkedIn search failed: ${error.message}`);
        }
    }

    // User interaction methods
    async handleUserClick(coordinates) {
        if (!this.page) return;
        
        try {
            await this.page.mouse.click(coordinates.x, coordinates.y);
            this.emitToClient('agent_action', { action: `Clicked at ${coordinates.x}, ${coordinates.y}` });
        } catch (error) {
            this.emitToClient('agent_error', { error: `Click failed: ${error.message}` });
        }
    }

    async handleUserType(text) {
        if (!this.page) return;
        
        try {
            await this.page.keyboard.type(text);
            this.emitToClient('agent_action', { action: `Typed: ${text}` });
        } catch (error) {
            this.emitToClient('agent_error', { error: `Type failed: ${error.message}` });
        }
    }

    async handleUserScroll(direction) {
        if (!this.page) return;
        
        try {
            await this.page.evaluate((dir) => {
                window.scrollBy(0, dir === 'down' ? 300 : -300);
            }, direction);
            this.emitToClient('agent_action', { action: `Scrolled ${direction}` });
        } catch (error) {
            this.emitToClient('agent_error', { error: `Scroll failed: ${error.message}` });
        }
    }

    extractJobTitle(instructions) {
        const patterns = [
            /(?:search for|find|looking for)\s+([^,\n]+?)(?:\s+jobs?|$|,)/i,
            /job title[:\s]+([^,\n]+)/i,
            /position[:\s]+([^,\n]+)/i,
            /"([^"]+)"/i // Quoted job titles
        ];
        
        for (const pattern of patterns) {
            const match = instructions.match(pattern);
            if (match) return match[1].trim();
        }
        
        return 'software engineer';
    }

    extractLocation(instructions) {
        const patterns = [
            /(?:in|at|near|location)\s+([^,\n]+?)(?:,|$)/i,
            /city[:\s]+([^,\n]+)/i
        ];
        
        for (const pattern of patterns) {
            const match = instructions.match(pattern);
            if (match) return match[1].trim();
        }
        
        return '';
    }

    emitToClient(event, data) {
        io.to(this.socketId).emit(event, data);
    }

    async cleanup() {
        if (this.screenshotInterval) {
            clearInterval(this.screenshotInterval);
        }
        if (this.browser) {
            await this.browser.close();
        }
        this.isActive = false;
    }

    // Additional utility methods
    async applyRemoteFilter() {
        this.emitToClient('agent_action', { action: 'Applying remote work filter' });
        // Implementation for remote filter
        await this.page.waitForTimeout(2000);
        this.emitToClient('filter_applied', { filter: 'remote' });
    }

    async applyToJobs() {
        this.emitToClient('agent_action', { action: 'Starting job application process' });
        // Implementation for job application
        await this.page.waitForTimeout(2000);
        this.emitToClient('applications_completed', { count: 0 });
    }
}

// Socket.IO connection handling (same as before)
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('initialize_agent', async (data) => {
        const sessionId = uuidv4();
        const agent = new JobAgent(sessionId, socket.id);

        const initialized = await agent.initialize();
        if (initialized) {
            activeSessions.set(sessionId, agent);
            socket.emit('agent_initialized', { sessionId });
        }
    });

    socket.on('navigate_to_site', async (data) => {
        const { sessionId, url } = data;
        const agent = activeSessions.get(sessionId);

        if (agent) {
            try {
                await agent.navigateToJobSite(url);
            } catch (error) {
                socket.emit('agent_error', { error: `Navigation failed: ${error.message}` });
            }
        } else {
            socket.emit('agent_error', { error: 'Agent session not found' });
        }
    });

    socket.on('execute_instructions', async (data) => {
        const { sessionId, instructions } = data;
        const agent = activeSessions.get(sessionId);

        if (agent) {
            await agent.executeInstructions(instructions);
        } else {
            socket.emit('agent_error', { error: 'Agent session not found' });
        }
    });

    socket.on('user_click', async (data) => {
        const { sessionId, coordinates } = data;
        const agent = activeSessions.get(sessionId);
        if (agent) {
            await agent.handleUserClick(coordinates);
        }
    });

    socket.on('user_type', async (data) => {
        const { sessionId, text } = data;
        const agent = activeSessions.get(sessionId);
        if (agent) {
            await agent.handleUserType(text);
        }
    });

    socket.on('user_scroll', async (data) => {
        const { sessionId, direction } = data;
        const agent = activeSessions.get(sessionId);
        if (agent) {
            await agent.handleUserScroll(direction);
        }
    });

    socket.on('stop_agent', async (data) => {
        const { sessionId } = data;
        const agent = activeSessions.get(sessionId);

        if (agent) {
            await agent.cleanup();
            activeSessions.delete(sessionId);
            socket.emit('agent_stopped', { sessionId });
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected:', socket.id);

        for (const [sessionId, agent] of activeSessions.entries()) {
            if (agent.socketId === socket.id) {
                await agent.cleanup();
                activeSessions.delete(sessionId);
            }
        }
    });
});

// REST API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', activeSessions: activeSessions.size });
});

app.post('/api/agent/quick-action', async (req, res) => {
    const { action, sessionId } = req.body;
    const agent = activeSessions.get(sessionId);

    if (!agent) {
        return res.status(404).json({ error: 'Agent session not found' });
    }

    try {
        let instructions = '';
        switch (action) {
            case 'search_swe':
                instructions = 'Search for software engineer jobs on Indeed';
                break;
            case 'filter_remote':
                instructions = 'Apply remote work filter';
                break;
            case 'auto_apply':
                instructions = 'Apply to the first 3 matching jobs';
                break;
            default:
                instructions = 'Invalid action';
        }

        await agent.executeInstructions(instructions);
        res.json({ success: true, message: 'Quick action executed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});