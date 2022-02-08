import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"

const SearchResults = ({ results, shouldShow, handleClose }) => {
  const visibilityClass = shouldShow ? "is-active" : ""

  return (
    <div id="searchResults" className={`modal ${visibilityClass}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Search Results</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
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

const SearchBar = ({ index, store }) => {
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const results = useFlexSearch(query, index, store)

  const handleSearch = e => {
    e.preventDefault()
    setShowResults(true)
  }

  const handleClose = e => {
    setShowResults(false)
  }

  return (
    <>
      <form className="control" onSubmit={handleSearch}>
        <input className="input" type="search" placeholder="Search..." 
          onChange={(e) => setQuery(e.target.value)} />
      </form>

      <SearchResults results={results} shouldShow={showResults} handleClose={handleClose} />
    </>
  )
}

export { SearchBar, SearchResults }
