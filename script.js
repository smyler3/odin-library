// Library collection
const myLibrary = [];

// Creates event listeners for interacting with the new book modal
function createModalEventListeners() {
    const addBookModal = document.querySelector("#new-book-modal");
    const showBookModalButton = document.querySelector("#show-book-modal")
    const closeBookModalButton = document.querySelector("#close-book-modal")

    showBookModalButton.addEventListener("click", () => {
        addBookModal.showModal();
    });
}

// Object representing a book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Returns a string explaining the book information
Book.prototype.info = function() {
    return (title + " by " + author + ", " + pages + " pages, " + (read ? "already read" : "not yet read"));
}

// Adds a book to the library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Loops through each book and displays on the page
function displayBooks() {
    const books = document.querySelector(".books");
    console.log(books);

    // Creates a book card for each book
    for (let book of myLibrary) {
        let bookCard = createBookCard(book); 
        books.appendChild(bookCard);
    }
}

// Creates and styles the book cards to be displayed on screen
function createBookCard(book) {
    let card = document.createElement("span");

    // Styling
    card.classList.add("book-card");

    let spine = document.createElement("span");
    spine.classList.add("book-spine");

    // Adding text content
    let title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = book.title;

    let author = document.createElement("h4");
    author.classList.add("author");
    author.textContent = book.author;

    // Storing within card
    card.appendChild(spine);
    card.appendChild(title);
    card.appendChild(author);

    return card;
}

createModalEventListeners();

const theRingSetsOut = new Book("The Ring Sets Out", "J.R.R Tolkien", 1168, true);
const theRingGoesSouth = new Book("The Ring Goes South", "J.R.R Tolkien", 253, false);
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

addBookToLibrary(theRingSetsOut);
addBookToLibrary(theRingGoesSouth);
addBookToLibrary(theHobbit);

displayBooks();