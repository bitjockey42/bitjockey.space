import React from "react"
import { Link } from "gatsby"

const TagsList = ({ allTags }) => {
  return (
    <div className="tags">
      {allTags.length > 0 &&
        allTags.map((tag, i) => (
          <Link
            key={i}
            to={`/tags/${tag.tag}`}
            className="tag is-large is-primary"
          >
            {tag.tag} ({tag.totalCount})
          </Link>
        ))}
    </div>
  )
}

export default TagsList
