import React from "react"
import { graphql } from "gatsby"
import Container from "../components/container"
import Hero from "../components/hero"
import Title from "../components/title"
import NotesList from "../components/notesList"
import TagsList from "../components/tagsList"
import "./styles.scss"

const Home = ({
  data: {
    allMdx: { edges, allTags },
  },
}) => {
  return (
    <div>
      <Hero>
        <Title>bitjockey's digital garden</Title>
        <p>Welcome to my not-so-secret digital garden.</p>
      </Hero>
      <section className="section">
        <Container>
          <div className="columns">
            <div className="column">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title is-uppercase">Tags</p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <TagsList allTags={allTags} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
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
      allTags: group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
