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
    profileData = await liff.getProfile();
    console.log(profileData);


    document.getElementById('name').innerText = profileData.displayName;
    document.getElementById('img').src = profileData.pictureUrl;
}