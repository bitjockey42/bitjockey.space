import React from "react"
import Container from "./container"

const NavBar = () => {
  return (
    <nav className="navbar">
      <Container>
        <div className="navbar-brand">
          <span className="navbar-burger burger" data-target="mainNav">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="mainNav" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item field">
              <p className="control">
                <input className="input" type="search" placeholder="Search..." />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default NavBar
