import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import Container from "../components/container"
import Title from "../components/title"
import Panel from "../components/panel"
import Hero from "../components/hero"
import TableOfContents from "../components/tableOfContents"
import InfoCard from "../components/infoCard"

export default function noteTemplate({ data }, props) {
  const { mdx } = data
  const hasToc = mdx.tableOfContents.items

  return (
    <Layout>
      <Hero>
        <Title>{mdx.frontmatter.title}</Title>
      </Hero>
      <section className="section">
        <Container>
          <div className="columns">
            {hasToc && (
              <div className="column is-2">
                <TableOfContents mdx={mdx} />
              </div>
            )}
            <div className="column">
              <div className="content">
                {/* <ShortcodeWrapper> */}
                <MDXRenderer>{mdx.body}</MDXRenderer>
                {/* </ShortcodeWrapper> */}
              </div>
            </div>
            <div className="column is-3">
              <Panel mdx={mdx} />
              <InfoCard mdx={mdx} />
              <Link to="/" className="button is-small">
                &larr; Back Home
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
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
        date
        tags
      }
      tableOfContents
    }
  }
`
