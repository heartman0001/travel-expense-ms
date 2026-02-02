const fileInput = document.getElementById('file-input-pai');
const fileList = document.getElementById('file-list-pai');
let allFiles = []; // อาร์เรย์เก็บไฟล์ทั้งหมดที่เลือกไว้

// ฟังก์ชันสำหรับสร้างระบบจัดการไฟล์
function setupFileUpload(inputId, listId) {
    const fileInput = document.getElementById(inputId);
    const fileList = document.getElementById(listId);
    let filesArray = []; // เก็บไฟล์แยกกันตามชุด (ขาไป/ขากลับ)

    fileInput.addEventListener('change', function() {
        const newFiles = Array.from(this.files);
        filesArray = [...filesArray, ...newFiles];
        renderFiles();
        this.value = ''; // ล้างค่าเพื่อให้เลือกซ้ำได้
    });

    function renderFiles() {
        fileList.innerHTML = ''; 
        filesArray.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.style.display = 'flex';
            fileItem.style.justifyContent = 'space-between';
            fileItem.style.padding = '8px 20px';
            fileItem.style.borderBottom = '1px solid #eee';

            fileItem.innerHTML = `
                <span>${file.name}</span>
                <span class="remove-file" style="cursor:pointer; color:red; font-weight:bold;">&times;</span>
            `;

            // ปุ่มลบไฟล์
            fileItem.querySelector('.remove-file').onclick = function() {
                filesArray.splice(index, 1);
                renderFiles();
            };
            
            fileList.appendChild(fileItem);
        });
    }
}

// เรียกใช้งานแยกตามจุด
setupFileUpload('file-input-pai', 'file-list-pai');
setupFileUpload('file-input-klub', 'file-list-klub');
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