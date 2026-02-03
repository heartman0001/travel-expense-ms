const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
let allFiles = []; // อาร์เรย์เก็บไฟล์ทั้งหมดที่เลือกไว้

fileInput.addEventListener('change', function() {
    // รวมไฟล์ใหม่เข้ากับไฟล์เดิมที่มีอยู่
    const newFiles = Array.from(this.files);
    allFiles = [...allFiles, ...newFiles];
    
    renderFileList();
    
    // ล้างค่า input เพื่อให้สามารถเลือกไฟล์เดิมซ้ำได้ถ้าต้องการ
    this.value = ''; 
});

function renderFileList() {
    fileList.innerHTML = ''; // ล้าง UI เพื่อวาดใหม่จาก allFiles
    
    allFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        // ตกแต่งสไตล์เบื้องต้นให้เห็นชื่อและปุ่มลบ
        fileItem.style.display = 'flex';
        fileItem.style.justifyContent = 'space-between';
        fileItem.style.padding = '8px 20px';
        fileItem.style.borderBottom = '1px solid #eee';

        fileItem.innerHTML = `
            <span> ${file.name}</span>
            <span class="remove-file" data-index="${index}" style="cursor:pointer; color:red;">&times;</span>
        `;
        
        fileList.appendChild(fileItem);
    });

    // จัดการการลบไฟล์ทีละไฟล์
    document.querySelectorAll('.remove-file').forEach(btn => {
        btn.onclick = function() {
            const index = this.getAttribute('data-index');
            allFiles.splice(index, 1); // ลบไฟล์ออกจากอาร์เรย์
            renderFileList(); // วาด UI ใหม่
        };
    });
}
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
    window.location.href = "index.html";
    //successPopup.style.display = 'none'; // ซ่อน Popup
    // คุณสามารถเพิ่ม liff.closeWindow(); ตรงนี้เพื่อให้มันปิดหน้าเว็บใน LINE ทันที
});