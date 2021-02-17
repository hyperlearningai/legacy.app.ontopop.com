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
  classesFromApi,
  objectPropertiesFromApi,
  classesFromApiBackup,
  objectPropertiesFromApiBackup,
  deletedNodes,
  deletedEdges,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty
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

  const availableNodes = Object.keys(classesFromApi).map(
    (nodeId) => ({
      value: nodeId,
      label: classesFromApi[nodeId][stylingNodeCaptionProperty] || nodeId
    })
  )

  const availableEdges = Object.keys(objectPropertiesFromApi).map(
    (edgeId) => ({
      value: edgeId,
      label: objectPropertiesFromApi[edgeId][stylingEdgeCaptionProperty] || edgeId
    })
  ).filter((item) => !REQUIRED_PREDICATES.includes(item.value))

  const deletedNodesList = deletedNodes?.map(
    (nodeId) => ({
      value: nodeId,
      label: classesFromApiBackup[nodeId] ? classesFromApiBackup[nodeId][stylingNodeCaptionProperty] : nodeId
    })
  )

  const deletedEdgesList = deletedEdges?.map(
    (edgeId) => ({
      value: edgeId,
      label: objectPropertiesFromApiBackup[edgeId] ? objectPropertiesFromApiBackup[edgeId][stylingEdgeCaptionProperty] : edgeId
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
                      optionNodes={deletedNodesList}
                      optionEdges={deletedEdgesList}
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
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  classesFromApiBackup: PropTypes.shape().isRequired,
  objectPropertiesFromApiBackup: PropTypes.shape().isRequired,
  deletedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  deletedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  stylingNodeCaptionProperty: PropTypes.string.isRequired,
  stylingEdgeCaptionProperty: PropTypes.string.isRequired,
}

const mapToProps = ({
  classesFromApi,
  objectPropertiesFromApi,
  classesFromApiBackup,
  objectPropertiesFromApiBackup,
  deletedNodes,
  deletedEdges,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty
}) => ({
  classesFromApi,
  objectPropertiesFromApi,
  classesFromApiBackup,
  objectPropertiesFromApiBackup,
  deletedNodes,
  deletedEdges,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty
})

export default connect(
  mapToProps,
  actions
)(EditOntology)
