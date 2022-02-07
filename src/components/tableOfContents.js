import React from "react"
import { Link } from "gatsby"

const TableOfContents = ({ mdx }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Table of Contents</p>
      <ul className="menu-list">
        {mdx.tableOfContents.items.length > 0 && mdx.tableOfContents.items.map((item, i) => (
          <li key={i}><Link to={`${item.url}`}>{item.title}</Link></li>
        ))}
      </ul>
    </aside>
  )
}

export default TableOfContents
