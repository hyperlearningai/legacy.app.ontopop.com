import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import { SIDEBAR_VIEW_NEIGHBOURHOOD } from '../constants/views'
import setNeighbourNodes from '../utils/nodeNeighbourhood/setNeighbourNodes'
import getNodeIds from '../utils/nodesEdgesUtils/getNodeIds'
import setNodesStyle from '../utils/networkStyling/setNodesStyle'
import highlightSelectedNode from '../utils/nodesSelection/highlightSelectedNode'
import getElementLabel from '../utils/networkStyling/getElementLabel'

const NodeNeighbourhood = ({
  setStoreState,
  selectedNeighbourNode,
  addToObject,
}) => {
  const { t } = useTranslation()

  const [separationDegree, setSeparationDegree] = useState(1)

  useEffect(() => () => {
    setStoreState('isNeighbourNodeSelectable', false)
    setStoreState('selectedNeighbourNode', '')

    setNodesStyle()
  }, [])

  useEffect(() => {
    if (selectedNeighbourNode && selectedNeighbourNode !== '') {
      setNodesStyle()

      highlightSelectedNode({
        setStoreState,
        selectedNode: selectedNeighbourNode
      })
    }
  }, [selectedNeighbourNode])

  const availableNodeIds = getNodeIds()

  const availableNodes = availableNodeIds.length > 0 ? availableNodeIds.map(
    (nodeId) => {
      const label = getElementLabel({
        type: 'node',
        id: nodeId
      })

      return ({
        value: nodeId,
        label: label || nodeId
      })
    }
  ) : []

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NEIGHBOURHOOD)}
      </div>
      <div className="node-neighbourhood">
        <div className="node-neighbourhood-message">
          {t('selectNodeFromGraphOrFromList')}
        </div>

        <div className="node-neighbourhood-dropdown">
          <Dropdown
            id="node-select"
            value={selectedNeighbourNode}
            filter
            options={availableNodes}
            onChange={(e) => setStoreState('selectedNeighbourNode', e.value)}
            placeholder={t('selectNode')}
          />
        </div>

        <div className="p-field node-neighbourhood-degree m-t-20">
          <label htmlFor="separation-degree">{t('separationDegree')}</label>
          <InputNumber
            id="separation-degree"
            value={separationDegree}
            onValueChange={(e) => setSeparationDegree(e.target.value)}
            showButtons
            buttonLayout="horizontal"
            step={1}
            min={1}
            disabled={selectedNeighbourNode === ''}
            decrementButtonClassName="p-button-danger"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            className="m-t-10"
          />
        </div>

        <div className="node-neighbourhood-buttons m-t-40">
          <Button
            tooltip={t('showNeighbourhood')}
            className="node-neighbourhood-button"
            disabled={selectedNeighbourNode === ''}
            icon="pi pi-chevron-right"
            iconPos="right"
            label={t('show')}
            onClick={() => setNeighbourNodes({
              separationDegree,
              setStoreState,
              addToObject
            })}
          />
        </div>
      </div>
    </>
  )
}

NodeNeighbourhood.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  selectedNeighbourNode: PropTypes.string.isRequired,
  addToObject: PropTypes.func.isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  selectedNeighbourNode,
}) => ({
  graphData,
  currentGraph,
  selectedNeighbourNode,
})

export default connect(
  mapToProps,
  actions
)(NodeNeighbourhood)
