import React from "react"

const InfoCard = ({ mdx }) => {
  return (
    <div className="card mb-5">
      <header className="card-header">
        <p className="card-header-title">Information</p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>
            <span className="is-uppercase has-text-weight-semibold">
              <i className="fa fa-calendar-o" aria-hidden="true"></i> created
            </span>
            <span className="is-pulled-right">{mdx.frontmatter.created}</span>
          </p>
          <p>
            <span className="is-uppercase has-text-weight-semibold">
              <i className="fa fa-leaf" aria-hidden="true"></i> stage
            </span>
            <span className="tag is-pulled-right">{mdx.frontmatter.stage}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
