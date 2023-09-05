import { utilService } from '../services/util.service.js'

export function BookPreview({ book }) {
  function getBookPrice() {
    let price = book.listPrice.price
    let currencyCode = utilService.getCurrencySymbol(book.listPrice.currencyCode)
    return ` ${currencyCode}${price}`
  }

  return (
    <article className="book-preview">
      <h1>{book.title}</h1>
      <h4>{book.subtitle}</h4>
      <h5>{book.pageCount} pages</h5>
      <h5>{getBookPrice()}</h5>
      <img src={book.thumbnail} alt="Book picture" />
    </article>
  )
}
