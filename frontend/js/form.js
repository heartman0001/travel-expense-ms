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