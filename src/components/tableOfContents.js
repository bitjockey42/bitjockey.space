import React from "react"

const MenuItem = ({ item }) => {
  return (
    <li>
      <a href={`${item.url}`}>{item.title}</a>
    </li>
  )
}

const MenuList = ({ tableOfContents }) => {
  // children
  return (
    <ul className="menu-list">
      {tableOfContents.items.length > 0 &&
        tableOfContents.items.map((item, i) => (
          <MenuItem key={i} item={item} />
        ))}
    </ul>
  ) 
}

const TableOfContents = ({ mdx }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Table of Contents</p>
      <MenuList tableOfContents={mdx.tableOfContents} />
    </aside>
  )
}

export default TableOfContents
