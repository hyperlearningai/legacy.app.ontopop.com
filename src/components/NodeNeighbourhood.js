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
import { getElementIdAndType } from '../constants/functions'

const NodeNeighbourhood = ({
  updateStoreValue,
  selectedElement,
  nodesDropdownLabels
}) => {
  const { t } = useTranslation()

  const [separationDegree, setSeparationDegree] = useState(1)

  const [selectedNode, selectedNodeType] = getElementIdAndType(selectedElement)

  return (
    <>
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NEIGHBOURHOOD)}
      </h1>
      <div className="sidebar-main-body node-neighbourhood">
        <div className="sidebar-main-body-info">
          {t('selectNodeFromGraphOrFromList')}
        </div>

        <div className="full-width m-t-40">
          <Dropdown
            aria-label="notes-select-element"
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

        <div className="p-field m-t-50">
          <label
            className="sidebar-main-body-label text-center"
            htmlFor="separation-degree"
          >
            {t('separationDegree')}
          </label>
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

        <Button
          aria-label={t('showNeighbourhood')}
          className="sidebar-button-primary m-t-50"
          disabled={selectedNodeType !== 'node'}
          id="node-neighbourhood-btn"
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setNeighbourNodes({
            separationDegree,
            updateStoreValue,
          })}
        />
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
