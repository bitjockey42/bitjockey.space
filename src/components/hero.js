import React from "react"

const HeroHead = ({ children }) => {
  return <div className="hero-head">{children}</div>
}

const HeroBody = ({ children }) => {
  return <div className="hero-body">{children}</div>
}

const Hero = ({ children }) => {
  return (
    <section className="hero is-dark is-small has-text-centered">
      {children}
    </section>
  )
}

export { Hero, HeroHead, HeroBody }
