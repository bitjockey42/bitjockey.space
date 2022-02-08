import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"

const NotesLink = ({ edge, showBox }) => {
  const boxClass = showBox ? "box" : "mb-5"

  return (
    <div className={boxClass}>
      <h1 className="title is-5">
        <Link to={`/${slugify(edge.node.slug)}`}>
          {edge.node.frontmatter.title}
        </Link>
      </h1>
      <h6 className="subtitle is-6">{edge.node.excerpt}</h6>
    </div>
  )
}

const NotesList = ({ edges, showBox }) => {
  return (
    <>
      {edges.map((edge, i) => (
        <NotesLink key={i} edge={edge} showBox={showBox} />
      ))}
    </>
  )
}

export default NotesList
