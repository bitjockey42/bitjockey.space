import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import Hero from "../components/hero"
import Title from "../components/title"
import NotesList from "../components/notesList"
import "./styles.scss"

const Home = ({
  data: {
    allMdx: { edges },
  },
}) => {
  return (
    <section>
      <Container>
        <Hero>
          <Title>bitjockey's digital garden</Title>
          <p>Welcome to my not-so-secret digital garden.</p>
        </Hero>
        <NotesList edges={edges} />
      </Container>
    </section>
  )
}

export default Home
export const pageQuery = graphql`
  query IndexQuery {
    allMdx {
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
