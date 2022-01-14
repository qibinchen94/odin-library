function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + 
                        (this.isRead ? 'already read' : 'not read yet');
}

function changeReadStatus(event) {
    const index = parseFloat(event.target.dataset.index);
    myLibrary[index].isRead = event.target.checked;
}

function removeFromLibrary(event) {
    // Delete from my library table
    const index = parseFloat(event.target.dataset.index);
    document.querySelector(`tr[data-index="${index}"]`).remove();

    // Update the indexes
    for (let i = index + 1; i < myLibrary.length; i++) {
        const row = document.querySelector(`tr[data-index="${i}"]`);
        row.dataset.index = i - 1;
        
        const readStatusInput = document.querySelector(`td input[type="checkbox"][data-index="${i}"]`);
        readStatusInput.dataset.index = i - 1;
        
        const removeBtn = document.querySelector(`td button[data-index="${i}"]`);
        removeBtn.dataset.index = i - 1;
    }

    // Remove from myLibrary array
    myLibrary.splice(index, 1);
}

function addBookToLibrary() {
    // Create a new book obj and add to myLibrary
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseFloat(pagesInput.value);
    const isRead = readStatusInput.value === 'Yes' ? true : false;
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);

    // Create a slider switch for read status
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.index = `${myLibrary.length -1}`;
    input.checked = isRead;
    input.addEventListener('change', changeReadStatus);
    
    const span = document.createElement('span');
    span.classList.add('slider', 'round');
    
    const label = document.createElement('label');
    label.classList.add('switch');
    label.appendChild(input);
    label.appendChild(span);
    
    // Create a 'remove' button
    const btn = document.createElement('button');
    btn.textContent = 'remove';
    btn.dataset.index = `${myLibrary.length - 1}`;
    btn.addEventListener('click', removeFromLibrary);
    
    // Insert new row to the library table
    const row = libraryTable.insertRow(myLibrary.length);
    row.dataset.index = `${myLibrary.length - 1}`;
    row.insertCell(0).textContent = title;
    row.insertCell(1).textContent = author;
    row.insertCell(2).textContent = pages;
    row.insertCell(3).appendChild(label);
    row.insertCell(4).appendChild(btn);
    
    // Clear input values and close form
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatusInput.value = '';
    formPopup.style.display = 'none';
}

function openForm() {
    formPopup.style.display = 'block';
}

function closeForm() {
    formPopup.style.display = 'none';
}

let myLibrary = [];
const newBookBtn = document.querySelector('#new-book-btn');
const formPopup = document.querySelector('.form-popup');
const cancelBtn = document.querySelector('.form-popup .cancel');
const libraryTable = document.querySelector('#library-table');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readStatusInput = document.querySelector('#read-status');

newBookBtn.addEventListener('click', openForm);
cancelBtn.addEventListener('click', closeForm);