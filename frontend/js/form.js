const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

fileInput.addEventListener('change', function() {
    // ใช้ DataTransfer เพื่อช่วยในการจัดการไฟล์ภายใน input
    let dt = new DataTransfer();
    const { files } = this;

    // ล้าง UI เก่าก่อนแสดงใหม่ (หรือจะใช้แบบ append ต่อท้ายก็ได้)
    fileList.innerHTML = ''; 

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        dt.items.add(file); // เก็บไฟล์ไว้ใน DataTransfer

        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.style.display = 'flex';
        fileItem.style.justifyContent = 'space-between';
        fileItem.style.marginBottom = '5px';

        fileItem.innerHTML = `
            <span>📄 ${file.name}</span>
            <span class="remove-file" style="cursor:pointer; color:red; font-weight:bold;">&times;</span>
        `;
        
        fileList.appendChild(fileItem);

        // จัดการเมื่อกดลบ "เฉพาะไฟล์นี้"
        fileItem.querySelector('.remove-file').addEventListener('click', function() {
            // สร้าง DataTransfer ใหม่เพื่อคัดกรองไฟล์ที่เหลือ
            let newDt = new DataTransfer();
            for (let j = 0; j < fileInput.files.length; j++) {
                if (i !== j) newDt.items.add(fileInput.files[j]);
            }
            fileInput.files = newDt.files; // อัปเดตไฟล์ที่เหลือกลับเข้า input
            fileItem.remove(); // ลบ UI ของไฟล์นั้นออก
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
    window.location.href = "index.html";
    //successPopup.style.display = 'none'; // ซ่อน Popup
    // คุณสามารถเพิ่ม liff.closeWindow(); ตรงนี้เพื่อให้มันปิดหน้าเว็บใน LINE ทันที
});