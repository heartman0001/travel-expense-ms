
document.addEventListener("DOMContentLoaded", function() {
    // 1. สร้างโครงสร้าง HTML ของ Bottom Bar
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '../css/navigation.css';
    document.head.appendChild(link);
    const navHTML = `
        <nav class="bottom-nav">
            <a href="main.html" class="nav-item" data-page="main">
                <img class="nav-icon" src="../img/icon/list.png" width="24px" height="24px">
                <span>อนุมัติ</span>
            </a>
            <a href="info.html" class="nav-item" data-page2="burge2" data-page="burge1">
                <img class="nav-icon" src="../img/icon/withdraw.png" width="24px" height="24px">
                <span>เบิกเงิน</span>
            </a>
            <a href="profile.html" class="nav-item" data-page="profile">
                <img class="nav-icon" src="../img/icon/profile.png" width="24px" height="24px">
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
        if (item.getAttribute('data-page2') === currentPage) {
            item.classList.add('active');
        }
    });

    // 4. เพิ่ม Padding ให้ Body อัตโนมัติเพื่อไม่ให้เนื้อหาถูกบัง
    document.body.style.paddingBottom = "80px";
});