import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Title from "../components/title"
import Header from "../components/header"
import NotesList from "../components/notesList"

export default function TagTemplate({ pageContext, data }) {
  const { tag } = pageContext
  const { edges } = data.allMdx

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          garden - tag: {tag}
        </title>
      </Helmet>
      <Header showHome={true}>
        <Title>
          tag: <span className="tag is-large is-round">{tag}</span>
        </Title>
      </Header>
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
