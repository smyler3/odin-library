// Library collection
const myLibrary = [];

// Object representing a book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Returns a string explaining the book information
Book.prototype.info() = function() {
    return (title + " by " + author + ", " + pages + " pages, " + (read ? "already read" : "not yet read"));
}

// Adds a book to the library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Loops through each book and displays on the page
function displayBooks() {
    for (let book in myLibrary) {

    }
}

const theRingSetsOut = new Book("The Ring Sets Out", "J.R.R Tolkien", 1168, true);
const theRingGoesSouth = new Book("The Ring Goes South", "J.R.R Tolkien", 253, false);
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

addBookToLibrary(theRingSetsOut);
addBookToLibrary(theRingGoesSouth);
addBookToLibrary(theHobbit);