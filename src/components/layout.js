import React from "react"
import { Helmet } from "react-helmet"
import "../assets/css/layout.scss"

export default function Layout({ title, children }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`aj's digital garden - ${title}`}</title>
      </Helmet>
      {children}
    </div>
  )
}
