window.onload = function(){
    liff.init({liffId: "2009002621-cHvJ4hkZ"} , function(){
        liff.ready.then(() => {
            if (liff.isLoggedIn()){
                liff.getProfile().then(profile => {
                    const nameElement = document.getElementById('userName');
                    if (nameElement) {
                        nameElement.innerText = profile.displayName;
                    }
                    const nameInput = document.querySelector('input[value="userName"]');
                    if(nameInput) nameInput.value = profileData.displayName;
                    
                    const imgElement = document.getElementById('img');
                    if (imgElement && profile.pictureUrl) {
                        imgElement.src = profile.pictureUrl;
                    }
                }).catch((err) => {
                    console.error('Error getting profile:', err);
                });
            }
            else {
                liff.login();
            }
        })
    })
}