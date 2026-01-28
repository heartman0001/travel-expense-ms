document.querySelectorAll('.custom-select-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        // ปิดอันอื่นๆ ก่อนเปิดอันใหม่ (ถ้ามีอันไหนเปิดค้างไว้)
        document.querySelectorAll('.custom-select-wrapper').forEach(select => {
            if (select !== this.parentElement) {
                select.classList.remove('open');
            }
        });
        
        // สลับสถานะ เปิด/ปิด ของอันที่คลิก
        this.parentElement.classList.toggle('open');
        e.stopPropagation(); // กันไม่ให้ Event หลุดไปหา window
    });
});

// 2. จัดการการเลือก Option
document.querySelectorAll('.custom-option').forEach(option => {
    option.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const text = this.textContent;
        const wrapper = this.closest('.custom-select-wrapper');
        
        // อัปเดตข้อความใน Trigger ของชุดนั้นๆ
        const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
        triggerSpan.textContent = text;
        triggerSpan.style.color = '#333'; 

        // อัปเดตค่าใน Hidden Input ของชุดนั้นๆ
        const hiddenInput = wrapper.querySelector('input[type="hidden"]');
        if(hiddenInput) hiddenInput.value = value;

        // ปิด Dropdown ของชุดนั้นๆ
        wrapper.classList.remove('open');
    });
});

// 3. ปิดทุกลูกศรเมื่อคลิกที่ว่างข้างนอก
window.addEventListener('click', function() {
    document.querySelectorAll('.custom-select-wrapper').forEach(select => {
        select.classList.remove('open');
    });
});
document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        // สลับการแสดงผลของ Popup ในชุดนั้นๆ
        const wrapper = this.parentElement;
        wrapper.classList.toggle('active');
        
        // ป้องกันไม่ให้คลิกแล้วไปโดนส่วนอื่น
        e.stopPropagation();
    });
});

// คลิกที่ว่างอื่นๆ ให้ปิด Popup
window.addEventListener('click', function() {
    document.querySelectorAll('.detail-dropdown-wrapper').forEach(wrapper => {
        wrapper.classList.remove('active');
    });
});
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

fileInput.addEventListener('change', function() {
    fileList.innerHTML = ''; // ล้างรายการเก่าออก (กรณีเลือกใหม่)
    
    if (this.files && this.files.length > 0) {
        const file = this.files[0]; // ดึงไฟล์แรกที่เลือก
        
        // สร้าง UI สำหรับแสดงชื่อไฟล์
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <span class="remove-file">&times;</span>
        `;
        
        fileList.appendChild(fileItem);

        // จัดการเมื่อกดลบไฟล์
        fileItem.querySelector('.remove-file').addEventListener('click', function() {
            fileInput.value = ''; // ล้างค่าใน input
            fileList.innerHTML = ''; // ลบ UI preview ออก
        });
    }
});
// อ้างอิง Element
const submitBtn = document.querySelector('.submit-btn');
const successPopup = document.getElementById('successPopup');
const closePopup = document.getElementById('closePopup');

// เมื่อกดปุ่ม "ยืนยัน"
submitBtn.addEventListener('click', function(e) {
    e.preventDefault(); // ป้องกันฟอร์มรีเฟรชหน้า (ถ้าไม่ได้ใช้ Submit จริง)
    successPopup.style.display = 'flex'; // แสดง Popup
});

// เมื่อกดปุ่ม "เสร็จสิ้น"
closePopup.addEventListener('click', function() {
    window.location.href = "mainpage.html";
    //successPopup.style.display = 'none'; // ซ่อน Popup
    // คุณสามารถเพิ่ม liff.closeWindow(); ตรงนี้เพื่อให้มันปิดหน้าเว็บใน LINE ทันที
});