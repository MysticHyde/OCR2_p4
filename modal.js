function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const modalbg = document.querySelector(".bground");
const modalOpenBtn = document.querySelectorAll(".modal-btn");
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
modalOpenBtn.forEach((btn) => btn.addEventListener("click", openModal));
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

    // Reset des erreurs sur l'élément
    removeError(formDataElement);

    // Boucle sur les inputs afin de vérifier et extraire leur valeur
    inputs.forEach((input) => {
      switch (input.name) {
        case "first":
          if (input.value) {
            if (input.value.length > 0) {
              isValid = validateFirstAndLastName(input.value);
              if (isValid) {
                data.first = input.value;
                return;
              } else {
                error = "Prénom non valide";
              }
            } else {
              error = "Prénom trop court";
            }
          } else {
            error = "Veuillez compléter le champ";
          }
          setError(formDataElement, error);
          break;

        case "last":
          if (input.value) {
            if (input.value.length > 0) {
              isValid = validateFirstAndLastName(input.value);
              if (isValid) {
                data.last = input.value;
                return;
              } else {
                error = "Nom de famille non valide";
              }
            } else {
              error = "Nom de famille trop court";
            }
          } else {
            error = "Veuillez compléter le champ";
          }
          setError(formDataElement, error);
          break;

        case "email":
          if (input.value) {
            isValid = validateEmail(input.value);
            if (isValid) {
              data.email = input.value;
              return;
            } else {
              error = "Adresse email invalide";
            }
          } else {
            error = "Veuillez compléter le champ";
          }
          setError(formDataElement, error);
          break;
        case "birthdate":
          if (input.value) {
            let birthDate = new Date(input.value);
            let currentDate = new Date();
            let minDate = new Date(currentDate);
            let maxDate = new Date(currentDate);

            // Age minimum de 16 ans
            minDate.setFullYear(currentDate.getFullYear() - 16);
            // Age maximum de 100 ans
            maxDate.setFullYear(currentDate.getFullYear() - 100);

            if (
              !isNaN(birthDate.getTime()) &&
              birthDate.getTime() <= minDate.getTime() &&
              birthDate.getTime() >= maxDate.getTime()
            ) {
              data.birthdate = input.value;
              return;
            } else {
              error = "Il faut avoir plus de 16 ans pour s'inscrire";
            }
          } else {
            error = "Veuillez compléter le champ";
          }
          setError(formDataElement, error);
          break;

        case "quantity":
          // La valeur doit être un nombre et ne pas être négatif //
          if (
            input.value &&
            !isNaN(input.value) &&
            parseInt(input.value) >= 0
          ) {
            isValid = true;
            data.quantity = parseInt(input.value);
            return;
          } else {
            error = "Veuillez saisir une quantité valide";
          }
          setError(formDataElement, error);
          break;

        case "location":
          let checkedLocations = document.querySelectorAll(
            'input[name="location"]:checked'
          );
          if (checkedLocations.length > 0) {
            data.location = checkedLocations[0].value;
            return;
          } else {
            error = "Veuillez choisir un tournoi";
          }
          setError(formDataElement, error);
          break;

        case "checkbox1":
          if (input.checked) {
            data.checkbox1 = true;
            return;
          } else {
            error = "Vous devez accepter les conditions d'utilisation";
          }
          setError(formDataElement, error);
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

  if (isValid) {
    let modalForm = document.querySelector(".modal-body form");
	modalForm.classList.add('thanks');
    modalForm.innerHTML = "<p>Merci pour votre inscription<p>";
	document.querySelector(".thanks-close-btn").style.display = "block"

	
  }
}

// Permet la vérification de l'adresse email //
function validateFirstAndLastName(name) {
  if (name.length <= 30) {
    return /^[a-zA-Z]+(?:-[a-zA-Z]+){0,2}$/.test(name);
  }
  return false;
}

// Permet la vérification de l'adresse email //
function validateEmail(email) {
  if (email.length <= 255) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
  return false;
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
