import React from "react"

const SearchResults = ({ shouldShow }) => {
  const visibilityClass = shouldShow ? "is-active" : ""

  return (
    <div id="searchResults" className={`modal ${visibilityClass}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Search Results</p>
          <button className="delete" aria-label="close"></button>
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

const SearchBar = ({ handleSearch }) => {
  return (
    <form className="control" onSubmit={handleSearch}>
      <input
        className="input"
        type="search"
        placeholder="Search..."
      />
    </form>
  )
}

export { SearchBar, SearchResults }