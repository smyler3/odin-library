const MIN_PAGE_NUMBER = 1;

/* Creates event listeners for interacting with the new book modal */
function createModalEventListeners() {
    const addBookModal = document.querySelector("#new-book-modal");
    const showBookModalBtn = document.querySelector("#show-book-modal");
    const closeBookModalBtn = document.querySelector("#close-book-modal");
    const newBookForm = document.querySelector("#new-book-form");

    // Display modal
    showBookModalBtn.addEventListener("click", () => {
        addBookModal.showModal();
    });

    // Clear form and close modal
    closeBookModalBtn.addEventListener("click", () => {
        resetBookForm();
        addBookModal.close();
    })

    // Check form on submission, clear it, and close modal
    newBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let title = document.getElementById("book-title");
        let author = document.getElementById("book-author");
        let pages = document.getElementById("book-pages");
        let read = document.getElementById("book-read");
        console.log(title.value, author.value, pages.value, read.value);

        // Book doesn't meet criteria
        if (title.value === "") {
            title.classList.add("error-field");
        }
        else if (author.value === "") {
            author.classList.add("error-field");
        } 
        else if (pages.value < MIN_PAGE_NUMBER) {
            pages.classList.add("error-field");
        }    
        // Book meets criteria
        else {
            title.classList.remove("error-field");
            author.classList.remove("error-field");
            pages.classList.remove("error-field");

            addBookToLibrary(new Book(title.value, author.value, pages.value, read.value));
            displayBooks();
            resetBookForm();
            addBookModal.close();
        }
    })
}

function resetBookForm() {
    const newBookForm = document.querySelector("#new-book-form");
    let title = document.getElementById("book-title");
    let author = document.getElementById("book-author");
    let pages = document.getElementById("book-pages");

    // Removing error indicators
    title.classList.remove("error-field");
    author.classList.remove("error-field");
    pages.classList.remove("error-field");
    // Clearing form
    newBookForm.reset();
}

// Sets the minimum page number for books in the library
function setMinPages() {
    const pagesField = document.getElementById("book-pages");

    pagesField.setAttribute("min", MIN_PAGE_NUMBER);
}

/* Object representing a book */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rendered = false;
}

/* Returns a string explaining the book information */
Book.prototype.info = function() {
    return (title + " by " + author + ", " + pages + " pages, " + (read ? "already read" : "not yet read"));
}

/* Adds a book to the library */
function addBookToLibrary(book) {
    myLibrary.push(book);
}

/* Loops through each book and displays on the page */
function displayBooks() {
    const books = document.querySelector(".books");
    console.log(books);

    // Creates a book card for each book
    for (let book of myLibrary) {
        // Book already on screen
        if (book.rendered) {
            continue;
        }
        // Book yet to be displayed
        else {
            let bookCard = createBookCard(book); 
            books.appendChild(bookCard);
            book.rendered = true;
        }
    }
}

/* Creates and styles the book cards to be displayed on screen */
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

// Setup Functions
createModalEventListeners();
setMinPages();

// Initial Data
const myLibrary = [];

// Create Library Collection
addBookToLibrary(new Book("The Ring Sets Out", "J.R.R Tolkien", 1168, true));
addBookToLibrary(new Book("The Ring Goes South", "J.R.R Tolkien", 253, false));
addBookToLibrary(new Book("The Hobbit", "J.R.R Tolkien", 295, false));

// Display on page
displayBooks();