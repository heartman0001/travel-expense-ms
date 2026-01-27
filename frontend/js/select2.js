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