import React from "react"

const TableOfContents = ({ mdx }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Table of Contents</p>
      <ul className="menu-list">
        {mdx.tableOfContents.items.length > 0 &&
          mdx.tableOfContents.items.map((item, i) => (
            <li key={i}>
              <a href={`${item.url}`}>{item.title}</a>
            </li>
          ))}
      </ul>
    </aside>
  )
}

export default TableOfContents
