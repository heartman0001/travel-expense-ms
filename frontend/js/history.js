function filterList() {
    // 1. ดึงค่าจาก Select ที่เราเลือก
    const selectedValue = document.getElementById('statusFilter').value;
    
    // 2. ดึงรายการ Card ทั้งหมดที่มีคลาส .card-status
    const items = document.querySelectorAll('.card-status');

    items.forEach(item => {
        // ดึงค่าจาก data-status ของแต่ละ Card
        const itemStatus = item.getAttribute('data-status');

        if (selectedValue === 'all') {
            item.style.display = 'block'; // แสดงทั้งหมด
        } else if (itemStatus === selectedValue) {
            item.style.display = 'block'; // แสดงถ้าสถานะตรงกัน
        } else {
            item.style.display = 'none'; // ซ่อนถ้าไม่ตรง
        }
    });
}

// เพิ่มลูกเล่นคลิกที่ Card เพื่อเปิด Dropdown Popup (ถ้ายังไม่ได้เขียนไว้)
document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
        const popup = this.nextElementSibling;
        popup.classList.toggle('active');
        this.querySelector('.arrow-blue').classList.toggle('rotate');
    });
});
function updateStatusCounts() {
    // 1. ดึงรายการ Card ทั้งหมดที่มีข้อมูลจริง
    const cards = document.querySelectorAll('.card-status');
    
    // 2. สร้างตัวแปรสำหรับเก็บจำนวนแต่ละสถานะ
    let counts = {
        pending: 0,
        approved: 0,
        rejected: 0,
        success: 0
    };

    // 3. วนลูปนับจำนวนตาม data-status
    cards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (counts.hasOwnProperty(status)) {
            counts[status]++;
        }
    });

    // 4. นำตัวเลขที่นับได้ไปใส่ใน h2 ของแต่ละกล่องด้านบน
    // อ้างอิงตาม id ของกล่อง (box_state_1 = รออนุมัติ, 2 = อนุมัติ, 3 = ไม่อนุมัติ, 4 = สำเร็จ)
    if (document.querySelector('#box_state_1 h2')) 
        document.querySelector('#box_state_1 h2').innerText = counts.pending;
    
    if (document.querySelector('#box_state_2 h2')) 
        document.querySelector('#box_state_2 h2').innerText = counts.approved;
    
    if (document.querySelector('#box_state_3 h2')) 
        document.querySelector('#box_state_3 h2').innerText = counts.rejected;
    
    if (document.querySelector('#box_state_4 h2')) 
        document.querySelector('#box_state_4 h2').innerText = counts.success;
}

// เรียกใช้งานฟังก์ชันทันทีที่โหลดหน้าจอเสร็จ
window.addEventListener('load', updateStatusCounts);
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('statusDropdown');
    const trigger = dropdown.querySelector('.modern-filter-select-clone');
    const popup = dropdown.querySelector('.dropdown-popup-list');
    const options = dropdown.querySelectorAll('.option-item');
    const selectedText = document.getElementById('selectedText');

    // 1. กดที่ปุ่มเพื่อเปิด/ปิด Popup
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        popup.classList.toggle('active');
    });

    // 2. เมื่อคลิกเลือกรายการใน Popup
    options.forEach(opt => {
        opt.addEventListener('click', function() {
            const val = this.getAttribute('data-value');
            selectedText.innerText = this.innerText; // เปลี่ยนชื่อบนปุ่ม
            popup.classList.remove('active'); // ปิด Popup
            
            // เรียกฟังก์ชัน Filter รายการ (ใช้ logic เดิมที่คุณมี)
            filterListByValue(val);
        });
    });

    // 3. คลิกข้างนอก Popup ให้ปิดอัตโนมัติ
    document.addEventListener('click', function() {
        popup.classList.remove('active');
    });
});

// ฟังก์ชันกรองข้อมูลใน Card
function filterListByValue(val) {
    const cards = document.querySelectorAll('.card-status');
    cards.forEach(card => {
        const status = card.getAttribute('data-status');
        if (val === 'all' || status === val) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}