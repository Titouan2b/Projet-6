let works = []
let categories = []
const center = document.querySelector(".center")
const gallery = document.querySelector(".gallery")
const token = sessionStorage.getItem("token")
const adminBar = document.querySelector(".admin-bar")
const login = document.querySelector(".login")
const logout = document.querySelector(".logout")

console.log(token)

function modAdmin(){
    if(token){
        logout.classList.remove("hidden")
        login.classList.add("hidden")
    }else{
        adminBar.classList.add("hidden")
        logout.classList.add("hidden")
        login.classList.remove("hidden")
    }
}
modAdmin()


function modPublic(){
    logout.addEventListener("click", (event) => {
        token === null
        if(token === null){
            window.location.reload()
        }
        
    })
}
modPublic()

console.log(modPublic())


async function getCategories(){
    await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categoriesResponse) => {
        categories = categoriesResponse
    })
    .catch((error) => console.log(error))
}


async function displayCategories(){
    await getWorks()
    await getCategories()
    categories.unshift({name:"Tous"})
    for(const category of categories){
        const button = document.createElement("button")
        button.setAttribute("class", "category-button")
        button.setAttribute("data-id", category.id)
        button.innerHTML = category.name
        center.appendChild(button)
        button.addEventListener("click", () =>{
            let allFigures = document.querySelectorAll(".gallery figure")
            for (const figure of allFigures) {
                if(button.getAttribute("data-id") !== "undefined"){
                    if(parseInt(figure.getAttribute("data-categorieid")) === parseInt(button.getAttribute("data-id"))){
                        figure.classList.replace("hidden", "display")
                    }else{
                        figure.classList.replace("display", "hidden")
                    }
                }else{
                    figure.classList.replace("hidden", "display")
                }
            }            
        })
    }
}


displayCategories()




async function getWorks(){
    await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((worksResponse) => {
        works = worksResponse
    })
    .catch((error) => console.log(error))
}

async function displayWorks(){
    await getWorks()
    for(const work of works){
        const figure = document.createElement("figure")
        figure.setAttribute("data-categorieid", work.categoryId)
        figure.setAttribute("class", "display")
        const img = document.createElement("img")
        img.setAttribute("src", work.imageUrl)
        img.setAttribute("alt", work.title)
        const figcaption = document.createElement("figcaption")
        figcaption.innerText = work.title
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
}

displayWorks()








