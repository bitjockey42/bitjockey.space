import React from "react"
import { graphql } from "gatsby"
import NotesList from "../components/notesList"

export default function TagTemplate({ pageContext, data }) {
  const { categoryName } = pageContext
  const { edges } = data.allMdx

  return (
    <section>
      <h1>{categoryName}</h1>
      <NotesList edges={edges} />
    </section>
  )
}

export const query = graphql`
  query($tag: String) {
    allMdx(filter: {frontmatter: {tags: {in: [$tag]}}}) {
      edges {
        node {
          slug
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
