import React, { useState } from "react"
import { Link } from "gatsby"

const TagsPanel = ({ tags }) => {
  return (
    <>
      {tags &&
        tags.map((tag, i) => (
          <Link key={i} to={`/tags/${tag}`} className="panel-block">
            {tag}
          </Link>
        ))}
    </>
  )
}

const BacklinksPanel = ({ inboundReferences }) => {
  return (
    <>
      {inboundReferences &&
        inboundReferences.map((ref, i) => (
          <Link key={i} to={`/${ref.slug}`} className="panel-block">
            {ref.frontmatter.title}
          </Link>
        ))}
    </>
  )
}

const Panel = ({ mdx }) => {
  const { inboundReferences, frontmatter } = mdx
  const { tags } = frontmatter
  const [activeTab, setActiveTab] = useState("tags")

  const onClick = e => {
    setActiveTab(e.target.id)
    console.log(`activeTab: ${activeTab}`)
  }

  return (
    <article className="panel is-info">
      <p className="panel-heading">Metadata</p>
      <p className="panel-tabs">
        {tags.length > 0 && (
          <a
            id="tags"
            onClick={onClick}
            className={activeTab === "tags" ? "is-active" : ""}
          >
            Tags
          </a>
        )}
        {inboundReferences.length > 0 && (
          <a
            id="backlinks"
            onClick={onClick}
            className={activeTab === "backlinks" ? "is-active" : ""}
          >
            Backlinks
          </a>
        )}
      </p>
      {activeTab === "backlinks" ? (
        <BacklinksPanel inboundReferences={inboundReferences} />
      ) : (
        <TagsPanel tags={tags} />
      )}
    </article>
  )
}

export default Panel
