// อ้างอิง Element ต่างๆ
const modal = document.getElementById("editModal");
const editBtn = document.querySelector(".edit-btn");
const closeBtn = document.querySelector(".close-btn");
const editForm = document.getElementById("editForm");

// เมื่อคลิกปุ่ม "แก้ไขข้อมูล" ให้แสดง Modal
editBtn.onclick = function() {
    modal.style.display = "flex";
}

// เมื่อคลิกปุ่ม (X) ให้ปิด Modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// เมื่อคลิกพื้นหลัง (นอกกล่อง Modal) ให้ปิด Modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// จัดการเมื่อกด "บันทึกข้อมูล"
editForm.onsubmit = function(e) {
    e.preventDefault();
    
    // ดึงค่าจาก input ใน modal (ตัวอย่างแค่ชื่อ)
    const newName = document.getElementById("editName").value;
    
    // นำไปแสดงผลในหน้า Profile (สมมติว่าช่อง input หน้าแรกมี id="display-name")
    // alert("บันทึกข้อมูลเรียบร้อย!"); // ตัวอย่าง Alert
    
    modal.style.display = "none"; // ปิด modal หลังบันทึก
}