const forgotForm = document.querySelector('.login-form');
const emailInput = document.getElementById('email');
forgotForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // จำลองการตรวจสอบ (เปลี่ยนเป็น logic จริงภายหลัง)
    if (emailInput.value.includes("gmail.com")) {
        alert("ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว");
        window.location.href = "index.html"; // กลับไปหน้า login
    } else {
        emailInput.classList.add('invalid');
    }
});

// ลบสีแดงเมื่อเริ่มพิมพ์ใหม่
emailInput.addEventListener('input', function() {
    this.classList.remove('invalid');
});