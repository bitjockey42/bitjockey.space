import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Container from "../components/container"
import Title from "../components/title"
import Panel from "../components/panel"
import Hero from "../components/hero"

export default function noteTemplate({ data }, props) {
  const { mdx } = data
  return (
    <div>
      <Hero>
        <Title>{mdx.frontmatter.title}</Title>
      </Hero>
      <section className="section">
        <Container>
          <div className="columns">
            <div className="column is-three-quarters">
              <div className="content">
                {/* <ShortcodeWrapper> */}
                <MDXRenderer>{mdx.body}</MDXRenderer>
                {/* </ShortcodeWrapper> */}
              </div>
              <Link to="/" className="button is-small">
                &larr; Back Home
              </Link>
            </div>
            <div className="column">
              <Panel mdx={mdx} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export const query = graphql`
  query ($slug: String!) {
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
