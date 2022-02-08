import React from "react"

const MenuItem = ({ data }) => {
  return (
    <li>
      <a href={`${data.url}`}>{data.title}</a>
      {data.items && data.items.map((item, i) => (
        <MenuList key={i} data={item} />
      ))}
    </li>
  )
}

const MenuList = ({ data }) => {
  return (
    <ul className="menu-list">
      {data.items && data.items.map((item, i) => (
        <MenuItem key={i} data={item} />
      ))}
    </ul>
  ) 
}

const TableOfContents = ({ mdx }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Table of Contents</p>
      <MenuList data={mdx.tableOfContents} />
    </aside>
  )
}

export default TableOfContents
