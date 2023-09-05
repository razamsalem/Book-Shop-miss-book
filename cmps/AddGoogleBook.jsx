const { useState, useEffect, Fragment } = React
const { useNavigate } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

export function AddGoogleBook() {
    let [books, setBooks] = useState(null)

    const navigate = useNavigate()


    function getBooksFromGoogle(keyword) {
        bookService.getGoogleBooks(keyword)
            .then(setBooks)
            .catch(err => console.log('Error:', err))
    }

    function saveGoogleBook(book) {
        bookService.save(book)
            .then(navigate('/book'))
    }

    function onChangeKeyword(ev) {
        let keyword = ev.target.value
        keyword = encodeURIComponent(keyword)
        getBooksFromGoogle(keyword)
    }

    function SearchBar({ onChangeKeyword }) {
        return (
            <div>
                <button onClick={onBack}><i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i></button>
                <input className="google-search" type="text" onChange={utilService.debounce(onChangeKeyword, 300)} placeholder="Search for a book.." />
            </div>
        )
    }

    function onBack() {
        navigate('/book')
    }

    if (!books) {
        return (
            <Fragment>
                <SearchBar onChangeKeyword={onChangeKeyword} />
                <br />
                <br />
                <span className="google-span">Search a book to begin..</span>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <SearchBar onChangeKeyword={onChangeKeyword} />

            <ul className="google-books clean-list">
                {books.map(book => {
                    return (
                        <li key={book.thumbnail}>
                            <h5 className="google-book-title"> <img src={book.thumbnail} /> {book.title}
                                <button onClick={() => { saveGoogleBook(book) }}><i className="fa-solid fa-plus"></i></button>
                            </h5>
                        </li>)
                })}
            </ul>
        </Fragment>
    )
}


