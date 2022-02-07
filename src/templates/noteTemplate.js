import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Container from "../components/container"
import Title from "../components/title"
import Panel from "../components/panel"
import Hero from "../components/hero"
import TableOfContents from "../components/tableOfContents"

export default function noteTemplate({ data }, props) {
  const { mdx } = data
  const hasToc = mdx.tableOfContents.items

  return (
    <div>
      <Hero>
        <Title>{mdx.frontmatter.title}</Title>
      </Hero>
      <section className="section">
        <Container>
          <div className="columns">
            {
              hasToc && (
              <div className="column is-2">
                <TableOfContents toc={mdx.TableOfContents} />
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
              <div className="card mb-5">
                <header className="card-header">
                  <p className="card-header-title">Information</p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <p>
                      <span className="is-uppercase has-text-weight-semibold">
                        <i className="fa fa-calendar-o" aria-hidden="true"></i>{" "}
                        created
                      </span>
                      <span className="is-pulled-right">
                        {mdx.frontmatter.date}
                      </span>
                    </p>
                    <p>
                      <span className="is-uppercase has-text-weight-semibold">
                        <i className="fa fa-leaf" aria-hidden="true"></i> stage
                      </span>
                      <span className="tag is-pulled-right">seedling</span>
                    </p>
                  </div>
                </div>
              </div>
              <Panel mdx={mdx} />
              <Link to="/" className="button is-small">
                &larr; Back Home
              </Link>
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
        date
        tags
      }
      tableOfContents
    }
  }
`
