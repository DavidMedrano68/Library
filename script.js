const bookContainer = document.querySelector('.book-container')
const newBookButton = document.querySelector('.newBook')
const popup = document.querySelector('.popup')
const closeButton = document.querySelector('.exitButton')
const submitForm = document.querySelector('.form')
const formTitle = document.querySelector('.formTitle')
const formAuthor = document.querySelector('.formAuthor')
const formPages = document.querySelector('.formPages')
const formRead = document.querySelector('.formRead')

submitForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let titleData = formTitle.value
    let authorData =formAuthor.value
    let pageData =  formPages.value
    let readData 
    formRead.checked ? readData = true: readData = false
    function clearDisplayForm(){
        formTitle.value = ''
        formAuthor.value = ''
        formPages.value = ''
        formRead.checked = false
    }
    let book = new Book(titleData,authorData,pageData,readData)
    book.addBook()
    book.makeBookDiv()
    removeDisplayForm()
    clearDisplayForm()
})
closeButton.addEventListener('click',removeDisplayForm)
newBookButton.addEventListener('click',displayForm)

let library = []
function removeDisplayForm(){
    popup.classList.remove('open-popup')
}
function displayForm(){
    popup.classList.add('open-popup')
}

class Book{

    constructor(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
addBook(){
    library.push(this)
}
switchBool(){
    this.read = !this.read
}
changeReadButton(event){
    if(this.read === true){
        event.textContent = 'Read';
        event.className='green'
    }
    if(this.read === false){
            event.textContent = 'Not read';
            event.className='red'
    }
}

makeBookDiv(){
    let bookObj = document.createElement('div')
    bookObj.setAttribute('class','book')
    let divTitle =document.createElement('div')
    divTitle.setAttribute('class','title')
    divTitle.textContent = `${this.title}`
    bookObj.appendChild(divTitle)
    let divAuthor =document.createElement('div')
    divAuthor.setAttribute('class','author')
    divAuthor.textContent = `${this.author}`
    bookObj.appendChild(divAuthor)
    let divPages = document.createElement('div')
    divPages.setAttribute('class','pages')
    divPages.textContent = `${this.pages}`
    bookObj.appendChild(divPages);
    let readButton = document.createElement('div')
    readButton.setAttribute('class','read')
    bookObj.appendChild(readButton)
    let rButton = document.createElement('button')
    rButton.addEventListener('click',(e)=>{
        this.switchBool()
        this.changeReadButton(e.target)
    })
    if(this.read === true){
    rButton.textContent = 'Read';
    rButton.classList.add('green')
    readButton.appendChild(rButton)}
    if(this.read === false){
        rButton.textContent = 'Not read';
        rButton.classList.add('red')
        readButton.appendChild(rButton)
    }
    let remove = document.createElement('button')
    remove.setAttribute('class','red')
    remove.textContent = 'Remove'
    remove.addEventListener('click',(e)=>{
        e.target.parentElement.parentElement.remove()
    })
    let removeButton = document.createElement('div')
    removeButton.setAttribute('class','remove')
    removeButton.appendChild(remove)
    bookObj.appendChild(removeButton);
    bookContainer.appendChild(bookObj)
    console.log(library)
}
}