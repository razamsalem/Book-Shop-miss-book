import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.bookId) loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBookToEdit)
      .catch((err) => console.log('err', err))
  }

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

    if (field === 'categories' || field === 'authors') value = [value]

    if (field === 'price' || field === 'currencyCode') {
      setBookToEdit((prevBookToEdit) => ({
        ...prevBookToEdit,
        listPrice: {
          ...prevBookToEdit.listPrice,
          [field]: value,
        },
      }))
    } else {
      setBookToEdit((prevBookToEdit) => ({
        ...prevBookToEdit,
        [field]: value,
      }))
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .save(bookToEdit)
      .then(() => {
        navigate('/book')
        showSuccessMsg(`Book Saved Successfully`)
      })
      .catch((err) => {
          console.log('err:', err)
          showErrorMsg(`Book can't be saved: ${err.message}`)
      })
  }

  function onBack() {
    navigate('/book')
  }

  return (
    <React.Fragment>
      <button onClick={onBack}>Back</button>
      <section className="book-edit">
        <form onSubmit={onSaveBook}>
          <label htmlFor="titleEdit">Book Title:</label>
          <input
            value={bookToEdit.title}
            onChange={handleChange}
            type="text"
            placeholder="Moby-Dick"
            name="title"
            id="titleEdit"
            required
          />

          <label htmlFor="subtitleEdit">Subtitle:</label>
          <input
            value={bookToEdit.subtitle}
            onChange={handleChange}
            type="text"
            placeholder="an novel about the sailor Ishmael's narrative of the maniacal quest of Ahab."
            name="subtitle"
            id="subtitleEdit"
            required
          />

          <label htmlFor="authorsEdit">Authors:</label>
          <input
            value={bookToEdit.authors}
            onChange={handleChange}
            type="text"
            placeholder="Herman Melville"
            name="authors"
            id="authorsEdit"
            required
          />

          <label htmlFor="descriptionEdit">description:</label>
          <textarea
            value={bookToEdit.description}
            onChange={handleChange}
            className="desc"
            type="text"
            placeholder="captain of the whaling ship Pequod, for vengeance against Moby Dick, the giant white sperm whale that bit off his leg on the ship's previous voyage."
            name="description"
            rows="3"
            id="descriptionEdit"
            required
          ></textarea>

          <label htmlFor="thumbnail">Picture URL: </label>
          <input
            value={bookToEdit.thumbnail}
            onChange={handleChange}
            type="text"
            placeholder="https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"
            id="thumbnail"
            name="thumbnail"
            required
          />

          <label htmlFor="categories">Categories: </label>
          <input
            value={bookToEdit.categories}
            onChange={handleChange}
            type="text"
            placeholder="Drama, Mystery, Sport"
            id="categories"
            name="categories"
            required
          />

          <div className="input-group">
            <label htmlFor="priceEdit">Price:</label>
            <input
              value={bookToEdit.listPrice.price}
              onChange={handleChange}
              type="number"
              id="priceEdit"
              placeholder="207"
              name="price"
              style={{ width: '50%' }}
              required
            />

            <label className="currency" htmlFor="currencyCode">
              Currency:
            </label>
            <select
              value={bookToEdit.listPrice.currencyCode}
              onChange={handleChange}
              id="currencyCode"
              name="currencyCode"
              style={{ width: '20%' }}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="ILS">ILS</option>
            </select>
          </div>

          <div className="input-group">
            <div className="input-half">
              <label htmlFor="PagesCountEdit">Pages count:</label>
              <input
                value={bookToEdit.pageCount}
                onChange={handleChange}
                type="number"
                placeholder="427"
                id="PagesCountEdit"
                name="pageCount"
                required
              />
            </div>
            <div className="input-half">
              <label htmlFor="publishedDateEdit">Published Year:</label>
              <input
                value={bookToEdit.publishedDate}
                onChange={handleChange}
                type="number"
                placeholder="1851"
                id="publishedDateEdit"
                name="publishedDate"
                required
              />
            </div>
          </div>

          <label htmlFor="language">Language: </label>
          <input
            value={bookToEdit.language}
            onChange={handleChange}
            type="text"
            placeholder="HE, EN, ES, FR"
            id="language"
            name="language"
            required
          />

          <button>Save</button>
        </form>
      </section>
    </React.Fragment>
  )
}
