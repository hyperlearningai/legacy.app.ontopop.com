import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'
import React, { useEffect, useState } from 'react'
import { orderBy } from 'lodash'
import Joyride from 'react-joyride'
import actions from '../store/actions'
import getNode from '../utils/nodesEdgesUtils/getNode'
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'
import EdgesSelectionDetails from './EdgesSelectionDetails'
import NodesSelectionDetails from './NodesSelectionDetails'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import getElementLabel from '../utils/networkStyling/getElementLabel'
import { getElementIdAndType } from '../constants/functions'
import { ROUTE_NETWORK_GRAPH_OPTIONS, ROUTE_SYNONYMS } from '../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../constants/store'
import { SIDEBAR_VIEW_GRAPH_OPTIONS, SIDEBAR_VIEW_SYNONYMS } from '../constants/views'
import setPageView from '../utils/analytics/setPageView'

const ElementsSelection = ({
  selectedElement,
  updateStoreValue,
  nodesDropdownLabels,
  showTour
}) => {
  const { t } = useTranslation()

  const [selectedElID, selectedElType] = getElementIdAndType(selectedElement)
  const [selectedElementType, selectElementType] = useState(selectedElType || 'node')
  const [selectedElementID, selectElementID] = useState(selectedElID)

  useEffect(() => {
    const [selectedID, selectedType] = getElementIdAndType(selectedElement)

    selectElementType(selectedType || 'node')
    selectElementID(selectedID)
  }, [selectedElement])

  const availableEdgeIds = getEdgeIds()

  const availableEdges = availableEdgeIds.length > 0 ? orderBy(availableEdgeIds.map((edgeId) => {
    const {
      label,
      from,
      to,
      userDefined
    } = getEdge(edgeId)

    const fromLabel = getElementLabel({
      type: 'node',
      id: from
    })

    const toLabel = getElementLabel({
      type: 'node',
      id: to
    })

    const connectionLabel = `${fromLabel} => (${label}) => ${toLabel}`

    return ({
      value: edgeId,
      label: connectionLabel,
      userDefined
    })
  }), ['label'], ['asc']) : 0

  const elementButtons = [{
    value: 'node',
    label: t('node')
  }, {
    value: 'edge',
    label: t('edge')
  }]

  const itemTemplate = (option) => (
    <span>
      {`${option.label}`}
    </span>
  )

  const steps = [
    {
      target: '#element-type-select',
      content: t('introElementSelectionType'),
      placement: 'top',
      disableBeacon: true
    },
    {
      target: '#element-select',
      content: t('introElementSelectionElement'),
      placement: 'top',
      disableBeacon: true
    },
    {
      target: '.elements-selection-details',
      content: t('introElementSelectionProperties'),
      placement: 'left',
      disableBeacon: true
    }
  ]

  const handleJoyrideCallback = (data) => {
    const { status, index } = data

    if (index === 1) {
      updateHighlightedElement({
        updateStoreValue,
        id: '12',
        type: 'node'
      })
    }

    if (status === 'finished') {
      localStorage.setItem('showTour', JSON.stringify({ ...showTour, elementSelection: false }))
      updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_GRAPH_OPTIONS)
      window.history.pushState('', '', ROUTE_NETWORK_GRAPH_OPTIONS)
      setPageView({ url: ROUTE_NETWORK_GRAPH_OPTIONS, updateStoreValue })
    }
  }

  return (
    <>
      {showTour.elementSelection && (
      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        disableScrolling
        locale={{ close: 'Next' }}
      />
      )}

      <div className="sidebar-main-title">
        {!selectedElementID && selectedElementType === 'node' && t('nodesSelection')}
        {!selectedElementID && selectedElementType === 'edge' && t('edgesSelection')}
        {selectedElementID && selectedElementType === 'node' && <>{`${t('node')}: ${getNode(selectedElementID)?.label}`}</>}
        {selectedElementID && selectedElementType === 'edge' && <>{`${t('edge')}: ${getEdge(selectedElementID)?.label}`}</>}
      </div>
      <div className="sidebar-main-body elements-selection">
        <div className="elements-selection-select-row">
          <SelectButton
            id="element-type-select"
            value={selectedElementType}
            options={elementButtons}
            onChange={(e) => {
              const { value } = e
              selectElementType(value)
              selectElementID(undefined)
            }}
            itemTemplate={itemTemplate}
          />
        </div>

        <div className="sidebar-main-body-info">
          {t(selectedElementType === 'node' ? 'selectNodeFromGraphOrFromList' : 'selectEdgeFromGraphOrFromList')}
        </div>

        <div className="full-width">
          <Dropdown
            id="element-select"
            value={selectedElementID}
            filter
            options={selectedElementType === 'node' ? nodesDropdownLabels : availableEdges}
            onChange={(e) => updateHighlightedElement({
              updateStoreValue,
              id: e.value,
              type: selectedElementType
            })}
            placeholder={selectedElementType === 'node' ? t('selectNode') : t('selectEdge')}
          />
        </div>

        {selectedElementType === 'node' && selectedElementID && (
          <NodesSelectionDetails
            nodeId={selectedElementID}
          />
        )}

        {selectedElementType === 'edge' && selectedElementID && (
          <EdgesSelectionDetails
            edgeId={selectedElementID}
          />
        )}
      </div>
    </>
  )
}

ElementsSelection.propTypes = {
  selectedElement: PropTypes.shape(),
  updateStoreValue: PropTypes.func.isRequired,
  nodesDropdownLabels: PropTypes.arrayOf(PropTypes.shape).isRequired,
  showTour: PropTypes.shape().isRequired,
}

ElementsSelection.defaultProps = {
  selectedElement: undefined
}

const mapToProps = ({
  nodesDropdownLabels,
  selectedElement,
  showTour
}) => ({
  nodesDropdownLabels,
  selectedElement,
  showTour
})

export default connect(
  mapToProps,
  actions
)(ElementsSelection)
