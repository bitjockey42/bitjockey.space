import React, { useState } from "react"
import { Link } from "gatsby"

const TagsPanel = ({ tags }) => {
  return (
    <>
      {tags && tags.map((tag, i) => 
        (
          <Link key={i} to={`/${tag}`} className="panel-block">
            {tag}
          </Link>
          )
      )}
    </>
  )
}

const BacklinksPanel = ({ inboundReferences }) => {
  return (
    <>
      {inboundReferences && inboundReferences.map((ref, i) => 
        (
          <Link key={i} to={`/${ref.slug}`} className="panel-block">
            {ref.frontmatter.title}
          </Link>
          )
      )}
    </>
  )
}

const Panel = ({ mdx }) => {
  const { inboundReferences, frontmatter } = mdx
  const { tags } = frontmatter
  const [activeTab, setActiveTab] = useState("tags")

  const onClick = (e) => {
    setActiveTab(e.target.id)
    console.log(`activeTab: ${activeTab}`)
  }

  return (
    <article className="panel">
      <p className="panel-heading">
        Metadata
      </p>
      <p className="panel-tabs">
        <a id="tags" onClick={onClick}>Tags</a>
        <a id="backlinks" onClick={onClick}>Backlinks</a>
      </p>
      {
        activeTab === "backlinks" ?
          <BacklinksPanel inboundReferences={inboundReferences} />
        :
          <TagsPanel tags={tags} />
      } 
    </article>
  )
}

export default Panel