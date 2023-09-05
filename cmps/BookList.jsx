import { BookPreview } from './BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <BookPreview book={book} />
          <section>
            <button className="remove-btn" onClick={() => { onRemoveBook(book.id) }}><i className="fa-solid fa-xmark"></i></button>
            <button> <Link to={`/book/${book.id}`}><i className="fa-brands fa-readme"></i></Link></button>
            <button> <Link to={`/book/edit/${book.id}`}><i className="fa-regular fa-pen-to-square"></i></Link></button>
          </section>
        </li>
      ))}
    </ul>
  )
}
