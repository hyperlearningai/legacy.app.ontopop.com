import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { SelectButton } from 'primereact/selectbutton'
import { orderBy, uniqBy } from 'lodash'
import { SIDEBAR_VIEW_EDIT_ONTOLOGY } from '../constants/views'
import actions from '../store/actions'
import EditOntologyAddNode from './EditOntologyAddNode'
import EditOntologyAddConnection from './EditOntologyAddConnection'
import EditOntologyUpdateNode from './EditOntologyUpdateNode'
import EditOntologyDeleteNode from './EditOntologyDeleteNode'
import EditOntologyDeleteConnection from './EditOntologyDeleteConnection'
import EditOntologyRestoreNode from './EditOntologyRestoreNode'
import EditOntologyRestoreConnection from './EditOntologyRestoreConnection'
import getNodeIds from '../utils/nodesEdgesUtils/getNodeIds'
import getNode from '../utils/nodesEdgesUtils/getNode'

const EditOntology = ({
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
  }]

  const typeButtons = [
    ...typeButtonsUpdate,
    {
      value: 'connection',
      label: t('edge'),
      icon: 'pi-arrow-right' // 'pi-sort-alt'
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

  const availableNodeIds = getNodeIds()

  const availableNodes = availableNodeIds.length > 0 ? availableNodeIds.map(
    (nodeId) => {
      const node = getNode(nodeId)

      const label = node[stylingNodeCaptionProperty]

      return ({
        value: nodeId,
        label: label || nodeId
      })
    }
  ) : []

  const availableEdges = orderBy(uniqBy(Object.keys(objectPropertiesFromApi).map(
    (edgeId) => {
      const {
        objectPropertyRdfAbout,
        objectPropertyRdfsLabel
      } = objectPropertiesFromApi[edgeId].edgeProperties

      return ({
        value: objectPropertyRdfAbout,
        label: objectPropertiesFromApi[edgeId][stylingEdgeCaptionProperty] || objectPropertyRdfsLabel
      })
    }
  ), 'label'), ['label'], ['asc'])

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
            value={operation === 'update' ? 'node' : type}
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
                    <EditOntologyAddNode
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
            <EditOntologyUpdateNode
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
                    <EditOntologyDeleteNode
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
                    <EditOntologyRestoreNode
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
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  classesFromApiBackup: PropTypes.shape().isRequired,
  objectPropertiesFromApiBackup: PropTypes.shape().isRequired,
  deletedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  deletedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  stylingNodeCaptionProperty: PropTypes.string.isRequired,
  stylingEdgeCaptionProperty: PropTypes.string.isRequired,
}

const mapToProps = ({
  objectPropertiesFromApi,
  classesFromApiBackup,
  objectPropertiesFromApiBackup,
  deletedNodes,
  deletedEdges,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty
}) => ({
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
