import React, { useState } from "react"

const SearchResults = ({ shouldShow }) => {
  const visibilityClass = shouldShow ? "box" : ""

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

const SearchBar = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log("onSubmit")
  }

  return (
    <form className="control" onSubmit={handleOnSubmit}>
      <input
        className="input"
        type="search"
        placeholder="Search..."
      />
    </form>
  )
}

export { SearchBar, SearchResults }