import React from 'react'

import './styles.scss'

function ActionDashboard({ children }) {
  let lastSectionID = 0
  return (
    <div className="action-dashboard">
      {children.map(child =>
        <section
          key={++lastSectionID}
          {...child.props}
        >{child}</section>
      )}
    </div>
  )
}

export default ActionDashboard
