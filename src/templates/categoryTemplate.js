import React from "react"
import { graphql, Link } from "gatsby"

export default function categoryTemplate({ data }) {
  const { edges } = data.allMdx

  const Notes = edges.map(edge => (
    <article>
      <Link to={`/garden/${edge.node.slug}`}>
        <h1>{edge.node.frontmatter.title}</h1>
      </Link>
      <p>{edge.node.frontmatter.date}</p>
    </article>
  ))
  return <section>{Notes}</section>

}

export const query = graphql`
  query CategoryQuery {
    allMdx(filter: {slug: {regex: "/blog/"}}) {
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