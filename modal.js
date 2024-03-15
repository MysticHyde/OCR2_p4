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
const form = document.querySelector("form")

let formIsValid = false
let errorList = {
	first: null, last: null, email: null, birthdate: null, quantity: null, location: null
}


let data = {
	first: String, last: String, email: String, birthdate: Date, quantity: Number, location: String
};

// open and close modal event
modalOpenBtn.forEach((btn) => btn.addEventListener("click", openModal));
modalCloseBtn.addEventListener("click", closeModal);

// Form submit event
form.addEventListener('submit', (e) => {
	e.preventDefault();
	resetData();
	handleSubmit();
});

// Form submit function
function handleSubmit() {
	formData.forEach(formDataElement => {
		let input = formDataElement.querySelector('input');
		let isValid;
		let error;

		switch (input.name) {
			case 'first':
				removeError(formDataElement)
				if (input.value) {
					if (input.value.length > 0) {
						isValid = validateFirstName(input.value)
						if (isValid) {
							data.first = input.value
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

				setError(formDataElement, error)

				break;
			case 'last':
				removeError(formDataElement)
				if (input.value) {
					if (input.value.length > 0) {
						isValid = validateLastName(input.value)
						if (isValid) {
							data.first = input.value
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
				setError(formDataElement, error)
				break;
			// case 'email':
			// 	isValid = validateEmail(input.value);
			// 	if (!isValid) {
			// 		error = "Adresse email non valide";
			// 		formDataElement.setAttribute('data-error', error);
			// 	}
			// 	break;
			// 	break;
			// case 'birthdate':
			// 	break;
			// case 'quantity':
			// 	break;
			// case 'location':
			// 	break;
			default:
				break;
		}
	});
}


// Validate functions
function validateFirstName(firstName) {
	// First name can be compound, e.g., Jean-Charles, but limited to 2 hyphens
	if (firstName.length <= 30) {
		return /^[a-zA-Z]+(?:-[a-zA-Z]+){0,2}$/.test(firstName);
	}
	return false;
}

function validateLastName(lastName) {
	// Last name limited to 30 characters
	if (lastName.length <= 30) {
		return /^[a-zA-Z]+(?:-[a-zA-Z]+){0,2}$/.test(lastName);
	}
	return false;
}

function validateEmail(email) {
	// Email address should contain @ and end with .fr or .com
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
	data.first = '';
	data.last = '';
	data.email = '';
	data.birthdate = '';
	data.quantity = '';
	data.location = '';
}

function setError(element, error) {
	element.setAttribute('data-error', error);
	element.setAttribute('data-error-visible', 'true');
}

function removeError(element) {
	element.setAttribute('data-error', '');
	element.setAttribute('data-error-visible', 'false');
}
