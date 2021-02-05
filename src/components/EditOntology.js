import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import { SIDEBAR_VIEW_VERSIONING } from '../constants/views'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import EditOntologyForm from './EditOntologyForm'
import { UNIQUE_PROPERTY } from '../constants/graph'
import restoreUpdatedElement from '../utils/restoreUpdatedElement'

const EditOntology = ({
  selectedGraphVersion,
  graphVersions,
  setStoreState,
  addToArray,
  removeFromObject,
  addToObject,
  classesFromApi,
  objectPropertiesFromApi
}) => {
  const { t } = useTranslation()

  const [operation, setOperation] = useState('add')
  const [type, setType] = useState('node')
  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  const typeButtons = [{
    label: t('node'),
    value: 'node',
    icon: 'pi-circle-off'
  }, {
    value: 'edge',
    label: t('edge'),
    icon: 'pi-arrow-right'
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
    <span className="ontology-edit-row-select-option">
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
  )

  const deletedNodes = graphVersions[selectedGraphVersion].deletedNodes?.map(
    (nodeId) => ({
      value: nodeId,
      label: graphVersions[selectedGraphVersion].classesFromApiBackup[nodeId].rdfsLabel || nodeId
    })
  )

  const deletedEdges = graphVersions[selectedGraphVersion].deletedEdges?.map(
    (edgeId) => ({
      value: edgeId,
      label: graphVersions[selectedGraphVersion].objectPropertiesFromApiBackup[edgeId].rdfsLabel || edgeId
    })
  )

  return (
    <>
      <div className="sidebar-main-title">
        { t(SIDEBAR_VIEW_VERSIONING)}
      </div>
      <div className="ontology-edit">
        <div
          className="ontology-edit-row"
        >
          <label htmlFor="operation-select">
            {t('chooseOperation')}
          </label>
          <SelectButton
            id="operation-select"
            value={operation}
            options={operationButtons}
            onChange={(e) => {
              setSelectedElement(undefined)
              setSelectedElementProperties({})
              setOperation(e.value)
            }}
            itemTemplate={itemTemplate}
          />
        </div>

        <div
          className="ontology-edit-row"
        >
          <label htmlFor="type-select">
            {t('chooseElementType')}
          </label>
          <SelectButton
            id="type-select"
            value={type}
            options={typeButtons}
            onChange={(e) => {
              setSelectedElement(undefined)
              setSelectedElementProperties({})
              setType(e.value)
            }}
            itemTemplate={itemTemplate}
          />
        </div>

        {
          operation === 'restore' && (
            <div
              className="ontology-edit-row"
            >
              {
                (type === 'node'
                  && deletedNodes.length === 0)
                || (type === 'edge'
                  && deletedEdges.length === 0)
                  ? (
                    <div>
                      {t('noDeletedElements')}
                    </div>
                  ) : (
                    <>
                      <label htmlFor="element-select">
                        {t('selectElement')}
                      </label>

                      <MultiSelect
                        value={selectedElement}
                        options={type === 'node' ? deletedNodes : deletedEdges}
                        onChange={(e) => setSelectedElement(e.value)}
                        placeholder={t('selectElement')}
                        display="chip"
                        filter
                        showClear
                        filterBy="label"
                      />
                    </>
                  )
              }

            </div>
          )
        }

        {
          operation === 'delete' && (
            <div
              className="ontology-edit-row"
            >
              <label htmlFor="element-select">
                {t('selectElement')}
              </label>

              <MultiSelect
                value={selectedElement}
                options={type === 'node' ? availableNodes : availableEdges}
                onChange={(e) => setSelectedElement(e.value)}
                placeholder={t('selectElement')}
                display="chip"
                filter
                showClear
                filterBy="label"
              />
            </div>
          )
        }

        {
          operation === 'update' && (
            <div
              className="ontology-edit-row"
            >
              <label htmlFor="graph-select">
                {t('selectElement')}
              </label>

              <Dropdown
                id="graph-select"
                value={selectedElement}
                options={type === 'node' ? availableNodes : availableEdges}
                onChange={(e) => setSelectedElement(e.value)}
                placeholder={t('selectElement')}
              />
            </div>
          )
        }

        {
          operation === 'update'
          && selectedElement
          && (
            <>
              <div
                className="ontology-edit-row"
              >
                <label htmlFor="graph-select">
                  {t('insertProperties')}
                </label>
              </div>

              <EditOntologyForm
                selectedElementProperties={selectedElementProperties}
                setSelectedElementProperties={setSelectedElementProperties}
                initialData={type === 'node' ? classesFromApi[selectedElement] : objectPropertiesFromApi[selectedElement]}
                operation={operation}
                type={type}
              />
            </>
          )
        }

        {
          operation === 'add'
          && (
            <>
              <div
                className="ontology-edit-row"
              >
                <label htmlFor="graph-select">
                  {t('insertProperties')}
                </label>
              </div>

              <EditOntologyForm
                selectedElement={selectedElement}
                selectedElementProperties={selectedElementProperties}
                setSelectedElementProperties={setSelectedElementProperties}
                operation={operation}
                type={type}
              />

              {
                ((type === 'node'
                && classesFromApi[selectedElementProperties[UNIQUE_PROPERTY]])
                || (type === 'edge'
                && objectPropertiesFromApi[selectedElementProperties[UNIQUE_PROPERTY]])) && (
                  <div
                    className="ontology-edit-row"
                  >
                    <small
                      id="username2-help"
                      className="p-error p-d-block"
                    >
                      {t('idExists')}
                    </small>
                  </div>
                )
              }
            </>
          )
        }

        {
          operation === 'update'
          && selectedElement
          && (
            <div className="ontology-edit-row">
              <Button
                className="go-button"
                tooltip={`${t(operation)}`}
                onClick={() => restoreUpdatedElement({
                  setSelectedElementProperties,
                  type,
                  selectedElement
                })}
                label={t('restoreOriginal')}
                icon="pi pi-refresh"
                iconPos="left"
              />
            </div>
          )
        }

        <div className="ontology-edit-row">
          <Button
            className="go-button"
            tooltip={`${t(operation)}`}
            disabled={operation === 'add'
              && (
                !selectedElementProperties[UNIQUE_PROPERTY]
                || selectedElementProperties[UNIQUE_PROPERTY] === ''
                || classesFromApi[selectedElementProperties[UNIQUE_PROPERTY]]
              )}
            onClick={() => {
              setOntology({
                operation,
                type,
                selectedElement,
                setStoreState,
                addToArray,
                removeFromObject,
                addToObject,
                selectedElementProperties
              })
              setSelectedElement(undefined)
              setSelectedElementProperties({})
            }}
            label={t(operation)}
            icon="pi pi-chevron-right"
            iconPos="right"
          />
        </div>
      </div>
    </>
  )
}

EditOntology.propTypes = {
  selectedGraphVersion: PropTypes.string.isRequired,
  graphVersions: PropTypes.shape().isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  setStoreState: PropTypes.func.isRequired,
  addToArray: PropTypes.func.isRequired,
  removeFromObject: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
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
