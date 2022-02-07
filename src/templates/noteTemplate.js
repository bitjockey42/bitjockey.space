import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Container from "../components/container"
import Title from "../components/title"
import Panel from "../components/panel"

export default function noteTemplate({ data }, props) {
  const { mdx } = data
  return (
    <Container>
      <div className="columns">
        <div className="column is-three-quarters">
          <Title>{mdx.frontmatter.title}</Title>
          {/* <ShortcodeWrapper> */}
          <MDXRenderer>{mdx.body}</MDXRenderer>
          {/* </ShortcodeWrapper> */}
          <Link to="/">Back Home</Link>
        </div>
        <div className="column">
          <Panel mdx={mdx}/>
        </div>
      </div>
    </Container>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      inboundReferences {
        ... on Mdx {
          frontmatter {
            title
          }
          slug
        }
      }
      frontmatter {
        title
        tags
      }
    }
  }
`
