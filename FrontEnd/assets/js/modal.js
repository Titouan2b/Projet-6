const editGallery = document.querySelector(".gallery-edit")
const displayModal = document.querySelector(".overlay")
const pictureContainer = document.querySelector(".picture-container")
const closeModal = document.querySelector(".absolute")

editGallery.addEventListener("click", (event) =>{
    displayModal.classList.toggle("hidden") 

})

closeModal.addEventListener("click", (event) => {
    displayModal.classList.toggle("hidden")
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
        img.addEventListener("mouseout", (event) => {
            const iconeTrash = document.createElement("i")
            iconeTrash.setAttribute("class", "fa-regular fa-trash-can trash")
            figure.appendChild(iconeTrash)
        });
        const iconeTrash = document.createElement("i")
            iconeTrash.setAttribute("class", "fa-regular fa-trash-can trash")
            figure.appendChild(iconeTrash)
        img.addEventListener("mouseover", (event) => {
            const iconeMove = document.createElement("i")
            iconeMove.setAttribute("class", "fa-solid fa-arrows-up-down-left-right move")
            figure.appendChild(iconeMove)
            const iconeTrash = document.createElement("i")
            iconeTrash.setAttribute("class", "fa-regular fa-trash-can trash")
            figure.appendChild(iconeTrash)
        });
        figure.appendChild(img)
        figure.appendChild(figcaption)
        pictureContainer.appendChild(figure)
    }
}

displayWorksOnGallery()




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

