import React from "react"
import { graphql } from "gatsby"
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
      <Hero>
        <Title>My garden</Title>
      </Hero>
      <NotesList edges={edges} />
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
