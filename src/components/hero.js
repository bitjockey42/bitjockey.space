import React from "react"

const Hero = ({ children }) => {
  return (
    <section className="hero is-small is-link">
      <div className="hero-body">{children}</div>
    </section>
  )
}

export default Hero
