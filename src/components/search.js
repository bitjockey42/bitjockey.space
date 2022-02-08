import React, { useState } from "react"

const SearchResults = ({ shouldShow, handleClose }) => {
  const visibilityClass = shouldShow ? "is-active" : ""

  return (
    <div id="searchResults" className={`modal ${visibilityClass}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Search Results</p>
          <button className="delete" aria-label="close" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body">
          <ul>
            <li>Test</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

const SearchBar = () => {
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("onSubmit here")
    setShowResults(true)
  }

  const handleClose = (e) => {
    setShowResults(false)
  }

  return (
    <>
      <form className="control" onSubmit={handleSearch}>
        <input
          className="input"
          type="search"
          placeholder="Search..."
        />
      </form>

      <SearchResults shouldShow={showResults} handleClose={handleClose} />
    </>
  )
}

export { SearchBar, SearchResults }