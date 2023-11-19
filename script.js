const MIN_PAGE_NUMBER = 1;
const INIT_READ_COLOUR = "#4169E1";
const INIT_UNREAD_COLOUR = "#BC8F8F";
const INDEX_PREFIX = "Book-";

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
        const title = document.getElementById("book-title");
        const author = document.getElementById("book-author");
        const pages = document.getElementById("book-pages");
        const read = document.getElementById("book-read");

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

// Clears the new book form and all associated styles
function resetBookForm() {
    const newBookForm = document.querySelector("#new-book-form");
    const title = document.getElementById("book-title");
    const author = document.getElementById("book-author");
    const pages = document.getElementById("book-pages");

    // Removing error indicators
    title.classList.remove("error-field");
    author.classList.remove("error-field");
    pages.classList.remove("error-field");
    // Clearing form
    newBookForm.reset();
}

function createColourEventListeners() {
    const newReadColour = document.querySelector("#read-colour");
    const newUnreadColour = document.querySelector("#unread-colour");

    // Set new read book colour indicator and recolour all books
    newReadColour.addEventListener("change", () => {
        colourSpines(newReadColour.value, true);
        readColour = newReadColour.value;
    })

    // Set new unread book colour indicator and recolour all books
    newUnreadColour.addEventListener("change", () => {
        colourSpines(newUnreadColour.value, false);
        unreadColour = newUnreadColour.value;
    })
}

function colourSpines(newColour, read) {
    // const books = document.querySelectorAll(".book-card");
    for (let book of myLibrary) {
        if (book.read === read) {
            console.log(book);
            let spine = document.getElementById(INDEX_PREFIX + book.index).querySelector(".book-spine");
            spine.style.backgroundColor = newColour;
            console.log(spine.style.backgroundColor);
            console.log(newColour);
        }
        // if (book.getAttribute("read"))
        // console.log(book);
    }
    // Iterate through list, check if it has old colour, if it does change to the new colour
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
    this.index = bookCount++;
}

/* Returns a string explaining the book information */
Book.prototype.info = function() {
    return (title + " by " + author + ", " + pages + " pages, " + (read ? "already read" : "not yet read"));
}

/* Adds a book to the library */
function addBookToLibrary(book) {
    book.index = myLibrary.length;
    myLibrary.push(book);
}

/* Loops through each book and displays on the page */
function displayBooks() {
    const books = document.querySelector(".books");

    // Creates a book card for each book
    for (let book of myLibrary) {
        // Book already on screen
        if (book.rendered) {
            continue;
        }
        // Book yet to be displayed
        else {
            const bookCard = createBookCard(book); 
            books.appendChild(bookCard);
            book.rendered = true;
        }
    }
}

// Deletes a selected book from the library
function deleteBook(index) {
    const idString = INDEX_PREFIX + index;
    const book = document.getElementById(idString);

    // Searching for book
    for (let i in myLibrary) {
        if (myLibrary[i].index === index) {
            // Re-rendering page
            myLibrary.splice(i, i);
            book.remove();
            displayBooks();
            return;
        }
    }
}

/* Creates and styles the book cards to be displayed on screen */
function createBookCard(book) {
    const card = document.createElement("span");
    const spine = document.createElement("span");
    const title = document.createElement("h2");
    const author = document.createElement("h4");

    // Attaching index position
    card.setAttribute("id", INDEX_PREFIX + book.index);

    // Adding text content
    title.textContent = book.title;
    author.textContent = book.author;

    // Adding remove button
    const deleteBtn = document.createElement("img");

    deleteBtn.setAttribute("data-index", book.index);
    deleteBtn.src = "./icons/delete.svg";
    deleteBtn.title = "Delete";
    deleteBtn.alt = "Remove Button";
    spine.appendChild(deleteBtn);

    // Set's attached book for removal
    deleteBtn.addEventListener("click", () => {
        deleteBook(parseInt(deleteBtn.getAttribute("data-index")));
    })

    // Styling
    card.classList.add("book-card");
    spine.classList.add("book-spine");
    deleteBtn.classList.add("deleteBtn");
    title.classList.add("title");
    author.classList.add("author");
    // Styles based on read status
    spine.style.backgroundColor = (book.read ? readColour : unreadColour);

    // Storing within card
    card.appendChild(spine);
    card.appendChild(title);
    card.appendChild(author);

    return card;
}

// Setup Functions
let readColour = INIT_READ_COLOUR;
let unreadColour = INIT_UNREAD_COLOUR;
createModalEventListeners();
createColourEventListeners();
setMinPages();
let bookCount = 0;

// Initial Data
const myLibrary = [];

// Create Library Collection
addBookToLibrary(new Book("The Ring Sets Out", "J.R.R Tolkien", 1168, true));
addBookToLibrary(new Book("The Ring Goes South", "J.R.R Tolkien", 253, true));
addBookToLibrary(new Book("The Hobbit", "J.R.R Tolkien", 295, false));

// Display on page
displayBooks();