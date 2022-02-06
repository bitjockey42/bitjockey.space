import React from "react"
import { Link, graphql } from "gatsby"
import "./styles.scss"

const Home = ({
  data: {
    allMdx: { edges },
  },
}) => {
  const NotesList = edges.map((edge, i) => (
    <li>
      <Link key={i} to={`/garden/${edge.node.slug}`}>
        {edge.node.frontmatter.title} <b>{edge.node.frontmatter.date}</b>
      </Link>
    </li>
  ))
  return (
    <section>
      <div className="container">
        <div className="columns">
          <div className="column">
            <ul>
              {NotesList}
            </ul>
          </div>
        </div>
      </div>
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
