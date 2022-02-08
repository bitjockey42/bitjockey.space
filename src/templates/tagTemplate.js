import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Title from "../components/title"
import { Hero, HeroBody } from "../components/hero"
import NotesList from "../components/notesList"

export default function TagTemplate({ pageContext, data }) {
  const { tag } = pageContext
  const { edges } = data.allMdx

  return (
    <Layout>
      <Hero>
        <HeroBody>
          <Title>
            tag: <span className="tag is-large is-round">{tag}</span>
          </Title>
        </HeroBody>
        <Link to="/" className="button is-small is-info">
          &larr; Back Home
        </Link>
      </Hero>
      <section className="section">
        <Container>
          <NotesList edges={edges} showBox={true} />
        </Container>
      </section>
    </Layout>
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
