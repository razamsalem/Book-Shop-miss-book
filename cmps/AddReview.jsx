import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useState } = React
const { useNavigate, useParams } = ReactRouterDOM

export function AddReview() {
  const [reviewToAdd, setReviewToAdd] = useState(bookService.getEmptyReview())
  const navigate = useNavigate()
  const params = useParams()

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

    setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
  }

  function onSaveReview(ev) {
    ev.preventDefault()
    bookService
      .addReview(params.bookId, reviewToAdd)
      .then((book) => {
        console.log('book', book)
        navigate(`/book/${book.id}`)
        // showSuccessMsg(`Review has been published successfully`)
        return book
      })
      .catch((err) => console.log('err:', err))
  }

  const { fullName, rating, readAt } = reviewToAdd

  return (
    <section className="book-edit">
      <form onSubmit={onSaveReview}>
        <label htmlFor="fullName">Full name:</label>
        <input
          onChange={handleChange}
          value={fullName}
          type="text"
          name="fullName"
          id="fullName"
        />

        <label htmlFor="rating">Rating:</label>
        <input
          onChange={handleChange}
          value={rating}
          type="number"
          name="rating"
          id="rating"
        />

        <label htmlFor="readAt">Read at:</label>
        <input
          onChange={handleChange}
          value={readAt}
          type="date"
          name="readAt"
          id="readAt"
        />
        <button>Post</button>
      </form>
    </section>
  )
}
