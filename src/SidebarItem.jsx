import React from 'react'

export default function SidebarItem({ name, active, handleClick }) {
  return (
    <button 
    // if active is true return active or else return empty string
      className={`sidebar-item ${active ? 'active' : ''}`}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}