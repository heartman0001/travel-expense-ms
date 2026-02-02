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
async function initLiff() {
    try {
        // 1. เริ่มต้นใช้งาน LIFF
        await liff.init({
            liffId: "2009002621-cHvJ4hkZ" // LIFF ID ของคุณ
        });

        // 2. เช็คว่า Login หรือยัง ถ้ายังให้พาไป Login
        if (!liff.isLoggedIn()) {
            liff.login();
        } else {
            // 3. ดึงข้อมูลโปรไฟล์
            const profileData = await liff.getProfile();
            console.log(profileData);

            // 4. นำข้อมูลไปใส่ใน HTML (ใช้ ID ที่คุณตั้งไว้)
            if (profileData.pictureUrl) {
                document.getElementById('img').src = profileData.pictureUrl;
                // ถ้ามีรูปใน Modal แก้ไขด้วย
                const imgPreview = document.getElementById('imgPreview');
                if(imgPreview) imgPreview.src = profileData.pictureUrl;
            }

            // ใส่ชื่อในหัวข้อ H2
            const nameHeader = document.querySelector('.profile-header h2');
            if(nameHeader) nameHeader.innerText = profileData.displayName;

            // ใส่ชื่อในช่อง Input (ถ้าต้องการให้ดึงจาก LINE มาแสดงเลย)
            const nameInput = document.querySelector('input[value="userName"]');
            if(nameInput) nameInput.value = profileData.displayName;
        }
    } catch (error) {
        console.error("LIFF Initialization failed", error);
    }
}
initLiff();