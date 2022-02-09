import React from "react"
import { Link } from "gatsby"
import { Hero, HeroBody } from "./hero"

const Header = ({ children, showHome }) => {
  return (
    <Hero>
      <HeroBody>{children}</HeroBody>
      {showHome && (
        <Link to="/" className="button is-small is-info">
          &larr; Back Home
        </Link>
      )}
    </Hero>
  )
}

export default Header
