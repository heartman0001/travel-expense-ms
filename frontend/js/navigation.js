
document.addEventListener("DOMContentLoaded", function() {
    // 1. สร้างโครงสร้าง HTML ของ Bottom Bar
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/navigation.css';
    document.head.appendChild(link);
    const navHTML = `
        <nav class="bottom-nav">
            <a href="index.html" class="nav-item" data-page="index">
                <img class="nav-icon" src="img/icon/document.png" width="24px" height="24px">
                <span>ประวัติ</span>
            </a>
            <a href="withdraw.html" class="nav-item" data-page="withdraw">
                <img class="nav-icon" src="img/icon/sack-dollar.png" width="24px" height="24px">
                <span>เบิกเงิน</span>
            </a>
            <a href="profile.html" class="nav-item" data-page="profile">
                <img class="nav-icon" src="img/icon/user_1.png" width="24px" height="24px">
                <span>โปรไฟล์</span>
            </a>
        </nav>
    `;

    // 2. แทรกเข้าไปใน body
    document.body.insertAdjacentHTML('beforeend', navHTML);

    // 3. จัดการเรื่องปุ่ม Active (ตรวจสอบว่าอยู่หน้าไหน)
    const currentPage = window.location.pathname.split("/").pop().split(".")[0] || 'index';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        if (item.getAttribute('data-page') === currentPage) {
            item.classList.add('active');
        }
    });

    // 4. เพิ่ม Padding ให้ Body อัตโนมัติเพื่อไม่ให้เนื้อหาถูกบัง
    document.body.style.paddingBottom = "80px";
});