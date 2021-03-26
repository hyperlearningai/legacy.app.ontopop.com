import {
  useState,
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
import updateHighlightedElement from '../utils/networkStyling/updateHighlightedElement'

const NodeNeighbourhood = ({
  updateStoreValue,
  selectedElement,
  nodesDropdownLabels
}) => {
  const { t } = useTranslation()

  const [separationDegree, setSeparationDegree] = useState(1)

  const [selectedNode, selectedNodeType] = selectedElement ? Object.entries(selectedElement)[0] : [undefined, false]

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
            value={selectedNode}
            filter
            options={nodesDropdownLabels}
            onChange={(e) => updateHighlightedElement({
              updateStoreValue,
              id: e.value,
              type: 'node'
            })}
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
            disabled={selectedNodeType !== 'node'}
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
            disabled={selectedNodeType !== 'node'}
            icon="pi pi-chevron-right"
            iconPos="right"
            label={t('show')}
            onClick={() => setNeighbourNodes({
              separationDegree,
              updateStoreValue,
            })}
          />
        </div>
      </div>
    </>
  )
}

NodeNeighbourhood.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  selectedElement: PropTypes.string.isRequired,
  nodesDropdownLabels: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  selectedElement,
  nodesDropdownLabels
}) => ({
  graphData,
  currentGraph,
  selectedElement,
  nodesDropdownLabels
})

export default connect(
  mapToProps,
  actions
)(NodeNeighbourhood)
