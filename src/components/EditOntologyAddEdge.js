import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import getEdge from '../utils/nodesEdgesUtils/getEdge'

const EditOntologyAddEdge = ({
  type,
  operation,
  optionNodes,
  optionEdges,
  setStoreState,
  addNumber,
}) => {
  const { t } = useTranslation()

  const [fromNode, setFromNode] = useState(undefined)
  const [edge, setEdge] = useState(undefined)
  const [toNode, setToNode] = useState(undefined)

  return (
    <>
      <div
        className="edit-ontology-row"
      >
        <label htmlFor="graph-select">
          {t('chooseElementsToConnect')}
        </label>
      </div>

      <div
        className="edit-ontology-row"
      >
        <label htmlFor="graph-select-from">
          {t('fromNode')}
        </label>

        <Dropdown
          id="graph-select-from"
          value={fromNode}
          filter
          options={optionNodes}
          onChange={(e) => setFromNode(e.value)}
          placeholder={t('selectElement')}
        />
      </div>

      <div
        className="edit-ontology-row"
      >
        <label htmlFor="graph-select-edge">
          {t('edge')}
        </label>

        <Dropdown
          id="graph-select-edge"
          value={edge}
          filter
          options={optionEdges}
          onChange={(e) => {
            setEdge(e.value)
          }}
          placeholder={t('selectElement')}
        />
      </div>

      <div
        className="edit-ontology-row"
      >
        <label htmlFor="graph-select-to">
          {t('toNode')}
        </label>

        <Dropdown
          id="graph-select-to"
          value={toNode}
          filter
          options={optionNodes}
          onChange={(e) => setToNode(e.value)}
          placeholder={t('selectElement')}
        />
      </div>

      {
        (fromNode
          && fromNode === toNode) && (
          <div
            className="edit-ontology-row"
          >
            <small
              id="username2-help"
              className="p-error p-d-block"
            >
              {t('toAndFromNodesEqual')}
            </small>
          </div>
        )
      }

      <div className="edit-ontology-row">
        <Button
          className="go-button"
          tooltip={`${t(operation)}`}
          disabled={
            !fromNode
            || !edge
            || !toNode
            || getEdge(edge) !== null
          }
          onClick={() => {
            setOntology({
              operation,
              type,
              setStoreState,
              addNumber,
              selectedElementProperties: {
                from: fromNode,
                edge,
                to: toNode,
                optionEdges
              },
              t
            })
            setFromNode(undefined)
            setEdge(undefined)
            setToNode(undefined)
          }}
          label={t(operation)}
          icon="pi pi-chevron-right"
          iconPos="right"
        />
      </div>
    </>
  )
}

EditOntologyAddEdge.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  optionEdges: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
}

const mapToProps = ({
  selectedGraphVersion,
  graphVersions,
  availableEdges
}) => ({
  selectedGraphVersion,
  graphVersions,
  availableEdges
})

export default connect(
  mapToProps,
  actions
)(EditOntologyAddEdge)
