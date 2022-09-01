// event listener
const form = document.getElementById('form');
const checkbox = document.querySelector(
  'input[type=checkbox][id=inputBookIsComplete]'
);
const rakButton = document.querySelector('#bookSubmit');
let rakButtonText = rakButton.firstElementChild;

function checkRequired(input) {
  let valid = false;
  //   inputArr.forEach(function (input) {
  // console.log(input);
  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} wajib di isi`);
  } else {
    showSuccess(input);
    valid = true;
  }
  //   });
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
      `${getFieldName(input)} must be less than ${max} characters`
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

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const bookTitleText = document.querySelector('#inputBookTitle');
  const bookAuthorText = document.querySelector('#inputBookAuthor');
  const bookYearText = document.querySelector('#inputBookYear');
  let isTitleValid = checkRequired(bookTitleText);
  let isAuthorValid = checkRequired(bookAuthorText);
  let isYeareValid = checkRequired(bookYearText);
  let isYearLenght = checkLength(bookYearText, 4, 4);

  let isFormValid =
    isTitleValid && isAuthorValid && isYeareValid && isYearLenght;

  if (isFormValid) {
    console.log('all form valid');
    // document.body.style.backgroundColor = 'red';
  }
});

checkbox.addEventListener('change', function (event) {
  if (event.target.checked) {
    //   alert(`${event.target.value} is checked`);
    rakButtonText.innerText = 'Selesai dibaca';
  } else {
    //   alert(`${event.target.value} is unchecked`);
    rakButtonText.innerText = 'Belum Selesai dibaca';
  }
});

document.querySelectorAll('.form__input').forEach(function (input) {
  input.addEventListener('input', function () {
    input.className = input.className.replace(/form__input--error ?/, '');
  });
});
