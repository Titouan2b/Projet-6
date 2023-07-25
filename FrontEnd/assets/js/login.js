let formLogin = document.querySelector("#form-login")
const email = document.getElementById("email")
console.log(email)
const emailValue = document.getElementById("email").value
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const password = document.getElementById("password")
const passwordValue = document.getElementById("password").value
let login = ""
const emailErrorMessage = document.getElementById("emailErrorMessage")
const errorAPI = document.getElementById("errorAPI")


const postLogin = async () => {
    console.log(email.value)
    console.log(password.value)
    await fetch("http://localhost:5678/api/users/login", {
        method:"POST", 
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email:email.value, password:password.value})
    })
    .then((response) => response.json())
    .then((loginResponse) => {
        login = loginResponse
        adminValidator(loginResponse)
    })
    .catch((error) => console.log(error))
}



function formValidation(){
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault()
        let validation = 0
        console.log(emailValue)
        if(email.value === ""){
            email.style.border = "2px solid red"
            emailErrorMessage.innerHTML = "Ce champ ne doit pas être vide"
            console.log(emailValue === "")
        }else if(email.value.match(emailRegex) === null){
            email.style.border = "2px solid red"
            emailErrorMessage.innerHTML = "Ce champ n'est pas valide"
            console.log(emailValue.match(emailRegex) === null)
        }else{
            email.style.border = "2px solid green"
            emailErrorMessage.innerHTML = ""
            validation++
        }
        if(password.value === ""){
            password.style.border = "2px solid red"
        }else{
            password.style.border = "2px solid green"
            validation++
        }
        if(validation === 2){
            postLogin()
        }

    })
}
formValidation()


async function adminValidator(loginResponse){
    await formValidation()
    console.log(loginResponse)
    if(loginResponse.error || loginResponse.message === "user not found"){
        errorAPI.innerHTML = "email ou mot de passe incorrect"
        return
    }
    let connected = true
    const token = loginResponse.token
    sessionStorage.setItem("connected", connected)
    sessionStorage.setItem("token", token)
    location.href = '../../index.html'
}

