function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalOpenBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelector(".close");

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
};

let data = {
  first: String,
  last: String,
  email: String,
  birthdate: Date,
  quantity: Number,
  location: String,
};

// open and close modal event
modalOpenBtn.forEach((btn) => btn.addEventListener("click", openModal));
modalCloseBtn.addEventListener("click", closeModal);

// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  resetData();
  handleSubmit();
});

// Form submit function
function handleSubmit() {
  formData.forEach((formDataElement) => {
    let input = formDataElement.querySelector("input");
    let isValid;
    let error;

    /* Retrait des erreurs sur l'élément */
    removeError(formDataElement);

    switch (input.name) {
      case "first":
        if (input.value) {
          if (input.value.length > 0) {
            isValid = validateFirstName(input.value);
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
            isValid = validateLastName(input.value);
            if (isValid) {
              data.first = input.value;
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

      case "birthdate":
        if (input.value) {
          let birthDate = new Date(input.value);
          let currentDate = new Date();
          let minDate = new Date(currentDate);
          let maxDate = new Date(currentDate);

          // Âge minimum de 16 ans
          minDate.setFullYear(currentDate.getFullYear() - 16);
          // Âge maximum de 100 ans
          maxDate.setFullYear(currentDate.getFullYear() - 100);

          if (
            !isNaN(birthDate.getTime()) &&
            birthDate.getTime() <= minDate.getTime() &&
            birthDate.getTime() >= maxDate.getTime()
          ) {
            isValid = true;
            data.birthdate = input.value;
			return;
          } else {
            error =
              "Il faut avoir plus de 16 ans pour s'inscrire";
          }
        } else {
          error = "Veuillez compléter le champ";
        }
        setError(formDataElement, error);
        break;

      case "quantity":
        if (input.value && !isNaN(input.value)) {
          isValid = true;
          data.quantity = parseInt(input.value);
        } else {
          error = "Veuillez saisir une quantité valide";
        }
        break;
      case "location":
        let checkedLocations = document.querySelectorAll(
          'input[name="location"]:checked'
        );
        if (checkedLocations.length > 0) {
          isValid = true;
          data.location = checkedLocations[0].value;
          return;
        } else {
          error = "Veuillez choisir une location";
        }
        setError(formDataElement, error);
        break;
      default:
        break;
    }
  });
  console.log(data);
}

// Validate functions
function validateFirstName(firstName) {
  if (firstName.length <= 30) {
    return /^[a-zA-Z]+(?:-[a-zA-Z]+){0,2}$/.test(firstName);
  }
  return false;
}

function validateLastName(lastName) {
  if (lastName.length <= 30) {
    return /^[a-zA-Z]+(?:-[a-zA-Z]+){0,2}$/.test(lastName);
  }
  return false;
}

function validateEmail(email) {
  if (email.length <= 255) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
  return false;
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
}

function setError(element, error) {
  element.setAttribute("data-error", error);
  element.setAttribute("data-error-visible", "true");
}

function removeError(element) {
  element.removeAttribute("data-error");
  element.removeAttribute("data-error-visible");
}
