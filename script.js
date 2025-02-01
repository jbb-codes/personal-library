class Library {
  constructor() {
    this.myLibrary = [];
  }

  addBookToLibrary(book) {
    this.myLibrary.push(book);
  }

  removeBook(bookId) {
    const findBook = this.myLibrary.findIndex(
      (element) => element.bookId === bookId
    );
    this.myLibrary.splice(findBook, 1);
  }

  toggleReadStatus(bookId) {
    const findBook = this.myLibrary.find(
      (element) => element.bookId === bookId
    );
    findBook.Read = !findBook.Read;
  }

  showBooks() {
    const gridContainer = document.querySelector("#grid-container");
    gridContainer.textContent = "";
    this.myLibrary.forEach((element) => {
      let gridItem = document.createElement("div");
      gridItem.setAttribute("class", `grid-item ${element.bookId}`);
      gridContainer.appendChild(gridItem);

      for (let key in element) {
        if (key !== "BookId") {
          const propText = document.createElement("p");
          propText.textContent = `${key}: ${element[key]}`;
          gridItem.appendChild(propText);
        }
      }

      const readBtn = document.createElement("button");
      readBtn.classList.add("read-btn");
      gridItem.appendChild(readBtn);
      if (element.Read === true) {
        readBtn.textContent = "Not Read";
      } else if (element.Read === false) {
        readBtn.textContent = "Read";
      }

      readBtn.addEventListener("click", () => {
        this.toggleReadStatus(element.bookId);
        this.showBooks();
      });

      const remBtn = document.createElement("button");
      gridItem.appendChild(remBtn);
      remBtn.setAttribute("id", "remove-btn");
      remBtn.textContent = "Remove Book";
      remBtn.onclick = () => {
        this.removeBook(element.bookId);
        this.showBooks();
      };
    });
  }
}

class Book {
  static id = 0;
  constructor(title, author, numPages, read) {
    this.BookId = `${++Book.id}`;
    this.Title = title;
    this.Author = author;
    this.NumPages = numPages;
    this.Read = read;
  }
}

const myLibrary = new Library();
const book1 = new Book("White Nights", "F. Dostoyevsky", "50", true);

myLibrary.addBookToLibrary(book1);
myLibrary.showBooks();

const newBookDialog = document.querySelector("#new-book-dialog");

const showAddBookDialog = document.querySelector("#show-add-book-dialog-btn");
showAddBookDialog.addEventListener("click", () => {
  newBookDialog.showModal();
});

const submitForm = document.querySelector("#book-form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newBookTitleInput = document.querySelector("#form-title").value;
  let newBookAuthorInput = document.querySelector("#form-author").value;
  let newBookNumPagesInput = document.querySelector("#form-num-pages").value;
  let newBookReadInput = document.querySelector("#form-is-read").checked;
  myLibrary.addBookToLibrary(
    new Book(
      newBookTitleInput,
      newBookAuthorInput,
      newBookNumPagesInput,
      newBookReadInput
    )
  );
  newBookDialog.close();
  submitForm.reset();
  myLibrary.showBooks();
});
