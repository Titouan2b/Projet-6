let attempt = 3

async function postLogin(){
    await fetch("http://localhost:5678/api/users/login")
    .then((response) => response.json())
    .then((loginResponse) => {
        login = loginResponse
    })
    .catch((error) => console.log(error))
}

async function verifyLogin(){
    await postLogin()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    if(
        email == "sophie.bluel@test.tld" && password == "S0phie"
    ){
        window.location = "assets/view/admin.html"
        return false
    }
}