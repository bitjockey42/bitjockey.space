import React from "react"

const MenuItem = ({ item }) => {
  return (
    <li>
      <a href={`${item.url}`}>{item.title}</a>
    </li>
  )
}

const MenuList = ({ items }) => {
  // children
  return (
    <ul className="menu-list">
      {items.length > 0 &&
        items.map((item, i) => (
          <MenuItem key={i} item={item} />
        ))}
    </ul>
  ) 
}

const TableOfContentsTree = ({ data }) => {
  if (data.items.length > 0) {
    return <><p>Placeholder</p></>
  } else {
    return <MenuList items={data.items} />
  }
}

const TableOfContents = ({ mdx }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Table of Contents</p>
      <TableOfContentsTree data={mdx.tableOfContents} />
    </aside>
  )
}

export default TableOfContents
