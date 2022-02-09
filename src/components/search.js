import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"

const SearchResults = ({ query, results, shouldShow, handleClose }) => {
  const visibilityClass = shouldShow ? "is-active" : ""

  return (
    <div id="searchResults" className={`modal ${visibilityClass}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Search Results for "{query}"</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <ul>
            {results.map((result, i) => (
              <li key={i}>
                <Link to={`/${result.slug}`}>{result.title}</Link>
              </li>
            ))}
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
        <input
          className="input"
          type="search"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
        />
      </form>

      <SearchResults
        query={query}
        results={results}
        shouldShow={showResults}
        handleClose={handleClose}
      />
    </>
  )
}

export { SearchBar, SearchResults }
