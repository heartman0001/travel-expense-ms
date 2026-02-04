// --- การตั้งค่าเบื้องต้น ---
let currentPage = 1;
const recordsPerPage = 5; // แสดง 5 รายการต่อหน้า

// --- ส่วนที่ 1: การจัดการ Dropdown Filter ---
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('statusDropdown');
    const trigger = dropdown.querySelector('.modern-filter-select-clone');
    const popup = dropdown.querySelector('.dropdown-popup-list');
    const options = dropdown.querySelectorAll('.option-item');
    const selectedText = document.getElementById('selectedText');

    // คลิกเพื่อ เปิด/ปิด Popup
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        popup.classList.toggle('active');
    });

    // เมื่อเลือกรายการใน Filter
    options.forEach(opt => {
        opt.addEventListener('click', function() {
            const val = this.getAttribute('data-value');
            selectedText.innerText = this.innerText; 
            popup.classList.remove('active');
            
            // เริ่มต้นการกรองและแบ่งหน้าใหม่
            currentPage = 1; 
            updateDisplay();
        });
    });

    // คลิกข้างนอกให้ปิด Popup
    document.addEventListener('click', () => popup.classList.remove('active'));

    // เริ่มต้นแสดงผลครั้งแรก
    updateDisplay();
});

// --- ส่วนที่ 2: การจัดการ Pagination และ Filter ---
function updateDisplay() {
    const selectedValue = document.querySelector('.option-item[data-value]').parentElement.previousElementSibling.innerText;
    // หา value จาก text ที่แสดงอยู่บนปุ่ม
    const currentFilter = getCurrentFilterValue();
    
    const allCards = Array.from(document.querySelectorAll('.card-status'));
    
    // 1. กรองข้อมูลตามสถานะ
    const filteredCards = allCards.filter(card => {
        const status = card.getAttribute('data-status');
        return currentFilter === 'all' || status === currentFilter;
    });

    // 2. คำนวณการแบ่งหน้า
    const totalPages = Math.ceil(filteredCards.length / recordsPerPage);
    
    // ซ่อน Card ทั้งหมดก่อน
    allCards.forEach(card => card.style.display = 'none');

    // แสดงเฉพาะ Card ในหน้าที่เลือก
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const cardsToShow = filteredCards.slice(start, end);
    
    cardsToShow.forEach(card => card.style.display = 'block');

    // 3. อัปเดตปุ่ม Pagination
    renderPagination(totalPages);
    
    // 4. อัปเดตตัวเลขสรุปด้านบน
    updateStatusCounts();
}

function getCurrentFilterValue() {
    const text = document.getElementById('selectedText').innerText;
    const map = {
        'แสดงทั้งหมด': 'all',
        'รออนุมัติ': 'pending',
        'อนุมัติแล้ว': 'approved',
        'ไม่อนุมัติ': 'rejected',
        'สำเร็จ': 'success'
    };
    return map[text] || 'all';
}

function renderPagination(totalPages) {
    const container = document.getElementById('pagination-controls');
    container.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = `pg-btn ${i === currentPage ? 'active' : ''}`;
        btn.onclick = () => {
            currentPage = i;
            updateDisplay();
            window.scrollTo({ top: 300, behavior: 'smooth' });
        };
        container.appendChild(btn);
    }
}

// --- ส่วนที่ 3: นับจำนวนสถานะด้านบน (Box State) ---
function updateStatusCounts() {
    const cards = document.querySelectorAll('.card-status');
    let counts = { pending: 0, approved: 0, rejected: 0, success: 0 };

    cards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (counts.hasOwnProperty(status)) counts[status]++;
    });

    document.querySelector('#box_state_1 h2').innerText = counts.pending;
    document.querySelector('#box_state_2 h2').innerText = counts.approved;
    document.querySelector('#box_state_3 h2').innerText = counts.rejected;
    document.querySelector('#box_state_4 h2').innerText = counts.success;
}

// --- ส่วนที่ 4: การจัดการ Detail Dropdown และ Modal สลิป ---
// คลิกเปิด Detail ใน Card
document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
        const popup = this.nextElementSibling;
        popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
        this.querySelector('.arrow-blue').classList.toggle('rotate');
    });
});

function openSlipModal(imgSrc) {
    const modal = document.getElementById("slipModal");
    const modalImg = document.getElementById("imgFull");
    const downloadBtn = document.getElementById("downloadBtn");
    
    modal.style.display = "block";
    modalImg.src = imgSrc;
    downloadBtn.href = imgSrc;
}

window.onclick = function(event) {
    const modal = document.getElementById("slipModal");
    if (event.target == modal || event.target.className == 'close-modal') {
        modal.style.display = "none";
    }
};