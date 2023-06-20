
const displayModal = document.querySelector(".overlay")
const pictureContainer = document.querySelector(".picture-container")
const closeModal = document.querySelector(".absolute")
const buttonNewProject = document.querySelector(".new")
const displayModalNewProject = document.querySelector(".second-modal-container")
const returnModal = document.querySelector(".arrow-left")

editGallery.addEventListener("click", (event) =>{
    displayModal.classList.toggle("hidden")
    displayModalNewProject.classList.add("hidden")
})

closeModal.addEventListener("click", (event) => {
    displayModal.classList.toggle("hidden")
})

returnModal.addEventListener("click", (event) => {
    displayModalNewProject.classList.toggle("hidden")
})


async function displayWorksOnGallery(){
    await getWorks()
    for(const work of works){
        const figure = document.createElement("figure")
        figure.setAttribute("data-categorieid", work.categoryId)
        figure.setAttribute("class", "picture-contains")
        const img = document.createElement("img")
        img.setAttribute("src", work.imageUrl)
        img.setAttribute("alt", work.title)
        const figcaption = document.createElement("figcaption")
        figcaption.innerText = 'éditer'
        const iconeTrash = document.createElement("i")
        iconeTrash.setAttribute("class", "fa-regular fa-trash-can trash")
        iconeTrash.addEventListener("click", (event) =>{
            deleteWorks(work.id)
        })
        figure.appendChild(iconeTrash)
        const iconeMove = document.createElement("i")
        iconeMove.setAttribute("class", "fa-solid fa-arrows-up-down-left-right move hidden")
        figure.appendChild(iconeMove)
        figure.appendChild(img)
        figure.appendChild(figcaption)
        pictureContainer.appendChild(figure)
        img.addEventListener("mouseover", (event) => {
            iconeMove.classList.remove("hidden")
        });
        img.addEventListener("mouseout", (event) => {
            iconeMove.classList.add("hidden")
        });
    }
}

displayWorksOnGallery()




buttonNewProject.addEventListener("click", (event) =>{
    displayModalNewProject.classList.toggle("hidden")
})



async function deleteWorks(id){
    console.log(id)
    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json;charset=utf-8",
            "accept":"*/*",
            "authorization":`Bearer ${token}`,
        }
    })
    .then((response) => response.json())
    .then(() => {
        displayWorks()
        displayWorksOnGallery()
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

const form = document.querySelector(".add-project-form")

form.addEventListener("submit", (event) => {



    let formData = new FormData()
    formData.append("image", $image)
    formData.append("title", $title)
    formData.append("categorie", $categorie)
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Content-Type":"application/json;charset=utf-8",
            "accept":"*/*",
            "authorization":`Bearer ${token}`,
        },
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {

    })
    .catch((error) => console.log(error))
})