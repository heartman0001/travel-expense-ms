const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const loginForm = document.querySelector('.login-form');
emailInput.addEventListener('input', function() {
    // Regex สำหรับตรวจสอบรูปแบบ Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // ถ้ามีการพิมพ์ และรูปแบบไม่ถูกต้อง
    if (this.value !== "" && !emailPattern.test(this.value)) {
        this.classList.add('invalid');
    } else {
        // ถ้าถูกต้อง หรือยังไม่ได้พิมพ์ ให้ลบสีแดงออก
        this.classList.remove('invalid');
    }
});
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // จำลองการตรวจสอบ (เปลี่ยนเป็น logic จริงภายหลัง)
    if (emailInput.value.includes("gmail.com")) {
        // alert("เข้าสู่ระบบสำเร็จ");
        window.location.href = "main.html";
    } else {
        emailInput.classList.add('invalid');
    }
});

// ลบสีแดงเมื่อเริ่มพิมพ์ใหม่
emailInput.addEventListener('input', function() {
    this.classList.remove('invalid');
});