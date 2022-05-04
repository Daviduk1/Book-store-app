const bookStore = [
    {
        id: '001',
        title:  'Sand of time',
        author: 'Robert Dillinger',
        noOfPages: 403,
        price: 250,
        isAvailable: true,
        reviews: [],
        genre: 'fiction',
        image: 'some-img-url',
    },
    {
        id: '002',
        title:  'Ocean Eyes',
        author: 'Billie Elish',
        noOfPages: 467,
        price: 400,
        isAvailable: true,
        reviews: [],
        genre: 'horror',
        image: 'some-img-url',
    },
    {
        id: '003',
        title:  'Chronicles of jollof rice',
        author: 'chux',
        noOfPages: 467,
        price: 1467,
        isAvailable: false,
        reviews: [],
        genre: 'nutrition',
        image: 'some-img-url',
    },
]

//  Listing books

let bookListContainer = document.querySelector('#books');



function showBooks (key, searchMode) {
    let books =[];
    if (key === 'all') {
        books = bookStore
    } 
    
    
    else if (key) {
        books = bookStore.filter(book => book.genre === key)
    }

    if (searchMode === true) {
        books = bookStore.filter(book => {
            for (let val in book) {
                if (book[val].toString().toLowerCase().includes(key)) {
                    return true
                }
            }

            return false
        })
    }

    let bookList = books.map(book => {
        let color = book.isAvailable ? 'dodger' : 'tomato'
        return (
            `<li class = "book" id = "${book.id}">
                <h3>Title: ${book.title}</h3>
                <p>Title: ${book.author}</p>
                <p>Title: <b>$${book.price}</b></p>
                <button class = "buy">Buy now</button>
                <button class= "add">Add to wishlist</button>
                <button class= "rent" style = "background-color: ${color}">Rent this books</button>
            </li>`
        )
    })
    
    if (bookList.length) {
        bookListContainer.innerHTML = bookList.join ('')
    } else {
        bookListContainer.innerHTML = `<p> we do not have books in that category</p>`
    }
    
}
showBooks('all')

let allTabs = document.querySelectorAll ('.tab')
allTabs.forEach(tab => {
    tab.onclick = () => {
        allTabs.forEach(tab => tab.classList.remove('active'))
        tab.classList.add('active')
        showBooks(tab.innerHTML.toLowerCase())
    }
})

let searchInput = document.querySelector('#search-input');
searchInput.oninput = (evt) => {
    showBooks(evt.target.value, true)
}

// Get all  rent buttons
let rentBtns = document.querySelectorAll('.rent')

rentBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        let bookId = btn.parentElement.id
        let book = bookStore.find(book => book.id === bookId);
        let otherBooks = bookStore.filter   (book => book.id !== bookId)
        if (book.isAvailable) {
            alert('This book is available. you...')
            book.isAvailable = false
            bookStore.concat(otherBooks, bookId)
            btn.style.background = 'tomato';
        } else {
            btn.style.background = 'tomato';
            alert('this book is not available....')
        }
        
    })
})

// Adding to whishlist
let wishlist = []
let allAddBtns = document.querySelectorAll('.add')
allAddBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        if(btn.innerHTML.includes('Add to whishlist')) {
            btn.innerHTML = 'Added to your wishlist'
        } else {
            btn.innerHTML = 'Add to whishlist'
        }
    })
})