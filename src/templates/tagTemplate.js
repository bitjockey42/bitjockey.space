import React from "react"
import { Link, graphql } from "gatsby"
import Container from "../components/container"
import Title from "../components/title"
import Hero from "../components/hero"
import NotesList from "../components/notesList"

export default function TagTemplate({ pageContext, data }) {
  const { tag } = pageContext
  const { edges } = data.allMdx

  return (
    <div>
      <Hero>
        <Title>tag: <span className="tag is-large is-round">{tag}</span></Title>
        <Link to="/" className="button is-small is-info">
          &larr; Back Home
        </Link>
      </Hero>
      <section className="section">
        <Container>
          <NotesList edges={edges} />
        </Container>
      </section>
    </div>
  )
}

export const query = graphql`
  query ($tag: String) {
    allMdx(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      edges {
        node {
          slug
          excerpt
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
