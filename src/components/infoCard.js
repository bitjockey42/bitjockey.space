import React from "react"
import moment from "moment"

const DEFAULT_DATE_FORMAT = "Do MMM YYYY"

const InfoCard = ({ mdx }) => {
  const formatDate = (dateString) => {
    return moment(dateString).format(DEFAULT_DATE_FORMAT)
  }

  return (
    <div className="card mb-5">
      <header className="card-header">
        <p className="card-header-title">Information</p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>
            <span className="is-uppercase has-text-weight-semibold">
              <i className="fa fa-calendar-check-o" aria-hidden="true"></i> updated
            </span>
            <span className="is-pulled-right">{formatDate(mdx.frontmatter.updated)}</span>
          </p>
          <p>
            <span className="is-uppercase has-text-weight-semibold">
              <i className="fa fa-calendar-plus-o" aria-hidden="true"></i> created
            </span>
            <span className="is-pulled-right">{formatDate(mdx.frontmatter.created)}</span>
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
