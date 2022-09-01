document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('#searchBookTitle');

  if (isStorageExist()) {
    loadDataFromStorage();
  }

  document.querySelectorAll('.form__input').forEach(function (input) {
    input.addEventListener('input', function () {
      input.className = input.className.replace(/form__input--error ?/, '');
    });
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
      addToBookShelf();
    }
  });

  searchInput.addEventListener('keyup', searchTitle);

  function searchTitle(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.card').forEach(function (li) {
      const bookTitle = li.querySelector('h3').innerText;
      if (bookTitle.toLowerCase().indexOf(text) != -1) {
        li.style.display = 'block';
      } else {
        li.style.display = 'none';
      }
    });
  }
});

document.addEventListener('ondatasaved', () => {
  console.log('Data berhasil di simpan.');
});

document.addEventListener('ondataloaded', () => {
  refreshDataFromBooks();
});
