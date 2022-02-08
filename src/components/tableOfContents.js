import React from "react"

const MenuItem = ({ data }) => {
  return (
    <li>
      <a href={`${data.url}`}>{data.title}</a>
    </li>
  )
}

const MenuList = ({ data }) => {
  return (
    <ul className="menu-list">
      {data.items && data.items.length > 0 ?
        data.items.map((item, i) => (
          <MenuList key={i} data={item} />
        )) :
          <MenuItem data={data} />
        }
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
