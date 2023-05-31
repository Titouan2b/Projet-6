let works = []
let categories = []
const center = document.querySelector(".center")
const gallery = document.querySelector(".gallery")

async function getCategories(){
    await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categoriesResponse) => {
        categories = categoriesResponse
    })
    .catch((error) => console.log(error))
}

async function displayCategories(){
    await getCategories()
    for(const category of categories){
        console.log(category)
        center.setAttribute("data-categorieid", category.categoryId)
        const button = document.createElement("button")
        button.setAttribute("class", "category-button")
        button.innerHTML = category.name
        button.addEventListener("click", () => {
            button.classList.contains("category-button-filled")
            button.classList.remove("category-button-filled")
            
        })
        center.appendChild(button)
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








async function deleteWorks(){
    await fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((worksResponse) => {
        works = worksResponse
    })
    .catch((error) => console.log(error))
}

async function postWorks(){
    await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((worksResponse) => {
        works = worksResponse
    })
    .catch((error) => console.log(error))
}

