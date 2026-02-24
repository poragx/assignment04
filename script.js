// Initial Job Data (Minimum 8 jobs, no lorem ipsum)
let jobs = [
    { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "none" },
    { id: 2, companyName: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Design and implement responsive websites. Proficiency in HTML, CSS, JavaScript, and modern design tools required.", status: "none" },
    { id: 3, companyName: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $165,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "none" },
    { id: 4, companyName: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status: "none" },
    { id: 5, companyName: "Innovation Labs", position: "UI/UX Engineer", location: "Austin, TX", type: "Full-time", salary: "$110,000 - $150,000", description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.", status: "none" },
    { id: 6, companyName: "Enterprise Systems", position: "Full Stack Engineer", location: "Chicago, IL", type: "Full-time", salary: "$135,000 - $180,000", description: "Architect and develop enterprise-level web applications. Must have experience with Node.js, Express, React, and PostgreSQL.", status: "none" },
    { id: 7, companyName: "SecurityPro", position: "Cybersecurity Analyst", location: "New York, NY", type: "Contract", salary: "$90,000 - $130,000", description: "Monitor network traffic for security incidents and investigate potential breaches. Provide recommendations for strengthening system defenses.", status: "none" },
    { id: 8, companyName: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco, CA", type: "Full-time", salary: "$150,000 - $200,000", description: "Lead frontend architecture using React and TypeScript. Mentor junior developers and establish engineering best practices.", status: "none" }
];

let currentTab = 'all';

// DOM Elements
const jobListContainer = document.getElementById('job-list');
const tabButtons = document.querySelectorAll('.tab-btn');
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const tabCountEl = document.getElementById('tab-count');
const emptyStateTemplate = document.getElementById('empty-state-template');

// Initialize the app
function init() {
    setupEventListeners();
    updateUI();
}

// Set up Event Delegation for buttons inside the job list & tab clicks
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentTab = e.target.getAttribute('data-tab');
            updateTabStyles();
            updateUI();
        });
    });

    // Event Delegation for job action buttons (Interview, Rejected, Delete)
    jobListContainer.addEventListener('click', (e) => {
        const jobId = parseInt(e.target.getAttribute('data-id'));
        if (!jobId) return;

        if (e.target.classList.contains('btn-interview')) {
            toggleStatus(jobId, 'interview');
        } else if (e.target.classList.contains('btn-rejected')) {
            toggleStatus(jobId, 'rejected');
        } else if (e.target.classList.contains('btn-delete')) {
            deleteJob(jobId);
        }
    });
}

// Logic to toggle status
function toggleStatus(id, newStatus) {
    const jobIndex = jobs.findIndex(j => j.id === id);
    if (jobIndex !== -1) {
        // If clicking the same status, toggle back to 'none', otherwise set new status
        jobs[jobIndex].status = jobs[jobIndex].status === newStatus ? 'none' : newStatus;
        updateUI();
    }
}

// Logic to delete a job
function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    updateUI();
}

// Update the entire UI based on state
function updateUI() {
    updateDashboardCounts();
    renderJobs();
}

// Calculate and update the top dashboard numbers
function updateDashboardCounts() {
    const total = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'interview').length;
    const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

    totalCountEl.textContent = total;
    interviewCountEl.textContent = interviewCount;
    rejectedCountEl.textContent = rejectedCount;
}

// Update active states for the tab buttons
function updateTabStyles() {
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === currentTab) {
            btn.classList.remove('text-gray-500', 'hover:bg-gray-200');
            btn.classList.add('bg-blue-500', 'text-white');
        } else {
            btn.classList.remove('bg-blue-500', 'text-white');
            btn.classList.add('text-gray-500', 'hover:bg-gray-200');
        }
    });
}

// Render the job cards or empty state
function renderJobs() {
    jobListContainer.innerHTML = ''; // Clear current view

    // Filter jobs based on the active tab
    const filteredJobs = jobs.filter(job => {
        if (currentTab === 'all') return true;
        return job.status === currentTab;
    });

    // Update the section count display
    tabCountEl.textContent = filteredJobs.length;

    // Show empty state if no jobs match
    if (filteredJobs.length === 0) {
        const emptyStateNode = emptyStateTemplate.content.cloneNode(true);
        jobListContainer.appendChild(emptyStateNode);
        return;
    }

    // Render cards
    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col relative group transition-all hover:shadow-md";
        
        // Status Badge Logic
        let statusBadge = '<span class="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded mb-3 w-max">NOT APPLIED</span>';
        if (job.status === 'interview') {
            statusBadge = '<span class="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded mb-3 w-max">INTERVIEWING</span>';
        } else if (job.status === 'rejected') {
            statusBadge = '<span class="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded mb-3 w-max">REJECTED</span>';
        }

        // Button active states
        const interviewBtnActive = job.status === 'interview' ? 'bg-green-500 text-white border-green-500' : 'text-green-600 border-green-200 hover:bg-green-50';
        const rejectedBtnActive = job.status === 'rejected' ? 'bg-red-500 text-white border-red-500' : 'text-red-500 border-red-200 hover:bg-red-50';

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-lg font-bold text-slate-800">${job.companyName}</h3>
                    <p class="text-gray-500 text-sm mb-2">${job.position}</p>
                </div>
                <button data-id="${job.id}" class="btn-delete text-gray-400 hover:text-red-500 transition-colors" title="Delete Job">
                    <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
            
            <p class="text-xs text-gray-500 mb-4 font-medium tracking-wide">
                ${job.location} &nbsp;&bull;&nbsp; ${job.type} &nbsp;&bull;&nbsp; ${job.salary}
            </p>
            
            ${statusBadge}
            
            <p class="text-sm text-gray-700 mb-6 leading-relaxed">${job.description}</p>
            
            <div class="flex gap-3 mt-auto">
                <button data-id="${job.id}" class="btn-interview px-4 py-1.5 border rounded text-sm font-semibold transition-colors ${interviewBtnActive}">
                    INTERVIEW
                </button>
                <button data-id="${job.id}" class="btn-rejected px-4 py-1.5 border rounded text-sm font-semibold transition-colors ${rejectedBtnActive}">
                    REJECTED
                </button>
            </div>
        `;
        jobListContainer.appendChild(card);
    });
}

// Start the app
init();