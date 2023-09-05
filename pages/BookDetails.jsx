import { AddReview } from '../cmps/AddReview.jsx'
import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { utilService } from '../services/util.service.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM

export function BookDetails() {
  const date = new Date().getFullYear()
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadRobot()
  }, [params.bookId, params.bookName])

  function loadRobot() {
    bookService
      .get(params.bookId)
      .then((book) => {
        setBook(book)
      })
      .catch((err) => {
        console.log('err:', err)
        navigate('/book')
      })
  }

  function getDynPagesLine() {
    if (book.pageCount >= 500) {
      return '-  Serious Reading'
    } else if (book.pageCount >= 200 && book.pageCount < 500) {
      return '-  Descent Reading'
    } else {
      return '-  Light Reading'
    }
  }

  function getBookPublishedYear() {
    const { publishedDate } = book
    let publishedDateStr = ''

    if (date - publishedDate > 10)
      publishedDateStr = publishedDate + ' - Vintage'
    else if (date - publishedDate <= 1)
      publishedDateStr = publishedDate + ' - New'
    else publishedDateStr = publishedDate

    return publishedDateStr
  }

  function getBookPrice() {
    if (book.listPrice.price > 150) return 'expensive'
    else if (book.listPrice.price < 20) return 'cheap'
  }

  function getBookPrice() {
    let price = book.listPrice.price
    let currencyCode = utilService.getCurrencySymbol(
      book.listPrice.currencyCode
    )
    return `${currencyCode}${price}`
  }

  function onDeleteReview(reviewId) {
    bookService
      .deleteReview(params.bookId, reviewId)
      .then(() => {
        setBook(...book, reviews)
        showSuccessMsg('Review deleted successfully')
      })
      .catch((err) => {
        showErrorMsg('Cannot deleting review')
        console.log('err:', err)
        navigate('/book')
      })
  }

  function onBack() {
    navigate('/book')
  }

  if (!book) return <div>Loading...</div>
  return (
    <section className="book-details">
      <h1>{book.title}</h1>
      <h2>{book.subtitle}</h2>
      <h4>By: {book.authors.join(', ')}</h4>
      <LongTxt txt={book.description} length={100} />
      <img className="banner" src={book.thumbnail} />
      <h5>published date: {getBookPublishedYear()} </h5>
      <h5>
        {book.pageCount} Pages {getDynPagesLine()}
      </h5>
      <h5>Categories: {book.categories.join(', ')}</h5>
      <p>language: {book.language.toUpperCase()} </p>
      <p className={`price ${getBookPrice()}`}>Price: {getBookPrice()}</p>
      {book.listPrice.isOnSale && (
        <img
          className="on-sale"
          src="../assets/img/book-sale.png"
          alt="Book Sale banner"
        />
      )}
      <section className="reviews">
        <h3>Reviews:</h3>
        {(book.reviews &&
          book.reviews.length &&
          book.reviews.map(({ id, fullName, rating, readAt }) => (
            <ul key={params.id + fullName}>
              <li>Name: {fullName}</li>
              <li>Rating: {rating}</li>
              <li>Read At: {readAt}</li>
              <button onClick={() => onDeleteReview(id)}>Remove Review</button>
            </ul>
          ))) ||
          'No Reviews'}
      </section>
      <button>
        <Link to={`/book/${params.bookId}/review`}>Add Review</Link>
      </button>
      <section>
        <Outlet>
          <AddReview />
        </Outlet>
      </section>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
