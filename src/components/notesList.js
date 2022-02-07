import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"

const NotesLink = ({ edge }) => {
  return (
    <div className="box">
      <h1 className="title is-5">
        <Link to={`/${slugify(edge.node.slug)}`}>
          {edge.node.frontmatter.title}
        </Link>
      </h1>
      <h6 className="subtitle is-6">{edge.node.excerpt}</h6>
    </div>
  )
}

const NotesList = ({ edges }) => {
  return (
    <>
      {edges.map((edge, i) => (
        <NotesLink key={i} edge={edge} />
      ))}
    </>
  )
}

export default NotesList
