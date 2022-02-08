import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import TagsList from "../components/tagsList"
import NotesList from "../components/notesList"
import Container from "../components/container"
import Title from "../components/title"
import Header from "../components/header"

const Home = ({
  data: {
    allMdx: { edges, allTags },
  },
}) => {
  return (
    <Layout>
      <Header>
        <Title>digital garden</Title>
        <h2 className="subtitle">Welcome to my twisted mind</h2>
      </Header>
      <section className="section">
        <Container>
          <div className="columns">
            <div className="column">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title is-uppercase">Notes</p>
                </header>
                <div className="card-content">
                  <NotesList edges={edges} />
                </div>
              </div>
            </div>
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
    </Layout>
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
