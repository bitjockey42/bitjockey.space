import React from "react"
import { Link } from "gatsby"

const Panel = ({ mdx }) => {
  const { inboundReferences } = mdx

  return (
    <article className="panel">
      <p className="panel-heading">
        Metadata
      </p>
      <p className="panel-tabs">
        <a className="is-active">Backlinks</a>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input is-primary" type="text" placeholder="Search" />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      {inboundReferences.map((ref, i) => 
        (
          <Link key={i} to={`/${ref.slug}`} className="panel-block">
            {ref.frontmatter.title}
          </Link>
          )
      )}
    </article>
  )
}

export default Panel