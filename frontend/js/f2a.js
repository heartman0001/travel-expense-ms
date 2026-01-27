document.getElementById('btnVerify').addEventListener('click', function() {
    const inputStep = document.getElementById('step-input');
    const successStep = document.getElementById('step-success');

    // เพิ่ม Animation เล็กน้อยก่อนเปลี่ยน
    inputStep.style.opacity = '0';
    
    setTimeout(() => {
        inputStep.style.display = 'none';
        successStep.style.display = 'block';
        
        // ใส่ Animation ให้หน้า Success ค่อยๆ ปรากฏ
        successStep.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 300);
});

// CSS Animation สำหรับความลื่นไหล
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);