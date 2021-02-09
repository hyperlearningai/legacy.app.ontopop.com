import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { SelectButton } from 'primereact/selectbutton'
import { SIDEBAR_VIEW_EDIT_ONTOLOGY } from '../constants/views'
import actions from '../store/actions'
import { REQUIRED_PREDICATES } from '../constants/graph'
import EditOntologyAddEdgeNode from './EditOntologyAddEdgeNode'
import EditOntologyAddConnection from './EditOntologyAddConnection'
import EditOntologyUpdateEdgeNode from './EditOntologyUpdateEdgeNode'
import EditOntologyDeleteEdgeNode from './EditOntologyDeleteEdgeNode'
import EditOntologyDeleteConnection from './EditOntologyDeleteConnection'
import EditOntologyRestoreEdgeNode from './EditOntologyRestoreEdgeNode'
import EditOntologyRestoreConnection from './EditOntologyRestoreConnection'

const EditOntology = ({
  selectedGraphVersion,
  graphVersions,
}) => {
  const { t } = useTranslation()

  const [operation, setOperation] = useState('add')
  const [type, setType] = useState('node')

  const typeButtonsUpdate = [{
    label: t('node'),
    value: 'node',
    icon: 'pi-circle-off'
  }, {
    value: 'edge',
    label: t('edge'),
    icon: 'pi-arrow-right'
  }]

  const typeButtons = [
    ...typeButtonsUpdate,
    {
      value: 'connection',
      label: t('connection'),
      icon: 'pi-sort-alt'
    }]

  const operationButtons = [{
    value: 'add',
    label: t('add'),
    icon: 'pi-plus'
  }, {
    value: 'update',
    label: t('update'),
    icon: 'pi-pencil'
  }, {
    value: 'delete',
    label: t('delete'),
    icon: 'pi-times'
  }, {
    value: 'restore',
    label: t('restore'),
    icon: 'pi-replay'
  }]

  const itemTemplate = (option) => (
    <span className="edit-ontology-row-select-option">
      <i className={`pi ${option.icon}`} />
      {` ${option.label}`}
    </span>
  )

  const availableNodes = Object.keys(graphVersions[selectedGraphVersion].classesFromApi).map(
    (nodeId) => ({
      value: nodeId,
      label: graphVersions[selectedGraphVersion].classesFromApi[nodeId].rdfsLabel || nodeId
    })
  )

  const availableEdges = Object.keys(graphVersions[selectedGraphVersion].objectPropertiesFromApi).map(
    (edgeId) => ({
      value: edgeId,
      label: graphVersions[selectedGraphVersion].objectPropertiesFromApi[edgeId].rdfsLabel || edgeId
    })
  ).filter((item) => !REQUIRED_PREDICATES.includes(item.value))

  const deletedNodes = graphVersions[selectedGraphVersion].deletedNodes?.map(
    (nodeId) => ({
      value: nodeId,
      label: graphVersions[selectedGraphVersion].classesFromApiBackup[nodeId] ? graphVersions[selectedGraphVersion].classesFromApiBackup[nodeId].rdfsLabel : nodeId
    })
  )

  const deletedEdges = graphVersions[selectedGraphVersion].deletedEdges?.map(
    (edgeId) => ({
      value: edgeId,
      label: graphVersions[selectedGraphVersion].objectPropertiesFromApiBackup[edgeId] ? graphVersions[selectedGraphVersion].objectPropertiesFromApiBackup[edgeId].rdfsLabel : edgeId
    })
  )

  return (
    <>
      <div className="sidebar-main-title">
        { t(SIDEBAR_VIEW_EDIT_ONTOLOGY)}
      </div>
      <div className="edit-ontology">
        <div
          className="edit-ontology-row"
        >
          <label htmlFor="operation-select">
            {t('chooseOperation')}
          </label>
          <SelectButton
            id="operation-select"
            value={operation}
            options={operationButtons}
            onChange={(e) => {
              setOperation(e.value)
            }}
            itemTemplate={itemTemplate}
          />
        </div>

        <div
          className="edit-ontology-row"
        >
          <label htmlFor="type-select">
            {t('chooseElementType')}
          </label>
          <SelectButton
            id="type-select"
            value={type}
            options={operation === 'update'
              ? typeButtonsUpdate
              : typeButtons}
            onChange={(e) => {
              setType(e.value)
            }}
            itemTemplate={itemTemplate}
          />
        </div>

        {
          operation === 'add'
          && (
            <>
              {
                type === 'connection'
                  ? (
                    <EditOntologyAddConnection
                      optionNodes={availableNodes}
                      optionEdges={availableEdges}
                      type={type}
                      operation={operation}
                    />
                  )
                  : (
                    <EditOntologyAddEdgeNode
                      type={type}
                      operation={operation}
                    />
                  )
              }
            </>
          )
        }

        {
          operation === 'update'
          && (
            <EditOntologyUpdateEdgeNode
              type={type}
              operation={operation}
              optionNodes={availableNodes}
              optionEdges={availableEdges}
            />
          )
        }

        {
          operation === 'delete'
          && (
            <>
              {
                type === 'connection'
                  ? (
                    <EditOntologyDeleteConnection
                      type={type}
                      operation={operation}
                    />
                  )
                  : (
                    <EditOntologyDeleteEdgeNode
                      type={type}
                      operation={operation}
                      optionNodes={availableNodes}
                      optionEdges={availableEdges}
                    />
                  )
              }
            </>
          )
        }

        {
          operation === 'restore'
          && (
            <>
              {
                type === 'connection'
                  ? (
                    <EditOntologyRestoreConnection
                      type={type}
                      operation={operation}
                    />
                  )
                  : (
                    <EditOntologyRestoreEdgeNode
                      type={type}
                      operation={operation}
                      optionNodes={deletedNodes}
                      optionEdges={deletedEdges}
                    />
                  )
              }
            </>
          )
        }
      </div>
    </>
  )
}

EditOntology.propTypes = {
  selectedGraphVersion: PropTypes.string.isRequired,
  graphVersions: PropTypes.shape().isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
}

const mapToProps = ({
  selectedGraphVersion,
  graphVersions,
  classesFromApi,
  objectPropertiesFromApi
}) => ({
  selectedGraphVersion,
  graphVersions,
  classesFromApi,
  objectPropertiesFromApi
})

export default connect(
  mapToProps,
  actions
)(EditOntology)
