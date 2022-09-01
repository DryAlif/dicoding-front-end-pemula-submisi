const form = document.getElementById('form');
const checkbox = document.querySelector(
  'input[type=checkbox][id=inputBookIsComplete]'
);
const rakButton = document.querySelector('#bookSubmit');
let rakButtonText = rakButton.firstElementChild;
function checkRequired(input) {
  let valid = false;

  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} wajib di isi`);
  } else {
    showSuccess(input);
    valid = true;
  }

  return valid;
}

// Check input length
function checkLength(input, min, max) {
  let valid = false;
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be no more than ${max} characters`
    );
  } else {
    showSuccess(input);
    valid = true;
  }

  return valid;
}

function getFieldName(input) {
  return (
    input.dataset.validation.charAt(0).toUpperCase() +
    input.dataset.validation.slice(1)
  );
}

function showError(input, message) {
  const formControl = input;
  formControl.classList.add('form__input--error');
  const small = formControl.parentElement.querySelector('span');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input;
  formControl.classList.remove('form__input--error');
  const small = formControl.parentElement.querySelector('span');
  small.innerText = '';
}
