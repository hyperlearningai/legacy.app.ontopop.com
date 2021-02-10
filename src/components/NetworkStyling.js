import React from 'react'
import { useTranslation } from 'react-i18next'
import { SIDEBAR_VIEW_STYLING } from '../constants/views'
import NetworkStylingNode from './NetworkStylingNode'
import NetworkStylingEdge from './NetworkStylingEdge'

const NetworkStyling = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_STYLING)}
      </div>
      <div className="network-settings">
        <div className="card">
          <NetworkStylingNode />
          <NetworkStylingEdge />
        </div>
      </div>
    </>
  )
}

export default NetworkStyling
