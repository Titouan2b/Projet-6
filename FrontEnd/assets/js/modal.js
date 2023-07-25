
const displayModal = document.querySelector(".modal")
const pictureContainer = document.querySelector(".picture-container")
const closeModal = document.querySelector(".absolute")
const buttonNewProject = document.querySelector(".new")
const displayModalNewProject = document.querySelector(".second-modal-container")
const returnModal = document.querySelector(".arrow-left")
const closeSecondModal = document.querySelector(".close")
const overlay = document.querySelector(".overlay")

editGallery.addEventListener("click", (event) =>{
    displayModal.classList.toggle("hidden")
    displayModalNewProject.classList.add("hidden")
})

// displayModal.addEventListener("click", () => {
//     displayModal.classList.toggle("hidden")
//     console.log(displayModal.classList.contains("hidden"))
// })

closeModal.addEventListener("click", (event) => {
    console.log(displayModal.classList.contains("hidden"))
    displayModal.classList.add("hidden")
    console.log(closeModal)
})

overlay.addEventListener("click", () => {
    displayModal.classList.toggle("hidden")
    console.log(displayModal.classList.contains("hidden"))
})

returnModal.addEventListener("click", (event) => {
    displayModalNewProject.classList.toggle("hidden")
})

closeSecondModal.addEventListener("click", () =>{
    displayModal.classList.toggle("hidden")
})



async function displayWorksOnGallery(){
    await getWorks()
    pictureContainer.innerHTML = ""
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



 console.log(token)
async function deleteWorks(id){
    await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json;charset=utf-8",
            "accept":"*/*",
            "authorization":`Bearer ${token}`,
        }
    })
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
const selectCategory = document.querySelector(".select-category")
const inputTitle = document.querySelector(".input-title")
const inputImage = document.querySelector(".input-file")
const errorMessage = document.querySelector(".errorMessage")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    event.stopPropagation()
    let title = inputTitle.value
    let categorie = parseInt(selectCategory.value)
    let image = inputImage.files[0]
    if(title !== "" && categorie !== "" && image !== ""){
        let formData = new FormData()
        formData.append("title", title)
        formData.append("image", image)
        formData.append("category", categorie)
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "authorization":`Bearer ${token}`,
            },
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            displayWorks()
            displayWorksOnGallery()
        })
        .catch((error) => console.log(error))
    }else{
        errorMessage.innerText = "Tout les champs doivent être rempli"
    }
})

const buttonValidate = document.querySelector(".validate")

let compteur = 0

function changeInputTitle(){
    compteur++
    console.log("title")
    if(compteur >= 3){
        buttonValidate.classList.toggle("validate-green")
    }
}


function changeInputImage(){
    compteur++
    console.log("image")
    console.log(compteur >= 3)
    if(compteur >= 3){
        buttonValidate.classList.toggle("validate-green")
    }
}



function changeSelectCategory() {
    console.log("select")
    compteur++
    if(compteur >= 3){
        buttonValidate.classList.toggle("validate-green")
    }
    console.log(compteur)
    console.log(buttonValidate)

}


inputTitle.addEventListener("change", changeInputTitle)
selectCategory.addEventListener("change", changeSelectCategory)


inputImage.addEventListener("change", function(event){
    changeInputImage() 
    console.log(event)
    let imageFile = this.files[0]
    console.log(imageFile)
    const imageDownload = document.getElementById("imageDownload")
    const imageDisplay = document.querySelector(".input-image-center")
    if(imageFile){
        const reader = new FileReader()
        reader.onload = function(e){
            imageDownload.src = e.target.result
    };
    imageDisplay.classList.toggle("hidden")
    reader.readAsDataURL(imageFile);
    }
})