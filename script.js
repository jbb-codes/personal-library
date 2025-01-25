class myLibrary {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    this.books = this.books.filter((b) => b !== book);
  }
}

const library = new myLibrary();
library.addBook(new Book("White Nights", "F. Dostoyevsky", "50", true));

class Book {
  id = 0;
  constructor(title, author, numPages, read) {
    this.bookId = ++Book.id;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }
}

//---------------------------------------------------------------------------//

const myLibrary = [];
Book.id = 0;

function Book(title, author, numPages, read) {
  this.bookId = `${++Book.id}`;
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

const newBookDialog = document.querySelector("#new-book-dialog");

function addBookToLibrary() {
  let newBookTitleInput = document.querySelector("#form-title").value;
  let newBookAuthorInput = document.querySelector("#form-author").value;
  let newBookNumPagesInput = document.querySelector("#form-num-pages").value;
  let newBookReadInput = document.querySelector("#form-is-read").checked;
  myLibrary.push(
    new Book(
      newBookTitleInput,
      newBookAuthorInput,
      newBookNumPagesInput,
      newBookReadInput
    )
  );
}

const showAddBookDialog = document.querySelector("#show-add-book-dialog-btn");
showAddBookDialog.addEventListener("click", () => {
  newBookDialog.showModal();
});

const submitForm = document.querySelector("#book-form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  newBookDialog.close();
  submitForm.reset();
  showBooks();
});

function showBooks() {
  const gridContainer = document.querySelector("#grid-container");
  gridContainer.textContent = "";
  myLibrary.forEach((element) => {
    let gridItem = document.createElement("div");
    gridItem.setAttribute("class", `grid-item ${myLibrary.bookId}`);
    gridContainer.appendChild(gridItem);

    for (key in element) {
      if (key !== "bookId") {
        const propText = document.createElement("p");
        propText.textContent = `${key}: ${element[key]}`;
        gridItem.appendChild(propText);
      }
    }

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    gridItem.appendChild(readBtn);
    if (element.read === true) {
      readBtn.textContent = "Not Read";
    } else if (element.read === false) {
      readBtn.textContent = "Read";
    }

    readBtn.addEventListener("click", () => {
      if (element.read === true) {
        readBtn.textContent = "Read";
        element.read = false;
      } else if (element.read === false) {
        readBtn.textContent = "Not Read";
        element.read = true;
        readProp.textContent = `${key}: ${element.read}`;
      }
    });

    const remBtn = document.createElement("button");
    gridItem.appendChild(remBtn);
    remBtn.setAttribute("id", "remove-btn");
    remBtn.textContent = "Remove Book";
    remBtn.onclick = remBook;
  });
}

function remBook() {
  const bookId = this.parentElement.classList[1];
  const findBook = myLibrary.findIndex((element) => element.bookId === bookId);
  myLibrary.splice(findBook, 1);
  this.parentElement.remove();
}

const book = new Book("White Nights", "F. Dostoyevsky", "50", true);
const book2 = new Book("Washington", "Ron Chernow", "500", false);
myLibrary.push(book);
myLibrary.push(book2);
showBooks();
