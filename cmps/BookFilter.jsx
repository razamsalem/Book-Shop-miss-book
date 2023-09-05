const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

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

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { txt, maxPrice, minPages } = filterByToEdit
  return (
    <section className="book-filter">
      <h2>Filter Books</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="TitleSearchInput">Title:</label>
        <input
          value={txt}
          onChange={handleChange}
          type="text"
          placeholder="Search Your Wanted Book"
          id="TitleSearchInput"
          name="txt"
        />

        <label htmlFor="maxPriceFilter">Max Price:</label>
        <input
          value={maxPrice}
          onChange={handleChange}
          type="number"
          placeholder="Maximal Price"
          id="maxPriceFilter"
          name="maxPrice"
        />

        <label htmlFor="minPagesFilter">Min Pages:</label>
        <input
          value={minPages}
          onChange={handleChange}
          type="number"
          placeholder="Looking for a challenge?"
          id="minPagesFilter"
          name="minPages"
        />

        <button>Search</button>
      </form>
    </section>
  )
}
