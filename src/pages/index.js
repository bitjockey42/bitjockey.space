import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import TagsList from "../components/tagsList"
import NotesList from "../components/notesList"
import Container from "../components/container"
import Title from "../components/title"
import Header from "../components/header"
import { SearchBar } from "../components/search"

const Home = ({
  data: {
    allMdx: { edges, allTags },
    localSearchPages: { index, store },
  },
}) => {
  return (
    <Layout title={"Home"}>
      <Header showHome={false}>
        <Title>aj's digital garden</Title>
        <h2 className="subtitle">
          Welcome to my not so secret{" "}
          <Link to="/Digital-Garden">digital garden</Link>.
        </h2>
        <p>
          This is a space for me to share my learnings and my thoughts on a
          variety of topics.
        </p>
        <p>
          I like to pretend sometimes that I'm a writer, so take a look at my{" "}
          <Link to="/tags/article">articles</Link> if you would like to indulge
          me.
        </p>
      </Header>
      <section className="section">
        <Container>
          <div className="box">
            <SearchBar index={index} store={store} />
          </div>
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
            created
          }
          excerpt
        }
      }
      allTags: group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    localSearchPages {
      index
      store
    }
  }
`
