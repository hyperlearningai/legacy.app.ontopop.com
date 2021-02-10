import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import { SUB_CLASS_OF_OBJECT } from '../constants/graph'
import { generatePredicateId } from '../constants/functions'
import getEdge from '../utils/nodesEdgesUtils/getEdge'

const EditOntologyAddConnection = ({
  type,
  operation,
  optionNodes,
  optionEdges,
  setStoreState,
  addToArray,
  removeFromObject,
  addToObject,
}) => {
  const { t } = useTranslation()

  const [fromNode, setFromNode] = useState(undefined)
  const [predicate, setPredicate] = useState(undefined)
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
        <label htmlFor="graph-select">
          {t('fromNode')}
        </label>

        <Dropdown
          id="graph-select"
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
        <label htmlFor="graph-select">
          {t('predicate')}
        </label>

        <Dropdown
          id="graph-select"
          value={predicate}
          filter
          options={[
            ...optionEdges,
            SUB_CLASS_OF_OBJECT
          ]}
          onChange={(e) => setPredicate(e.value)}
          placeholder={t('selectElement')}
        />
      </div>

      <div
        className="edit-ontology-row"
      >
        <label htmlFor="graph-select">
          {t('toNode')}
        </label>

        <Dropdown
          id="graph-select"
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

      {
        getEdge(generatePredicateId({
          from: fromNode,
          predicate,
          to: toNode
        })) && (
          <div
            className="edit-ontology-row"
          >
            <small
              id="username2-help"
              className="p-error p-d-block"
            >
              {t('connectionAlreadyExists')}
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
            || !predicate
            || !toNode
            || getEdge(generatePredicateId({
              from: fromNode,
              predicate,
              to: toNode
            }))
          }
          onClick={() => {
            setOntology({
              operation,
              type,
              setStoreState,
              addToArray,
              removeFromObject,
              addToObject,
              selectedElementProperties: {
                from: fromNode,
                predicate,
                to: toNode
              },
              t
            })
            setFromNode(undefined)
            setPredicate(undefined)
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

EditOntologyAddConnection.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  optionEdges: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setStoreState: PropTypes.func.isRequired,
  addToArray: PropTypes.func.isRequired,
  removeFromObject: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
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
)(EditOntologyAddConnection)
