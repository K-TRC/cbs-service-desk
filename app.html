// CBS Service HUB - Core Application Logic

// --- APPLICATION STATE ---
const state = {
    currentUser: null,
    tickets: [],
    stores: [],
    currentView: 'login',
    tempImages: [],
    activeTheme: 'light',
    
    // Filters
    filters: {
        search: '',
        bu: 'ALL',
        category: 'ALL',
        status: 'ALL',
        dateStart: '',
        dateEnd: ''
    }
};

// --- MOCK DATA ---
// Beautiful, realistic Thai mock tickets injected if the database is brand new.
const MOCK_TICKETS = [
    {
        id: "TKT-2026-0001",
        date: "2026-05-24T09:30:00.000Z",
        bu: "PWB",
        branchCode: "00003",
        branchName: "เซ็นทรัลลาดพร้าว",
        reporterName: "สมชาย มีความสุข",
        reporterPhone: "081-234-5678",
        reporterPosition: "Store Manager",
        category: "Air Conditioning",
        description: "แอร์ห้องเซิร์ฟเวอร์มีน้ำหยดตลอดเวลา และอุณหภูมิเริ่มสูงขึ้น (ตอนนี้ 27 องศา) เกรงว่าเซิร์ฟเวอร์จะร้อนเกินไปและระบบ POS ดับ ขอช่างเข้ามาดูแลด่วนครับ",
        status: "Progress",
        images: []
    },
    {
        id: "TKT-2026-0002",
        date: "2026-05-25T14:15:00.000Z",
        bu: "B2S",
        branchCode: "00012",
        branchName: "เซ็นทรัลปิ่นเกล้า",
        reporterName: "วิภาภรณ์ รักษ์ดี",
        reporterPhone: "089-876-5432",
        reporterPosition: "Supervisor",
        category: "Lighting",
        description: "ไฟส่องสว่างบริเวณโซนหนังสือนิยายดับไป 3 ดวง ทำให้มุมนั้นมืด ลูกค้ามองหาหนังสือไม่สะดวก รบกวนช่วยส่งช่างมาเปลี่ยนหลอดไฟให้ทีนะคะ",
        status: "Pending",
        images: []
    },
    {
        id: "TKT-2026-0003",
        date: "2026-05-26T10:00:00.000Z",
        bu: "OFM",
        branchCode: "00045",
        branchName: "ฟิวเจอร์พาร์ครังสิต",
        reporterName: "ณัฐพงษ์ แก้วสะอาด",
        reporterPhone: "086-555-1234",
        reporterPosition: "Technician",
        category: "Restroom",
        description: "ท่อน้ำทิ้งซิงก์ล้างจานในห้องพักพนักงานอุดตัน น้ำระบายไม่ได้และมีกลิ่นเหม็นอับรบกวนภายนอก ได้ลองใช้โซดาไฟแล้วยังไม่หายตันครับ",
        status: "Completed",
        images: []
    }
];

// --- VIEW ROUTER ---
function switchView(viewName) {
    state.currentView = viewName;
    
    // Hide all views
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
        targetView.classList.add('fade-in');
        setTimeout(() => targetView.classList.remove('fade-in'), 300);
    }
    
    // Update Header visibility and context
    updateHeaderUI();

    // Contextual initializations
    if (viewName === 'dashboard') {
        renderDashboard();
    } else if (viewName === 'new_ticket') {
        resetTicketForm();
    } else if (viewName === 'admin') {
        renderAdminDashboard();
        renderAdminCharts();
    }
}

function updateHeaderUI() {
    const header = document.querySelector('header');
    const userBadge = document.getElementById('header-user-badge');
    const btnLogout = document.getElementById('header-logout');
    const btnBack = document.getElementById('header-back');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const appWrapper = document.getElementById('app-container-wrapper');
    const sidebar = document.getElementById('sidebar');
    
    if (state.currentView === 'login') {
        header.style.display = 'none';
        appWrapper.classList.remove('has-sidebar');
        if (sidebar) sidebar.style.display = 'none';
    } else {
        header.style.display = 'flex';
        appWrapper.classList.add('has-sidebar');
        if (sidebar) sidebar.style.display = 'flex';
        if (sidebarToggle) sidebarToggle.style.display = 'flex';
        
        // Setup User Info
        if (state.currentUser) {
            userBadge.style.display = 'flex';
            document.getElementById('header-email').textContent = state.currentUser.email;
        } else {
            userBadge.style.display = 'none';
        }
        
        // Show Back button on Dashboard, Ticket Form, and Admin; Logout only on Service Selection
        if (state.currentView === 'service') {
            btnBack.style.display = 'none';
            btnLogout.style.display = 'inline-flex';
        } else {
            btnBack.style.display = 'inline-flex';
            btnLogout.style.display = 'inline-flex';
        }
        
        // Update sidebar active link
        document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
        if (state.currentView === 'service') {
            document.getElementById('nav-home')?.classList.add('active');
        } else if (state.currentView === 'dashboard' || state.currentView === 'new_ticket') {
            document.getElementById('nav-maintenance')?.classList.add('active');
        } else if (state.currentView === 'admin') {
            document.getElementById('nav-admin')?.classList.add('active');
        }
    }
}

// --- DATABASE OPERATIONS ---
async function loadDatabase() {
    // 1. Load User session (client-side only)
    const savedUser = localStorage.getItem('cbs_service_hub_user');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
    }

    // 2. Load Tickets — Google Drive via Apps Script, or localStorage fallback
    try {
        if (typeof GasApi !== 'undefined' && GasApi.isGasRuntime()) {
            state.tickets = await GasApi.getTickets();
        } else {
            const savedTickets = localStorage.getItem('cbs_service_hub_tickets');
            if (savedTickets) {
                state.tickets = JSON.parse(savedTickets);
            } else {
                state.tickets = [...MOCK_TICKETS];
                localStorage.setItem('cbs_service_hub_tickets', JSON.stringify(state.tickets));
            }
        }
    } catch (err) {
        console.error('Failed to load tickets:', err);
        state.tickets = [...MOCK_TICKETS];
    }

    // 3. Load Theme
    const savedTheme = localStorage.getItem('cbs_theme') || 'light';
    setTheme(savedTheme);

    // 4. Load store master data from stores.js
    if (typeof STORES_DATABASE !== 'undefined') {
        state.stores = STORES_DATABASE;
        console.log(`Loaded ${state.stores.length} stores from stores.js`);
    } else {
        console.warn('STORES_DATABASE is undefined. Autocomplete will be disabled.');
    }
}

async function saveTickets() {
    if (typeof GasApi !== 'undefined' && GasApi.isGasRuntime()) {
        try {
            await GasApi.saveTickets(state.tickets);
        } catch (err) {
            console.error('Failed to save tickets to server:', err);
            alert('Cannot save data to server (บันทึกข้อมูลไม่สำเร็จ): ' + err.message);
        }
        return;
    }
    localStorage.setItem('cbs_service_hub_tickets', JSON.stringify(state.tickets));
}

// --- THEME MANAGEMENT ---
function setTheme(theme) {
    state.activeTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cbs_theme', theme);
    
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.innerHTML = theme === 'dark' 
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
}

function toggleTheme() {
    setTheme(state.activeTheme === 'light' ? 'dark' : 'light');
    // Re-render charts with updated theme colors
    if (state.currentView === 'admin') {
        renderAdminCharts();
    }
}

// --- LOGIN PORTAL ---
function handleLogin(e) {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    // Save current user session
    state.currentUser = {
        email: email,
        name: email.split('@')[0],
        role: "Reporter"
    };
    localStorage.setItem('cbs_service_hub_user', JSON.stringify(state.currentUser));
    
    // Switch to service selection screen
    switchView('service');
}

function handleLogout() {
    state.currentUser = null;
    localStorage.removeItem('cbs_service_hub_user');
    switchView('login');
    document.getElementById('login-email').value = '';
}

// --- DASHBOARD CONTROLLER ---
function getFilteredTickets() {
    return state.tickets.filter(ticket => {
        // 1. Search Query
        const matchQuery = state.filters.search === '' || 
            ticket.id.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            ticket.branchCode.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            ticket.branchName.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            ticket.reporterName.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            ticket.description.toLowerCase().includes(state.filters.search.toLowerCase());
            
        // 2. BU Filter
        const matchBU = state.filters.bu === 'ALL' || ticket.bu === state.filters.bu;
        
        // 3. Category Filter
        const matchCategory = state.filters.category === 'ALL' || ticket.category === state.filters.category;
        
        // 4. Status Filter
        const matchStatus = state.filters.status === 'ALL' || ticket.status === state.filters.status;
        
        // 5. Date Filter
        let matchDate = true;
        if (state.filters.dateStart || state.filters.dateEnd) {
            const tDate = new Date(ticket.date);
            if (state.filters.dateStart) {
                const sDate = new Date(state.filters.dateStart);
                sDate.setHours(0,0,0,0);
                if (tDate < sDate) matchDate = false;
            }
            if (state.filters.dateEnd) {
                const eDate = new Date(state.filters.dateEnd);
                eDate.setHours(23,59,59,999);
                if (tDate > eDate) matchDate = false;
            }
        }
        
        return matchQuery && matchBU && matchCategory && matchStatus && matchDate;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
}

function renderDashboard() {
    // 1. Render Metrics
    const filtered = getFilteredTickets();
    const allTickets = state.tickets;
    
    const total = allTickets.length;
    const pending = allTickets.filter(t => t.status === 'Pending').length;
    const progress = allTickets.filter(t => t.status === 'Progress').length;
    const completed = allTickets.filter(t => t.status === 'Completed').length;
    const reject = allTickets.filter(t => t.status === 'Reject').length;
    
    document.getElementById('metric-total-val').textContent = total;
    document.getElementById('metric-pending-val').textContent = pending;
    document.getElementById('metric-progress-val').textContent = progress;
    document.getElementById('metric-completed-val').textContent = completed;
    const rejectVal = document.getElementById('metric-reject-val');
    if (rejectVal) rejectVal.textContent = reject;
    
    // 2. Render Search/Filter Bar tags active state
    document.querySelectorAll('.filter-tag').forEach(tag => {
        const bu = tag.getAttribute('data-bu');
        if (bu === state.filters.bu) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });
    
    // 3. Render Logs Table Body
    const tbody = document.getElementById('logs-table-body');
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <div class="empty-icon">🔍</div>
                        <div class="empty-title">No tickets found (ไม่พบข้อมูล)</div>
                        <div>Try adjusting filters or search keywords (ลองปรับตัวกรองใหม่)</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    filtered.forEach(t => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = () => showTicketDetail(t.id);
        
        const dateStr = new Date(t.date).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let statusLabel = t.status;
        if (t.status === 'Progress') statusLabel = 'On Progress';
        if (t.status === 'Reject') statusLabel = 'Reject';
        
        tr.innerHTML = `
            <td style="font-weight: 700;">${t.id}</td>
            <td><span class="table-bu-badge table-bu-${t.bu.toLowerCase()}">${t.bu}</span></td>
            <td><span style="font-weight: 600;">${t.branchCode}</span> - ${t.branchName}</td>
            <td>${t.reporterName}</td>
            <td>${getThaiCategoryName(t.category)}</td>
            <td>${dateStr}</td>
            <td><span class="status-badge status-${t.status.toLowerCase()}">${statusLabel}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function getThaiCategoryName(cat) {
    const cats = {
        'Air Conditioning': 'ระบบปรับอากาศ',
        'MDB': 'Main Distribution Board',
        'Lighting': 'งานระบบแสงสว่าง',
        'Communication': 'งานระบบสื่อสาร',
        'Digital Signage': 'Digital Signage',
        'Power Receptacle': 'Power Receptacle',
        'Flooring': 'งานเปลี่ยนวัสดุพื้น',
        'Ceiling Wall': 'งานซ่อมแซมฝ้าเพดานและผนัง',
        'Door': 'งานซ่อมแซมประตู',
        'Restroom': 'งานซ่อมแซมห้องน้ำ',
        'Fixture': 'งานซ่อม Fixture',
        'Graphics': 'งานซ่อม Graphics'
    };
    return cats[cat] || cat;
}

// Set filters from inputs
function handleSearch(e) {
    state.filters.search = e.target.value;
    renderDashboard();
}

function handleBUFilter(bu) {
    state.filters.bu = bu;
    renderDashboard();
}

function handleCategoryFilter(e) {
    state.filters.category = e.target.value;
    renderDashboard();
}

function handleStatusFilter(e) {
    state.filters.status = e.target.value;
    renderDashboard();
}

// --- TICKET DETAIL MODAL ---
function showTicketDetail(ticketId) {
    const ticket = state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    document.getElementById('modal-tkt-id').textContent = ticket.id;
    document.getElementById('detail-bu').textContent = ticket.bu;
    document.getElementById('detail-branch-code').textContent = ticket.branchCode;
    document.getElementById('detail-branch-name').textContent = ticket.branchName;
    document.getElementById('detail-reporter-name').textContent = ticket.reporterName;
    document.getElementById('detail-reporter-phone').textContent = ticket.reporterPhone;
    document.getElementById('detail-reporter-position').textContent = ticket.reporterPosition || '-';
    document.getElementById('detail-category').textContent = getThaiCategoryName(ticket.category);
    
    const dateStr = new Date(ticket.date).toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('detail-date').textContent = dateStr;
    
    let statusLabel = ticket.status;
    if (ticket.status === 'Progress') statusLabel = 'On Progress';
    const statusBadge = document.getElementById('detail-status');
    statusBadge.textContent = statusLabel;
    statusBadge.className = `status-badge status-${ticket.status.toLowerCase()}`;
    
    // Description
    document.getElementById('detail-desc').textContent = ticket.description;
    
    // Images
    const imgContainer = document.getElementById('detail-images-container');
    imgContainer.innerHTML = '';
    if (ticket.images && ticket.images.length > 0) {
        ticket.images.forEach((imgBase64, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'detail-img-wrapper';
            wrapper.onclick = () => openImageWindow(imgBase64);
            wrapper.innerHTML = `<img src="${imgBase64}" alt="Attachment ${index+1}">`;
            imgContainer.appendChild(wrapper);
        });
    } else {
        imgContainer.innerHTML = `<span style="color: var(--text-muted); font-style: italic; font-size: 13px;">ไม่มีรูปภาพแนบ</span>`;
    }
    
    // Setup Admin Action status switcher
    const statusSelector = document.getElementById('modal-status-select');
    statusSelector.value = ticket.status;
    statusSelector.onchange = async (e) => {
        ticket.status = e.target.value;
        await saveTickets();
        renderDashboard();
        // Update badge dynamically inside modal
        const newStatus = e.target.value;
        let newLabel = newStatus;
        if (newStatus === 'Progress') newLabel = 'On Progress';
        statusBadge.textContent = newLabel;
        statusBadge.className = `status-badge status-${newStatus.toLowerCase()}`;
    };
    
    // Hide admin action for normal users
    const adminWrapper = document.getElementById('admin-status-switcher-wrapper');
    if (adminWrapper) {
        adminWrapper.style.display = state.isAdmin ? 'flex' : 'none';
    }
    
    // Show overlay
    const overlay = document.getElementById('detail-modal');
    overlay.classList.add('active');
}

function closeTicketDetail() {
    const overlay = document.getElementById('detail-modal');
    overlay.classList.remove('active');
}

function openImageWindow(base64) {
    const w = window.open();
    w.document.write(`<img src="${base64}" style="max-width:100%; height:auto; display:block; margin:auto;" />`);
    w.document.title = "Maintenance Ticket Attachment";
}

// --- TICKET FORM VIEW ---
function resetTicketForm() {
    const form = document.getElementById('maintenance-form');
    form.reset();
    
    // Reset BU Theme Injector
    const container = document.getElementById('app-container-wrapper');
    container.className = 'app-container';
    // Reset inputs & dynamic contents
    const branchInput = document.getElementById('form-branch');
    branchInput.value = '';
    branchInput.disabled = false;
    
    document.getElementById('form-branch-name-label').textContent = '';
    document.getElementById('form-branch-code').value = '';
    document.getElementById('form-branch-address').style.display = 'none';
    document.getElementById('form-branch-address-text').textContent = '';
    
    // Clear dynamic images
    state.tempImages = [];
    renderImagePreviews();
}

function handleBUSelect(bu) {
    // 1. Change UI dynamic theme variables!
    const container = document.getElementById('app-container-wrapper');
    container.className = `app-container theme-${bu.toLowerCase()}`;
    
    // 2. Reset dependent fields
    document.getElementById('form-branch-address').style.display = 'none';
    document.getElementById('form-branch-code').value = '';
    document.getElementById('form-branch-name-label').textContent = '';
    
    // Attempt lookup if branch is already typed
    handleBranchInput();
}

function handleBranchInput() {
    const codeInput = document.getElementById('form-branch');
    const code = codeInput ? codeInput.value.trim() : '';
    const activeBU = document.getElementById('form-bu').value;
    
    if (!activeBU || !code) {
        document.getElementById('form-branch-address').style.display = 'none';
        document.getElementById('form-branch-name-label').textContent = '';
        return;
    }
    
    const store = state.stores.find(s => s.bu === activeBU && (s.code === code || s.code.includes(code)));
    
    if (store && store.code === code) {
        document.getElementById('form-branch-code').value = store.code;
        document.getElementById('form-branch-name-label').textContent = store.nameTh;
        
        // Populate telephone if available and empty
        const phoneInput = document.getElementById('form-reporter-phone');
        if (store.tel && store.tel !== "0" && !phoneInput.value) {
            phoneInput.value = store.tel;
        }
        
        // Show address
        const addressBox = document.getElementById('form-branch-address');
        const addressText = document.getElementById('form-branch-address-text');
        if (store.address && store.address !== "0") {
            addressText.textContent = store.address;
            addressBox.style.display = 'flex';
        } else {
            addressBox.style.display = 'none';
        }
    } else {
        document.getElementById('form-branch-name-label').textContent = 'Unknown Branch';
        document.getElementById('form-branch-address').style.display = 'none';
    }
}

// --- IMAGE UPLOAD & CANVAS COMPRESSOR ---
async function handleImageFilesSelect(e) {
    const files = e.target.files || e.dataTransfer.files;
    if (!files) return;
    
    // Limit to 3 images max per ticket for storage health
    if (state.tempImages.length + files.length > 3) {
        alert("Maximum 3 images per ticket (แนบได้สูงสุด 3 รูป)");
        return;
    }
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.match('image.*')) continue;
        
        try {
            const compressedBase64 = await compressImage(file);
            state.tempImages.push(compressedBase64);
            renderImagePreviews();
        } catch (err) {
            console.error("Image compression error", err);
        }
    }
}

function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // Maximum dimensions for photo attachment to optimize Base64 footprint
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress to 75% quality JPEG
                const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
                resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function renderImagePreviews() {
    const grid = document.getElementById('form-previews-grid');
    grid.innerHTML = '';
    
    state.tempImages.forEach((imgBase64, index) => {
        const card = document.createElement('div');
        card.className = 'preview-card';
        card.innerHTML = `
            <img src="${imgBase64}" alt="Preview ${index+1}">
            <button type="button" class="preview-delete" onclick="removeTempImage(${index})">✕</button>
        `;
        grid.appendChild(card);
    });
}

function removeTempImage(index) {
    state.tempImages.splice(index, 1);
    renderImagePreviews();
}

// --- FORM SUBMITTER ---
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // 1. Validation
    const bu = document.getElementById('form-bu').value;
    if (!bu) {
        alert("Please select a Business Unit (กรุณาเลือก BU)");
        return;
    }
    
    const branchCode = document.getElementById('form-branch').value;
    if (!branchCode) {
        alert("Please select a branch (กรุณาเลือกสาขา)");
        return;
    }
    
    const branchName = document.getElementById('form-branch-name-label').textContent;
    
    const reporterName = document.getElementById('form-reporter-name').value.trim();
    const reporterPhone = document.getElementById('form-reporter-phone').value.trim();
    const reporterPosition = document.getElementById('form-reporter-position').value.trim();
    
    if (!reporterName || !reporterPhone) {
        alert("Please fill in reporter name and phone (กรุณากรอกชื่อและเบอร์ผู้แจ้ง)");
        return;
    }
    
    const category = document.getElementById('form-category').value;
    const description = document.getElementById('form-desc').value.trim();
    
    if (!description) {
        alert("Please describe the issue (กรุณากรอกรายละเอียดปัญหา)");
        return;
    }
    
    // 2. Generate unique Ticket ID: TKT-YYYY-XXXX
    let ticketId;
    try {
        if (typeof GasApi !== 'undefined' && GasApi.isGasRuntime()) {
            ticketId = await GasApi.getNextTicketId();
        } else {
            const year = new Date().getFullYear();
            const ticketIndex = state.tickets.length + 1;
            ticketId = `TKT-${year}-${String(ticketIndex).padStart(4, '0')}`;
        }
    } catch (err) {
        alert('Cannot generate ticket ID (สร้างเลขที่ใบงานไม่สำเร็จ): ' + err.message);
        return;
    }
    
    // 3. Assemble Ticket Object
    const newTicket = {
        id: ticketId,
        date: new Date().toISOString(),
        bu: bu,
        branchCode: branchCode,
        branchName: branchName,
        reporterName: reporterName,
        reporterEmail: state.currentUser ? state.currentUser.email : '-',
        reporterPhone: reporterPhone,
        reporterPosition: reporterPosition,
        category: category,
        description: description,
        status: 'Pending',
        images: [...state.tempImages]
    };
    
    // 4. Save to Database
    state.tickets.push(newTicket);
    await saveTickets();
    
    // 5. Trigger Success Overlay Animation
    const successOverlay = document.getElementById('success-overlay');
    successOverlay.classList.add('active');
    
    // Play checkmark bounce animation and return to dashboard
    setTimeout(() => {
        successOverlay.classList.remove('active');
        switchView('dashboard');
    }, 2000);
}

// --- SHEETJS EXCEL EXPORTER ---
function exportToExcel() {
    const filtered = getFilteredTickets();
    if (filtered.length === 0) {
        alert("No data to export (ไม่มีข้อมูลส่งออก)");
        return;
    }
    
    // 1. Map data rows to descriptive Thai columns
    const exportData = filtered.map(t => {
        const dateStr = new Date(t.date).toLocaleString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusLabel = t.status === 'Pending' ? 'Pending' : t.status === 'Progress' ? 'In Progress' : 'Completed';
        
        return {
            "Ticket No.": t.id,
            "Date": dateStr,
            "BU": t.bu,
            "Branch Code": t.branchCode,
            "Branch Name": t.branchName,
            "Reporter": t.reporterName,
            "Phone": t.reporterPhone,
            "Position": t.reporterPosition || '-',
            "Category": getThaiCategoryName(t.category),
            "Description": t.description,
            "Status": statusLabel,
            "Attachments": t.images && t.images.length > 0 ? `Yes (${t.images.length})` : "No"
        };
    });
    
    // 2. Build workbook using SheetJS
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // 3. Set custom column widths for immediate beautiful rendering in Microsoft Excel
    const wscols = [
        { wch: 18 }, // Ticket ID
        { wch: 22 }, // Date
        { wch: 15 }, // BU
        { wch: 12 }, // Branch Code
        { wch: 25 }, // Branch Name
        { wch: 20 }, // Reporter Name
        { wch: 16 }, // Reporter Phone
        { wch: 15 }, // Position
        { wch: 25 }, // Category
        { wch: 50 }, // Description
        { wch: 16 }, // Status
        { wch: 12 }  // Has Images
    ];
    ws['!cols'] = wscols;
    
    XLSX.utils.book_append_sheet(wb, ws, "CBS Maintenance Logs");
    
    // 4. Download file
    const dateFormatted = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const filename = `CBS_Service_Hub_Export_${dateFormatted}.xlsx`;
    XLSX.writeFile(wb, filename);
}

// --- DATABASE BACKUP & RESTORE (ADMIN TOOL) ---
function exportBackupData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.tickets));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `CBS_Service_Hub_Backup_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchorElem.click();
}

function importBackupData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async function(ev) {
        try {
            const imported = JSON.parse(ev.target.result);
            if (Array.isArray(imported)) {
                state.tickets = imported;
                await saveTickets();
                renderDashboard();
                alert("Backup restored successfully! (นำเข้าข้อมูลสำเร็จ)");
            } else {
                alert("Invalid backup file format (ไฟล์ไม่ถูกต้อง)");
            }
        } catch (err) {
            alert("Cannot read backup file (อ่านไฟล์ไม่ได้): " + err.message);
        }
    };
    reader.readAsText(file);
}

// --- ADMIN HUBS & MONITORING (งานค้าง & แก้ไข) ---
state.adminFilters = {
    search: '',
    bu: 'ALL',
    category: 'ALL',
    status: 'ALL',
    dateStart: '',
    dateEnd: ''
};
state.editingTicketId = null;

function getAdminFilteredTickets() {
    return state.tickets.filter(ticket => {
        // Only unfinished tasks (Pending & Progress status)
        const isUnfinished = ticket.status === 'Pending' || ticket.status === 'Progress';
        if (!isUnfinished) return false;

        // 1. Search Query
        const matchQuery = state.adminFilters.search === '' || 
            ticket.id.toLowerCase().includes(state.adminFilters.search.toLowerCase()) ||
            ticket.branchCode.toLowerCase().includes(state.adminFilters.search.toLowerCase()) ||
            ticket.branchName.toLowerCase().includes(state.adminFilters.search.toLowerCase()) ||
            ticket.reporterName.toLowerCase().includes(state.adminFilters.search.toLowerCase()) ||
            ticket.description.toLowerCase().includes(state.adminFilters.search.toLowerCase());
            
        // 2. BU Filter
        const matchBU = state.adminFilters.bu === 'ALL' || ticket.bu === state.adminFilters.bu;
        
        // 3. Category Filter
        const matchCategory = state.adminFilters.category === 'ALL' || ticket.category === state.adminFilters.category;
        
        // 4. Status Filter
        const matchStatus = state.adminFilters.status === 'ALL' || ticket.status === state.adminFilters.status;
        
        // 5. Date Filter
        let matchDate = true;
        if (state.adminFilters.dateStart || state.adminFilters.dateEnd) {
            const tDate = new Date(ticket.date);
            if (state.adminFilters.dateStart) {
                const sDate = new Date(state.adminFilters.dateStart);
                sDate.setHours(0,0,0,0);
                if (tDate < sDate) matchDate = false;
            }
            if (state.adminFilters.dateEnd) {
                const eDate = new Date(state.adminFilters.dateEnd);
                eDate.setHours(23,59,59,999);
                if (tDate > eDate) matchDate = false;
            }
        }
        
        return matchQuery && matchBU && matchCategory && matchStatus && matchDate;
    }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Oldest pending first (Admin SLA prioritization!)
}

function renderAdminDashboard() {
    const filtered = getAdminFilteredTickets();
    
    // Update pending badge count
    document.getElementById('admin-pending-count').textContent = `${filtered.length} Pending`;
    
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9">
                    <div class="empty-state">
                        <div class="empty-icon">🎉</div>
                        <div class="empty-title">No pending tickets (ไม่มีงานค้าง)!</div>
                        <div>All branches are running smoothly (ทุกสาขาเรียบร้อยดี)</div>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    filtered.forEach(t => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = () => showTicketDetail(t.id);
        
        // Calculate pending duration
        const durationMs = new Date() - new Date(t.date);
        const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
        const durationDays = Math.floor(durationHours / 24);
        let pendingDuration = "";
        
        if (durationDays > 0) {
            pendingDuration = `${durationDays}d ${durationHours % 24}h`;
        } else {
            pendingDuration = `${durationHours}h`;
        }
        
        // Format date
        const dateStr = new Date(t.date).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusLabel = t.status === 'Pending' ? 'Pending' : 'In Progress';
        
        // Description truncated
        const descTruncated = t.description.length > 45 ? t.description.substring(0, 45) + "..." : t.description;
        
        tr.innerHTML = `
            <td style="font-weight: 700;">${t.id}</td>
            <td><span class="table-bu-badge table-bu-${t.bu.toLowerCase()}">${t.bu}</span></td>
            <td><span style="font-weight: 600;">${t.branchCode}</span> - ${t.branchName}</td>
            <td>${t.reporterName}</td>
            <td>${getThaiCategoryName(t.category)}</td>
            <td style="max-width: 250px; font-size:12px; color: var(--text-secondary);" title="${t.description}">${descTruncated}</td>
            <td>${dateStr}</td>
            <td><span style="font-weight:700; color: var(--accent);">${pendingDuration}</span></td>
            <td><span class="status-badge status-${t.status.toLowerCase()}">${statusLabel}</span></td>
            <td style="text-align: center;">
                <div class="btn-action-group" style="justify-content: center;">
                    <button class="admin-action-btn admin-action-edit" onclick="event.stopPropagation(); openAdminEditModal('${t.id}')">✏️ Edit</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openAdminEditModal(ticketId) {
    const ticket = state.tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    state.editingTicketId = ticketId;
    
    document.getElementById('edit-tkt-id').textContent = ticket.id;
    document.getElementById('edit-reporter-name').value = ticket.reporterName;
    document.getElementById('edit-reporter-phone').value = ticket.reporterPhone;
    document.getElementById('edit-reporter-position').value = ticket.reporterPosition || '';
    document.getElementById('edit-category').value = ticket.category;
    document.getElementById('edit-status').value = ticket.status;
    document.getElementById('edit-desc').value = ticket.description;
    
    document.getElementById('admin-edit-modal').classList.add('active');
}

function closeAdminEditModal() {
    document.getElementById('admin-edit-modal').classList.remove('active');
    state.editingTicketId = null;
}

async function saveAdminEdit(e) {
    if (e) e.preventDefault();
    
    const ticket = state.tickets.find(t => t.id === state.editingTicketId);
    if (!ticket) return;
    
    const reporterName = document.getElementById('edit-reporter-name').value.trim();
    const reporterPhone = document.getElementById('edit-reporter-phone').value.trim();
    const reporterPosition = document.getElementById('edit-reporter-position').value.trim();
    const category = document.getElementById('edit-category').value;
    const status = document.getElementById('edit-status').value;
    const description = document.getElementById('edit-desc').value.trim();
    
    if (!reporterName || !reporterPhone || !description) {
        alert("Please fill in all required fields (กรุณากรอกข้อมูลให้ครบ)");
        return;
    }
    
    // Save details
    ticket.reporterName = reporterName;
    ticket.reporterPhone = reporterPhone;
    ticket.reporterPosition = reporterPosition;
    ticket.category = category;
    ticket.status = status;
    ticket.description = description;
    
    await saveTickets();
    closeAdminEditModal();
    
    // Refresh both view dashboards
    renderDashboard();
    renderAdminDashboard();
    
    alert("Ticket updated successfully! (แก้ไขสำเร็จ)");
}

function exportAdminExcel() {
    const filtered = getAdminFilteredTickets();
    if (filtered.length === 0) {
        alert("No pending tickets to export (ไม่มีงานค้าง)");
        return;
    }
    
    const exportData = filtered.map(t => {
        const dateStr = new Date(t.date).toLocaleString('th-TH');
        let statusLabel = t.status;
        if (t.status === 'Progress') statusLabel = 'On Progress';
        if (t.status === 'Reject') statusLabel = 'Reject';
        
        return {
            "Ticket No.": t.id,
            "Date": dateStr,
            "BU": t.bu,
            "Branch Code": t.branchCode,
            "Branch Name": t.branchName,
            "Reporter": t.reporterName,
            "Reporter E-Mail": t.reporterEmail || '-',
            "Phone": t.reporterPhone,
            "Position": t.reporterPosition || '-',
            "Category": getThaiCategoryName(t.category),
            "Description": t.description,
            "Status": statusLabel,
            "Attachments": t.images && t.images.length > 0 ? `Yes (${t.images.length})` : "No"
        };
    });
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    const wscols = [
        { wch: 18 }, { wch: 22 }, { wch: 15 }, { wch: 12 }, { wch: 25 },
        { wch: 20 }, { wch: 25 }, { wch: 16 }, { wch: 15 }, { wch: 25 }, { wch: 50 },
        { wch: 16 }, { wch: 12 }
    ];
    ws['!cols'] = wscols;
    
    XLSX.utils.book_append_sheet(wb, ws, "CBS Pending Logs");
    
    const dateFormatted = new Date().toISOString().split('T')[0].replace(/-/g, '');
    XLSX.writeFile(wb, `CBS_Service_Hub_Pending_Export_${dateFormatted}.xlsx`);
}

// --- ADMIN DASHBOARD ANALYTICS (Chart.js Graphs) ---
// Chart instance references (needed to destroy before recreating)
let chartMonthlyBar = null;
let chartStatusDoughnut = null;
let chartBUComparison = null;
state.chartBUFilter = 'ALL';

// BU color map for charts
const BU_CHART_COLORS = {
    PWB: { bg: 'rgba(139, 92, 246, 0.7)', border: '#8b5cf6', light: 'rgba(139, 92, 246, 0.15)' },
    B2S: { bg: 'rgba(249, 115, 22, 0.7)', border: '#f97316', light: 'rgba(249, 115, 22, 0.15)' },
    OFM: { bg: 'rgba(14, 165, 233, 0.7)', border: '#0ea5e9', light: 'rgba(14, 165, 233, 0.15)' },
    SSP: { bg: 'rgba(37, 99, 235, 0.7)', border: '#2563eb', light: 'rgba(37, 99, 235, 0.15)' }
};

function getChartFilteredTickets() {
    if (state.chartBUFilter === 'ALL') return state.tickets;
    return state.tickets.filter(t => t.bu === state.chartBUFilter);
}

function renderAdminCharts() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, skipping dashboard charts');
        return;
    }
    
    const tickets = getChartFilteredTickets();
    
    // Update KPI numbers
    const total = tickets.length;
    const pending = tickets.filter(t => t.status === 'Pending').length;
    const progress = tickets.filter(t => t.status === 'Progress').length;
    const completed = tickets.filter(t => t.status === 'Completed').length;
    const reject = tickets.filter(t => t.status === 'Reject').length;
    
    document.getElementById('admin-kpi-total').textContent = total;
    document.getElementById('admin-kpi-pending').textContent = pending;
    document.getElementById('admin-kpi-progress').textContent = progress;
    document.getElementById('admin-kpi-completed').textContent = completed;
    const adminRejectVal = document.getElementById('admin-kpi-reject');
    if (adminRejectVal) adminRejectVal.textContent = reject;
    
    // Detect dark mode for text colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#9ca3af' : '#475569';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    
    // ==========================================
    // CHART 1: Stacked Bar Chart (Time Volume)
    // ==========================================
    renderTimeVolumeChart(tickets, textColor, gridColor);
    
    // ==========================================
    // CHART 2: Status Doughnut
    // ==========================================
    renderStatusDoughnut(pending, progress, completed, reject, textColor);
    
    // ==========================================
    // CHART 3: BU Comparison
    // ==========================================
    renderBUComparisonChart(textColor, gridColor);
}

function renderTimeVolumeChart(tickets, textColor, gridColor) {
    const timeFilter = document.getElementById('chart-time-filter');
    const view = timeFilter ? timeFilter.value : 'monthly';
    
    // Group tickets by time view
    const timeMap = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    tickets.forEach(t => {
        const d = new Date(t.date);
        let key = '';
        if (view === 'daily') {
            key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        } else if (view === 'yearly') {
            key = `${d.getFullYear()}`;
        } else {
            // default monthly
            key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        }
        
        if (!timeMap[key]) timeMap[key] = { completed: 0, pending: 0, progress: 0, reject: 0 };
        
        if (t.status === 'Completed') timeMap[key].completed++;
        else if (t.status === 'Pending') timeMap[key].pending++;
        else if (t.status === 'Progress') timeMap[key].progress++;
        else if (t.status === 'Reject') timeMap[key].reject++;
    });
    
    // Sort chronologically
    const sortedKeys = Object.keys(timeMap).sort();
    
    // Take last N depending on view (e.g. last 14 days, last 12 months, last 5 years)
    let lastN = sortedKeys;
    if (view === 'daily') lastN = sortedKeys.slice(-14);
    else if (view === 'monthly') lastN = sortedKeys.slice(-12);
    else if (view === 'yearly') lastN = sortedKeys.slice(-5);
    
    const labels = [];
    const completedData = [];
    const pendingData = [];
    const progressData = [];
    const rejectData = [];
    
    lastN.forEach(k => {
        if (view === 'daily') {
            const [y, m, d] = k.split('-');
            labels.push(`${d} ${monthNames[parseInt(m)-1]}`);
        } else if (view === 'yearly') {
            labels.push(k);
        } else {
            const [y, m] = k.split('-');
            labels.push(`${monthNames[parseInt(m)-1]} ${y}`);
        }
        
        pendingData.push(timeMap[k].pending);
        progressData.push(timeMap[k].progress);
        completedData.push(timeMap[k].completed);
        rejectData.push(timeMap[k].reject);
    });
    
    // Destroy old instance
    if (chartMonthlyBar) { chartMonthlyBar.destroy(); chartMonthlyBar = null; }
    
    const ctx = document.getElementById('chart-monthly-bar');
    if (!ctx) return;
    
    chartMonthlyBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Completed',
                    data: completedData,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderRadius: 4
                },
                {
                    label: 'Reject',
                    data: rejectData,
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderRadius: 4
                },
                {
                    label: 'On Progress',
                    data: progressData,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Pending',
                    data: pendingData,
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: '#f59e0b',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        padding: 20,
                        font: { family: "'Inter', 'Sarabun', sans-serif", size: 12, weight: '600' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f3f4f6',
                    bodyColor: '#d1d5db',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { family: "'Inter', 'Sarabun', sans-serif", size: 13, weight: '700' },
                    bodyFont: { family: "'Inter', 'Sarabun', sans-serif", size: 12 },
                    callbacks: {
                        footer: function(tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(item => total += item.parsed.y);
                            return `รวมทั้งหมด: ${total} งาน`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: textColor, font: { size: 11 } },
                    grid: { display: false }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        color: textColor,
                        font: { size: 11 },
                        stepSize: 1,
                        callback: function(value) { return Number.isInteger(value) ? value : ''; }
                    },
                    grid: { color: gridColor }
                }
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });
}

function renderStatusDoughnut(pending, progress, completed, reject, textColor) {
    if (chartStatusDoughnut) { chartStatusDoughnut.destroy(); chartStatusDoughnut = null; }
    
    const ctx = document.getElementById('chart-status-doughnut');
    if (!ctx) return;
    
    chartStatusDoughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'On Progress', 'Completed', 'Reject'],
            datasets: [{
                data: [pending, progress, completed, reject],
                backgroundColor: [
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: ['#f59e0b', '#3b82f6', '#10b981', '#dc2626'],
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 16,
                        font: { family: "'Inter', 'Sarabun', sans-serif", size: 12, weight: '600' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f3f4f6',
                    bodyColor: '#d1d5db',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { family: "'Inter', 'Sarabun', sans-serif", size: 13, weight: '700' },
                    bodyFont: { family: "'Inter', 'Sarabun', sans-serif", size: 12 },
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                            return ` ${context.label}: ${value} งาน (${pct}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 800
            }
        }
    });
}

function renderBUComparisonChart(textColor, gridColor) {
    if (chartBUComparison) { chartBUComparison.destroy(); chartBUComparison = null; }
    
    const ctx = document.getElementById('chart-bu-comparison');
    if (!ctx) return;
    
    const bus = ['PWB', 'B2S', 'OFM', 'SSP'];
    const buLabels = ['PWB (พาวเวอร์บาย)', 'B2S (บีทูเอส)', 'OFM (ออฟฟิศเมท)', 'SSP (ซูเปอร์สปอร์ต)'];
    const buData = bus.map(bu => state.tickets.filter(t => t.bu === bu).length);
    const buColors = bus.map(bu => BU_CHART_COLORS[bu].bg);
    const buBorders = bus.map(bu => BU_CHART_COLORS[bu].border);
    
    chartBUComparison = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: buLabels,
            datasets: [{
                label: 'จำนวนงานทั้งหมด',
                data: buData,
                backgroundColor: buColors,
                borderColor: buBorders,
                borderWidth: 1.5,
                borderRadius: 6,
                barThickness: 36
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f3f4f6',
                    bodyColor: '#d1d5db',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { family: "'Inter', 'Sarabun', sans-serif", size: 13, weight: '700' },
                    bodyFont: { family: "'Inter', 'Sarabun', sans-serif", size: 12 },
                    callbacks: {
                        label: function(context) {
                            return ` จำนวน: ${context.raw} งาน`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor,
                        font: { size: 11 },
                        stepSize: 1,
                        callback: function(value) { return Number.isInteger(value) ? value : ''; }
                    },
                    grid: { color: gridColor }
                },
                y: {
                    ticks: { color: textColor, font: { size: 12, weight: '600' } },
                    grid: { display: false }
                }
            },
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });
}

// --- ADMIN LOGIN ---
function openAdminLoginModal(e) {
    if (e) e.preventDefault();
    document.getElementById('admin-login-modal').classList.add('active');
}

function closeAdminLoginModal() {
    document.getElementById('admin-login-modal').classList.remove('active');
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
}

async function handleAdminLogin() {
    const user = document.getElementById('admin-username').value.trim();
    const pass = document.getElementById('admin-password').value.trim();

    let valid = false;
    try {
        if (typeof GasApi !== 'undefined' && GasApi.isGasRuntime()) {
            valid = await GasApi.validateAdmin(user, pass);
        } else {
            valid = user === 'Admin' && pass === '1234';
        }
    } catch (err) {
        alert('Login failed (เข้าสู่ระบบไม่สำเร็จ): ' + err.message);
        return;
    }

    if (valid) {
        state.isAdmin = true;
        closeAdminLoginModal();
        switchView('admin');
    } else {
        alert('Invalid Username or Password (ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง)');
    }
}
// --- APP INITIALIZER ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialise State & Database
    await loadDatabase();
    
    // 2. Set up Event Listeners
    
    // Login
    document.getElementById('login-form-element').addEventListener('submit', handleLogin);
    document.getElementById('header-logout').addEventListener('click', handleLogout);
    
    // Route navigation
    document.getElementById('header-back').addEventListener('click', () => {
        if (state.currentView === 'admin') {
            switchView('service');
        } else if (state.currentView === 'new_ticket') {
            switchView('dashboard');
        } else if (state.currentView === 'dashboard') {
            switchView('service');
        } else {
            switchView('service');
        }
    });
    document.getElementById('btn-dashboard-new-tkt').addEventListener('click', () => switchView('new_ticket'));
    
    // Sidebar toggle
    document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
        document.getElementById('app-container-wrapper').classList.toggle('sidebar-collapsed');
    });
    
    // Sidebar Navigation
    document.getElementById('nav-home')?.addEventListener('click', () => switchView('service'));
    document.getElementById('nav-maintenance')?.addEventListener('click', () => switchView('dashboard'));
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Service selection clicks
    document.getElementById('service-ma-card').addEventListener('click', () => switchView('dashboard'));
    
    // Dashboard Filters
    document.getElementById('dashboard-search').addEventListener('input', handleSearch);
    document.getElementById('dashboard-category-filter').addEventListener('change', handleCategoryFilter);
    document.getElementById('dashboard-status-filter').addEventListener('change', handleStatusFilter);
    document.getElementById('dashboard-date-start').addEventListener('change', (e) => {
        state.filters.dateStart = e.target.value;
        renderDashboard();
    });
    document.getElementById('dashboard-date-end').addEventListener('change', (e) => {
        state.filters.dateEnd = e.target.value;
        renderDashboard();
    });
    
    // BU filter buttons
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const bu = tag.getAttribute('data-bu');
            handleBUFilter(bu);
        });
    });
    
    
    // Ticket Form Selects
    document.getElementById('form-bu').addEventListener('change', (e) => {
        handleBUSelect(e.target.value);
    });
    document.getElementById('form-branch').addEventListener('input', handleBranchInput);
    
    // Image attachment inputs
    const fileInput = document.getElementById('form-file-input');
    const dropzone = document.getElementById('form-upload-zone');
    
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleImageFilesSelect);
    
    // Drag & Drop
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        handleImageFilesSelect(e);
    });
    
    // Form Submit
    document.getElementById('maintenance-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('btn-form-cancel').addEventListener('click', () => switchView('dashboard'));
    
    // Backup & Restore handlers (Admin hub)
    document.getElementById('btn-dashboard-backup').addEventListener('click', exportBackupData);
    document.getElementById('btn-dashboard-restore').addEventListener('click', () => {
        document.getElementById('admin-restore-file-input').click();
    });
    document.getElementById('admin-restore-file-input').addEventListener('change', importBackupData);
    
    // Admin Hub Listeners
    document.getElementById('btn-admin-to-dashboard').addEventListener('click', () => switchView('service'));
    document.getElementById('btn-admin-export').addEventListener('click', exportAdminExcel);
    document.getElementById('btn-admin-save-edit').addEventListener('click', saveAdminEdit);
    
    document.getElementById('admin-search').addEventListener('input', (e) => {
        state.adminFilters.search = e.target.value;
        renderAdminDashboard();
    });
    document.getElementById('admin-bu-filter').addEventListener('change', (e) => {
        state.adminFilters.bu = e.target.value;
        renderAdminDashboard();
    });
    document.getElementById('admin-category-filter').addEventListener('change', (e) => {
        state.adminFilters.category = e.target.value;
        renderAdminDashboard();
    });
    document.getElementById('admin-status-filter').addEventListener('change', (e) => {
        state.adminFilters.status = e.target.value;
        renderAdminDashboard();
    });
    document.getElementById('admin-date-start').addEventListener('change', (e) => {
        state.adminFilters.dateStart = e.target.value;
        renderAdminDashboard();
    });
    document.getElementById('admin-date-end').addEventListener('change', (e) => {
        state.adminFilters.dateEnd = e.target.value;
        renderAdminDashboard();
    });
    
    // Admin Dashboard Chart BU Filter
    document.getElementById('chart-time-filter').addEventListener('change', renderAdminCharts);
    document.getElementById('chart-bu-filter').addEventListener('change', (e) => {
        state.chartBUFilter = e.target.value;
        renderAdminCharts();
    });
    
    // 3. Kickoff first view depending on session
    if (state.currentUser) {
        switchView('service');
    } else {
        switchView('login');
    }
});

