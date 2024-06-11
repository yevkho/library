
//1. library array & other variables and DOM selectors
const myLibrary = [];

const cardSection = document.querySelector(".cards")
const tableSection = document.querySelector("table")

const newBookButton = document.querySelector("#newBook");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#closeButton");

let bookTitle = "";
let bookAuthor = "";
let bookPages = "";
let bookReadStatus = "";
let newBook = {};

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatusInput = document.querySelector("#readStatus");
const createButton = document.querySelector("#createButton");

//2. book constructor
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

    //5.2 Book constructor prototype - toggle read status buttons
    Book.prototype.toggleRead = function () {
        if (this.readStatus == "read") {
            this.readStatus = "not read"
        } else {
            this.readStatus = "read"
        }
    };

//3. loop through library and display books
function clearCards () {
    //clears previous cards
    const bookCards = document.querySelectorAll(".bookCard");
    bookCards.forEach((div) => {
        div.remove();
    })
    //clears previous table rows
    const tableRow = document.querySelectorAll(".tableRow");
    tableRow.forEach((tr) => {
        tr.remove();
    })
}

function displayBooks () {
    //clear display 
    clearCards();
    //display library array with cards and table
    myLibrary.forEach(function (item, index) {
        //display each book in a separate card
        let newBookCard = document.createElement("div");
        newBookCard.classList.add("bookCard");
        let cardTitleDiv = document.createElement("div");
        cardTitleDiv.textContent = `Book ${index+1}`;
        newBookCard.appendChild(cardTitleDiv);
        let bookTitleDiv = document.createElement("div");
        bookTitleDiv.textContent = `Title: ${item.title}`;
        newBookCard.appendChild(bookTitleDiv);
        let bookAuthorDiv = document.createElement("div");
        bookAuthorDiv.textContent = `Author: ${item.author}`;
        newBookCard.appendChild(bookAuthorDiv);
        let bookPagesDiv = document.createElement("div");
        bookPagesDiv.textContent = `Pages: ${item.pages}`;
        newBookCard.appendChild(bookTitleDiv);
        let bookReadStatusDiv = document.createElement("div");
        bookReadStatusDiv.textContent = `Read status: ${item.readStatus}`;
        newBookCard.appendChild(bookReadStatusDiv);
        //add 'remove' button
        let removeButton = document.createElement("button")
        removeButton.textContent = "remove";
        removeButton.setAttribute("id","remove");
        removeButton.setAttribute("data-index",`${index}`);
        newBookCard.appendChild(removeButton);
        //add 'read' button
        let readButton = document.createElement("button")
        readButton.textContent = "read";
        readButton.setAttribute("id","read");
        readButton.setAttribute("data-index",`${index}`);
        newBookCard.appendChild(readButton);
        //append card to display
        cardSection.appendChild(newBookCard)
        //set event listeners on 'repeat' and 'remove' buttons
        setRemoveButtons ();
        setToggleButtons ();

        //display each book in table row
        let newTableRow = document.createElement("tr");
        newTableRow.classList.add("tableRow");
        let rowTitleCell = document.createElement("th");
        rowTitleCell.textContent = `Book ${index+1}`;
        newTableRow.appendChild(rowTitleCell);
        let bookTitleCell = document.createElement("td");
        bookTitleCell.textContent = `${item.title}`;
        newTableRow.appendChild(bookTitleCell);
        let bookAuthorCell = document.createElement("td");
        bookAuthorCell.textContent = `${item.author}`;
        newTableRow.appendChild(bookAuthorCell);
        let bookPagesCell = document.createElement("td");
        bookPagesCell.textContent = `${item.pages}`;
        newTableRow.appendChild(bookPagesCell);
        let bookReadStatusCell = document.createElement("td");
        bookReadStatusCell.textContent = `${item.readStatus}`;
        newTableRow.appendChild(bookReadStatusCell);
        tableSection.appendChild(newTableRow);
    })
}

//4. dialogue-form for new books
newBookButton.addEventListener('click', () => {
    dialog.showModal();
})

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
})

createButton.addEventListener('click', (e) => {
    //take user form input
    bookTitle = titleInput.value;
    bookAuthor = authorInput.value;
    bookPages = pagesInput.value;
    bookReadStatus = readStatusInput.value;
    //create new book based on user form input
    newBook = new Book (bookTitle, bookAuthor, bookPages, bookReadStatus);
    //push new book to library array
    myLibrary.push(newBook);
    //display library array 
    displayBooks();
})

//5.1 set 'remove card' buttons & reset feature
function setRemoveButtons () {
    let removeButtons = document.querySelectorAll("#remove[data-index]");
    removeButtons.forEach((item) => {
        if (!item.dataset.listener) {
            item.addEventListener('click', () => {
                myLibrary.splice(item.dataset.index, 1);
                displayBooks ();
            })
            item.setAttribute('data-listener', 'true');
        }
    })
}

//5.2 set 'toggle read status' buttons & reset feature
function setToggleButtons () {
    const toggleButtons = document.querySelectorAll("#read");
    toggleButtons.forEach((item) => {
        if (!item.dataset.read) {
            item.addEventListener('click', () => {
                myLibrary[item.dataset.index].toggleRead();
                displayBooks ();
            })
            item.setAttribute('data-read', 'true');
        }
    })
}