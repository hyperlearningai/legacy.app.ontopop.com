import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { SIDEBAR_VIEW_STYLING } from '../constants/views'
import NetworkStylingNode from './NetworkStylingNode'
import NetworkStylingEdge from './NetworkStylingEdge'
import saveStyling from '../utils/networkStyling/saveStyling'
import actions from '../store/actions'

const NetworkStyling = ({
  addNumber,
}) => {
  const { t } = useTranslation()

  const [isSaved, setSaved] = useState(false)

  const icon = isSaved ? 'pi pi-check' : 'pi pi-save'
  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_STYLING)}
      </div>
      <div className="network-styling">
        <div className="card">
          <NetworkStylingNode />
          <NetworkStylingEdge />
        </div>

        <div className="network-styling-button m-t-20 m-b-20">
          <Button
            label={t(isSaved ? 'saved' : 'save')}
            disabled={isSaved}
            icon={icon}
            id="save-styling-button"
            onClick={() => saveStyling({
              setSaved,
              addNumber,
              t
            })}
          />
        </div>
      </div>
    </>
  )
}

NetworkStyling.propTypes = {
  addNumber: PropTypes.func.isRequired,
}

export default connect(
  null,
  actions
)(NetworkStyling)
