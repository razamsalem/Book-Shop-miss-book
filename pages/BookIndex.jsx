import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => console.log('err:', err))
  }, [filterBy])

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
        showSuccessMsg(`Car Removed ${bookId}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg(`Problem removing book ${bookId}`)
      })
  }

  if (!books) return <div> Loading... </div>
  return (
    <section className="book-index">
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <button><Link to="/book/add-g-book" className="add-book">Add Book from google</Link></button>
      <button><Link to="/book/edit">Add custom book</Link></button>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
