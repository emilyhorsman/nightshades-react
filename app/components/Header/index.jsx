import React from 'react'

import './styles.scss'

function Header({ children }) {
  return (
    <header className="header">
      <h1>nightshades</h1>
      {children}
    </header>
  )
}

export default Header
