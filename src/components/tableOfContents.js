import React from "react"

const MenuItem = ({ data }) => {
  return (
    <li>
      <a href={`${data.url}`}>{data.title}</a>
      {data.items && data.items.length > 0 && <SubMenuList data={data} />} 
    </li>
  )
}

const SubMenuList = ({ data }) => {
  return (
    <ul>
      {data.items.map((item, i) => (
        <MenuItem key={i} data={item} />
      ))}
    </ul>
  )
}

const MenuList = ({ data }) => {
  const ulClassName = !data.title ? "menu-list": ""

  return (
    <ul className={ulClassName}>
      {data.items && data.items.length > 0 ?
      <SubMenuList data={data} /> :
      <MenuItem data={data} />} 
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
