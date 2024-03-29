function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

console.log(new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate()))

const modalbg = document.querySelector(".bground");
const modalOpenBtn = document.querySelector(".modal-btn");
const modalCloseBtns = document.querySelectorAll(".close");
const openCloseMenuBtn = document.querySelector("#openCloseMenu");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");

let formIsValid = false;
let errorList = {
    first: null,
    last: null,
    email: null,
    birthdate: null,
    quantity: null,
    location: null,
    checkbox1: null,
    checkbox2: null,
};

let data = {
    first: String,
    last: String,
    email: String,
    birthdate: Date,
    quantity: Number,
    location: String,
    checkbox1: Boolean,
    checkbox2: Boolean,
};

openCloseMenuBtn.addEventListener('click', editNav)

modalOpenBtn.addEventListener("click", openModal);
modalCloseBtns.forEach((button) => {
    button.addEventListener("click", closeModal);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetData();
    handleSubmit();
});

// Form submit function
function handleSubmit() {
    formData.forEach((formDataElement) => {
        let inputs = formDataElement.querySelectorAll("input");
        let isValid = false;
        let error;

        // Remise à zéro de la variable error
        removeError(formDataElement);

        // Boucle sur les champs afin de vérifier et obtenir leur valeur
        inputs.forEach((input) => {
            switch (input.name) {
                case "first":
                    !input.value
                        ? setError(formDataElement, "Veuillez compléter le champ")
                        : validateInput('name', input.value) === false
                            ? setError(formDataElement, "Prénom invalide")
                            : data.first = input.value;
                    break;


                case "last":
                    !input.value
                        ? setError(formDataElement, "Veuillez compléter le champ")
                        : validateInput('name', input.value) === false
                            ? setError(formDataElement, "Nom de famille invalide")
                            : data.last = input.value;
                    break;


                case "email":
                    !input.value
                        ? setError(formDataElement, "Veuillez compléter le champ")
                        : validateInput('email', input.value) === false
                            ? setError(formDataElement, "Adresse email invalide")
                            : data.email = input.value;
                    break;


                case "birthdate":
                    !input.value
                        ? setError(formDataElement, "Veuillez compléter le champ")
                        : (new Date(input.value).getTime() <= new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate()).getTime() && new Date(input.value).getTime() >= new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate()).getTime())
                            ? data.birthdate = input.value
                            : setError(formDataElement, "L'age doit être compris entre 16 et 100 ans");
                    break;

                case "quantity":
                    input.value && !isNaN(input.value) && parseInt(input.value) >= 0
                        ? data.quantity = parseInt(input.value)
                        : setError(formDataElement, "Veuillez saisir une quantité valide");
                    break;

                case "location":
                    let checkedLocations = document.querySelectorAll('input[name="location"]:checked');
                    checkedLocations.length > 0
                        ? data.location = checkedLocations[0].value
                        : setError(formDataElement, "Veuillez choisir un tournoi");
                    break;

                case "checkbox1":
                    input.checked
                        ? data.checkbox1 = true
                        : setError(formDataElement, "Vous devez accepter les conditions d'utilisation");
                    break;

                case "checkbox2":
                    data.checkbox2 = input.checked;
                    break;

                default:
                    break;
            }
        });
    });

    isValid = validateLastStep(data);
    let modalForm = document.querySelector(".modal-body form");
    if (isValid) {
        modalForm.classList.add('thanks');
        modalForm.innerHTML = "<p>Merci pour votre inscription<p>";
        document.querySelector(".thanks-close-btn").style.display = "block"
    }
}

// Permet la vérification de les champs //
function validateInput(type, element) {
    let regex;

    switch (type) {
        case 'email' :
            if (element.length <= 65) {
                // Regex pour vérifier l'adresse email
                return /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,30}[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9._-]{0,30}[a-zA-Z0-9]\.[a-z]{2,5}$/.test(element)
            }
            return false;

        case 'name' :
            if (element.length <= 30) {
                return /^[a-zA-Z]+(?:[-][a-zA-Z]+){0,2}(?:\s[a-zA-Z]+(?:[-][a-zA-Z]+){0,2}){0,2}$/.test(element);
            }
            return false;

        default :
            return false;

    }
}

// Permet la vérification de l'objet data avant l'envoi des données //
function validateLastStep(element) {
    for (const key in element) {
        if (element.hasOwnProperty(key) && element[key] === null) {
            return false;
        }
    }
    return true;
}

// launch modal form
function openModal() {
    modalbg.style.display = "block";
}

function closeModal() {
    modalbg.style.display = "none";
}

function resetData() {
    data.first = null;
    data.last = null;
    data.email = null;
    data.birthdate = null;
    data.quantity = null;
    data.location = null;
    data.checkbox1 = null;
    data.checkbox2 = null;
}

function setError(element, error) {
    element.setAttribute("data-error", error);
    element.setAttribute("data-error-visible", "true");
}

function removeError(element) {
    element.removeAttribute("data-error");
    element.removeAttribute("data-error-visible");
}