window.onload = function(){
    liff.init({liffId: "2009002621-cHvJ4hkZ"} , function(){
        liff.ready.then(() => {
            if (liff.isLoggedIn()){

            }
            else {liff.login()}
        })
    })
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
            const nameInput = document.querySelector('input[value="นันทพงศ์ วงศ์ราษฎร์"]');
            if(nameInput) nameInput.value = profileData.displayName;

            document.getElementById('name').innerText = profileData.displayName;
        }
    } catch (error) {
        console.error("LIFF Initialization failed", error);
    }
}

// *** สำคัญมาก: ต้องเรียกใช้งานฟังก์ชันด้วย ***
initLiff();