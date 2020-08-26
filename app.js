const form = document.querySelector('form');
const firstNameInput = form.elements.firstName;
const lastNameInput = form.elements.lastName;
const emailInput = form.elements.email;
const radioButtonGroup = document.querySelector('#radio-group');

let isFormValid = true;

function toggleErrorMessage({ name, errorMessage, node, isValid }) {
  if (!isValid){
    // Adding invalid class to input
    node.classList.remove('valid');
    node.classList.add('invalid');
    // Creating error message
    const errorMessageElement = document.createElement("p");
    errorMessageElement.id = `${name}ErrorMessage`;
    errorMessageElement.innerText = errorMessage;
    node.parentElement.appendChild(errorMessageElement);

    isFormValid = false;
    return;
  }
  // adding valid class name
  node.classList.remove('invalid');
  node.classList.add('valid');
  // Removing error message
  const errorMessageElement = document.querySelector(`#${name}ErrorMessage`);
  if (errorMessageElement) {
    errorMessageElement.remove();
  }
}

function validateInputs() {
  // Validating first Name
  toggleErrorMessage({
    name: 'firstName',
    errorMessage: 'First Name is required!',
    node: firstNameInput,
    isValid: /^\w+$/.test(firstNameInput.value.trim()),
  });

  // Validating Last Name
  toggleErrorMessage({
    name: 'lastName',
    errorMessage: 'Last Name is required!',
    node: lastNameInput,
    isValid: /^\w+$/.test(lastNameInput.value.trim()),
  });

  // Validating Email Input
  toggleErrorMessage({
    name: 'email',
    errorMessage: 'Email is required!',
    node: emailInput,
    isValid: emailInput.validity.valid,
  });

  // Validating Gender
  toggleErrorMessage({
    name: 'gender',
    errorMessage: 'Gender is required!',
    node: radioButtonGroup,
    isValid: (form.elements.maleGender.checked
      || form.elements.femaleGender.checked
      || form.elements.otherGender.checked),
  });
  
  // validating Profession input
  toggleErrorMessage({
    name: 'profession',
    errorMessage: 'Profession is required!',
    node: form.elements.profession,
    isValid: form.elements.profession.value !== 'disabled',
  });
}

form.onsubmit = function(e) {
  e.preventDefault();
  isFormValid = true;

  validateInputs();

  if (isFormValid) {
    window.location = '/thank-you.html';
  }
}