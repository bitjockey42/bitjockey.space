import React from "react"
import { Link } from "gatsby"
import { Hero, HeroBody } from "./hero"
import { SearchBar } from "./search"

const Header = ({ children, showHome }) => {
  return (
    <Hero>
      <HeroBody>
        <div className="columns">
          <div className="column">{children}</div>
          <div className="column is-2">
            {/* <SearchBar /> */}
          </div>
        </div>
      </HeroBody>
      {showHome && <Link to="/" className="button is-small is-info">
        &larr; Back Home
      </Link>}
    </Hero>
  )
}

export default Header
