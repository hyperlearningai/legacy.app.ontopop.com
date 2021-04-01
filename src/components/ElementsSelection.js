import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Dropdown } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'
import { useEffect, useState } from 'react'
import { orderBy } from 'lodash'
import actions from '../store/actions'
import getNode from '../utils/nodesEdgesUtils/getNode'
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'
import EdgesSelectionDetails from './EdgesSelectionDetails'
import NodesSelectionDetails from './NodesSelectionDetails'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import getElementLabel from '../utils/networkStyling/getElementLabel'

const ElementsSelection = ({
  selectedElement,
  updateStoreValue,
  nodesDropdownLabels,
}) => {
  const { t } = useTranslation()

  const [selectedElID, selectedElType] = selectedElement ? Object.entries(selectedElement)[0] : [undefined, 'node']
  const [selectedElementType, selectElementType] = useState(selectedElType)
  const [selectedElementID, selectElementID] = useState(selectedElID)

  useEffect(() => {
    const [selectedID, selectedType] = selectedElement ? Object.entries(selectedElement)[0] : [undefined, 'node']
    selectElementType(selectedType)
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

  return (
    <>
      <div className="sidebar-main-title">
        {!selectedElementID && selectedElementType === 'node' && t('nodesSelection')}
        {!selectedElementID && selectedElementType === 'edge' && t('edgesSelection')}
        {selectedElementID && selectedElementType === 'node' && <>{`${t('node')}: ${getNode(selectedElementID).label}`}</>}
        {selectedElementID && selectedElementType === 'edge' && <>{`${t('edge')}: ${getEdge(selectedElementID).label}`}</>}
      </div>
      <div className="elements-selection">
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
          <div className="elements-selection-message">
            {selectedElementType === 'node' && t('selectNodeFromGraphOrFromList')}
            {selectedElementType === 'edge' && t('selectEdgeFromGraphOrFromList')}
          </div>
        </div>

        <div className="elements-selection-dropdown">
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
}

ElementsSelection.defaultProps = {
  selectedElement: undefined
}

const mapToProps = ({
  nodesDropdownLabels,
  selectedElement
}) => ({
  nodesDropdownLabels,
  selectedElement,
})

export default connect(
  mapToProps,
  actions
)(ElementsSelection)
