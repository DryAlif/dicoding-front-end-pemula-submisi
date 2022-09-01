const UNCOMPLETED_BOOKSHELF_LIST_ID = 'RakBelumSelesaiBaca';
const COMPLETED_BOOKSHELF_LIST_ID = 'RakSelesaiBaca';
const BOOKSHELF_BOOKID = 'bookId';

function addToBookShelf() {
  const uncompletedBookList = document.getElementById(
    UNCOMPLETED_BOOKSHELF_LIST_ID
  );
  const completedBookList = document.getElementById(
    COMPLETED_BOOKSHELF_LIST_ID
  );

  const completed_UlElement = completedBookList.querySelector(
    `#${COMPLETED_BOOKSHELF_LIST_ID} > ul`
  );
  const uncompleted_UlElement = uncompletedBookList.querySelector(
    `#${UNCOMPLETED_BOOKSHELF_LIST_ID} > ul`
  );

  const bookTitleText = document.querySelector('#inputBookTitle').value;
  const bookAuthorText = document.querySelector('#inputBookAuthor').value;
  const bookYearText = document.querySelector('#inputBookYear').value;
  const bookReadStatusChecked = document.querySelector(
    '#inputBookIsComplete:checked'
  )
    ? true /* selesai di baca */
    : false; /* Belum selesai di baca */

  const bookItems = makeBook(
    bookTitleText,
    bookAuthorText,
    bookYearText,
    bookReadStatusChecked
  );

  const booksObject = composeBookObject(
    bookTitleText,
    bookAuthorText,
    bookYearText,
    bookReadStatusChecked
  );

  bookItems[BOOKSHELF_BOOKID] = booksObject.id;
  books.push(booksObject);

  bookReadStatusChecked === true
    ? completed_UlElement.append(bookItems) /* append ke list selesai dibaca */
    : uncompleted_UlElement.append(
        bookItems
      ) /* append ke list Belum selesai dibaca */;

  updateDataToStorage();
}

function makeBook(
  BookTitle /* String */,
  BookAuthor /* String */,
  BookYear /* Number */,
  bookReadStatusChecked /* Boolean */
) {
  //
  let btnMoreInfo;
  const CheckedStatus = bookReadStatusChecked;
  const button_wrapper = document.createElement('div');
  button_wrapper.classList.add('button-wrapper');

  /* selesai dibaca maka isi text harus kebalikan nya*/
  btnMoreInfo = CheckedStatus === true ? 'Belum selesai' : 'Selesai dibaca';

  button_wrapper.append(
    createSwitchListButton(btnMoreInfo, 'alt', CheckedStatus),
    createDeleteButton()
  );

  const textBookYear = document.createElement('p');
  textBookYear.innerText = BookYear;

  const textBookAuthor = document.createElement('p');
  textBookAuthor.innerText = BookAuthor;

  const textBookTitle = document.createElement('h3');
  textBookTitle.innerText = BookTitle;

  const ListContainer = document.createElement('li');
  ListContainer.classList.add('card');
  ListContainer.append(
    textBookTitle,
    textBookAuthor,
    textBookYear,
    button_wrapper
  );

  return ListContainer;
}

function DeleteBook(bookElement) {
  const bookElementPosition = findBookIndex(bookElement[BOOKSHELF_BOOKID]);
  books.splice(bookElementPosition, 1);
  bookElement.remove();
  updateDataToStorage();
}

function createButton(buttonText, buttonTypeClass, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.innerText = buttonText;
  button.addEventListener('click', function (event) {
    eventListener(event);
  });
  return button;
}

function createDeleteButton() {
  return createButton('Hapus Buku' /*Text*/, 'red' /*Class*/, function (event) {
    // console.log(event.target.parentElement.parentElement);
    Confirm.open({
      title: 'Delete Book',
      message: 'Are you Sure you want to Delete this?',
      okText: 'Yes, Delete',
      cancelText: 'No, Cancel',
      onok: () => {
        DeleteBook(event.target.parentElement.parentElement);
        // console.log(event.target.parentElement.parentElement);
      },
    });
  });
}

function createSwitchListButton(innerText, colorClass, ReadStatus) {
  return createButton(
    innerText /* Text */,
    colorClass /*Class*/,
    function (event) {
      //   console.log(event.target.parentElement.parentElement);
      if (ReadStatus !== true) {
        /* data buku dari "Belum selesai dibaca / uncompleted list", 
            harus bisa pindah ke "seleasai dibaca / completed list"*/
        addBookToCompleted(event.target.parentElement.parentElement);
      } else {
        /* dan sebalik nya dari complete bisa ke uncomplete */
        undo__addBookToUncompleted(event.target.parentElement.parentElement);
      }
    }
  );
}

function addBookToCompleted(bookElement) {
  console.log(bookElement);

  const bookTitleText = bookElement.querySelector('h3').innerText;
  const bookAuthorText = bookElement.querySelector('p:first-of-type').innerText;
  const bookYearText = bookElement.querySelector('p:last-of-type').innerText;
  const bookReadStatus = true;

  const completedBookList = document.getElementById(
    COMPLETED_BOOKSHELF_LIST_ID
  );

  const completed_UlElement = completedBookList.querySelector(
    `#${COMPLETED_BOOKSHELF_LIST_ID} > ul`
  );

  const bookItems = makeBook(
    bookTitleText,
    bookAuthorText,
    bookYearText,
    bookReadStatus
  );
  const updatedBook = findBook(bookElement[BOOKSHELF_BOOKID]);
  updatedBook.isCompleted = true;
  bookItems[BOOKSHELF_BOOKID] = updatedBook.id;

  completed_UlElement.append(bookItems);
  bookElement.remove();

  updateDataToStorage();
}

function undo__addBookToUncompleted(bookElement) {
  const bookTitleText = bookElement.querySelector('h3').innerText;
  const bookAuthorText = bookElement.querySelector('p:first-of-type').innerText;
  const bookYearText = bookElement.querySelector('p:last-of-type').innerText;
  const bookReadStatus = false;
  const uncompletedBookList = document.getElementById(
    UNCOMPLETED_BOOKSHELF_LIST_ID
  );
  const uncompleted_UlElement = uncompletedBookList.querySelector(
    `#${UNCOMPLETED_BOOKSHELF_LIST_ID} > ul`
  );

  const bookItems = makeBook(
    bookTitleText,
    bookAuthorText,
    bookYearText,
    bookReadStatus
  );

  const updatedBook = findBook(bookElement[BOOKSHELF_BOOKID]);
  updatedBook.isCompleted = false;
  bookItems[BOOKSHELF_BOOKID] = updatedBook.id;

  uncompleted_UlElement.append(bookItems);
  bookElement.remove();

  updateDataToStorage();
}

function refreshDataFromBooks() {
  const uncompletedBookList = document.getElementById(
    UNCOMPLETED_BOOKSHELF_LIST_ID
  );
  const completedBookList = document.getElementById(
    COMPLETED_BOOKSHELF_LIST_ID
  );

  const completed_UlElement = completedBookList.querySelector(
    `#${COMPLETED_BOOKSHELF_LIST_ID} > ul`
  );
  const uncompleted_UlElement = uncompletedBookList.querySelector(
    `#${UNCOMPLETED_BOOKSHELF_LIST_ID} > ul`
  );

  for (book of books) {
    const bookItems = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );

    bookItems[BOOKSHELF_BOOKID] = book.id;

    if (book.isCompleted) {
      completed_UlElement.append(bookItems);
    } else {
      uncompleted_UlElement.append(bookItems);
    }
  }
}
