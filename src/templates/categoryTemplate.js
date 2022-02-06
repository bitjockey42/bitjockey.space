import React from "react"
import { graphql, Link } from "gatsby"

export default function categoryTemplate({ pageContext, data }) {
  const { categoryName } = pageContext
  const { edges } = data.allMdx

  const posts = edges.map((edge, i) => (
    <li key={i}>
      <Link to={`/garden/${edge.node.slug}`}>
        {edge.node.frontmatter.title}
      </Link>
    </li>
  ))
  return (
    <section>
      <h1>{categoryName}</h1>
      <ul>{posts}</ul>
    </section>
  )
}

export const query = graphql`
  query($categoryRegex: String) {
    allMdx(filter: {slug: {regex: $categoryRegex}}) {
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