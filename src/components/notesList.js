import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"

const NotesLink = ({ edge }) => {
  return (
    <li>
      <Link to={`/${slugify(edge.node.slug)}`}>
        {edge.node.frontmatter.title}
      </Link>
    </li>
  )
}

const NotesList = ({ edges }) => {
  return (
    <ul>
      {edges.map((edge, i) => (
        <NotesLink key={i} edge={edge} />
      ))}
    </ul>
  )
}

export default NotesList
