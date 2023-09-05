import { bookService } from '../services/book.service.js'
import { ReviewList } from "./ReviewList.jsx"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function AddReview() {
  const [reviewToEdit, setReviewToEdit] = useState(null)
  const [reviews, setReviews] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    _getReviewsFromStorage()
  }, [])


  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setReviewToEdit(prevReviewToEdit => ({ ...prevReviewToEdit, [field]: value }))
  }

  function _getReviewsFromStorage() {
    bookService.get(params.bookId)
      .then(book => setReviews(book.reviews))
  }

  function onSaveReview(ev) {
    ev.preventDefault()
    const bookId = params.bookId
    bookService.addReview(bookId, reviewToEdit)
      .then(_getReviewsFromStorage)
      .then(eventBusService.showSuccessMsg('Review Sent!'))
      .catch(err => {
        console.log('Error:', err)
        eventBusService.showErrorMsg('Error - Couldn\'t published review')
      })
  }

  return (
    <section className="book-edit">
      <ReviewList reviews={reviews} />

      <form onSubmit={onSaveReview} onChange={handleChange}>
        <label htmlFor="fullName">Your name:</label>
        <input type="text" name="fullName" id="fullName" required />

        <label htmlFor="rating">Rating:</label>
        <select defaultValue={1} id="rating" name="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="readAt">Read at:</label>
        <input type="date" name="readAt" id="readAt" required />

        <button>Post</button>
      </form>
    </section>
  )
}
