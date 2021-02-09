import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import EditOntologyForm from './EditOntologyForm'
import restoreUpdatedElement from '../utils/editOntology/restoreUpdatedElement'

const EditOntologyUpdateEdgeNode = ({
  type,
  operation,
  setStoreState,
  addToArray,
  removeFromObject,
  addToObject,
  optionNodes,
  optionEdges,
  classesFromApi,
  objectPropertiesFromApi,
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  return (
    <>
      <div
        className="edit-ontology-row"
      >
        <label htmlFor="graph-select">
          {t('selectElement')}
        </label>

        <Dropdown
          id="graph-select"
          value={selectedElement}
          filter
          options={type === 'node' ? optionNodes : optionEdges}
          onChange={(e) => setSelectedElement(e.value)}
          placeholder={t('selectElement')}
        />
      </div>

      {
        selectedElement
        && (
          <>
            <div
              className="edit-ontology-row"
            >
              <label htmlFor="graph-select">
                {t('insertProperties')}
              </label>
            </div>

            <EditOntologyForm
              selectedElementProperties={selectedElementProperties}
              operation={operation}
              type={type}
              setSelectedElementProperties={setSelectedElementProperties}
              initialData={type === 'node' ? classesFromApi[selectedElement] : objectPropertiesFromApi[selectedElement]}
            />

            <div className="edit-ontology-row">
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

            <div className="edit-ontology-row">
              <Button
                className="go-button"
                tooltip={`${t(operation)}`}
                onClick={() => {
                  setOntology({
                    operation,
                    type,
                    selectedElement,
                    setStoreState,
                    addToArray,
                    removeFromObject,
                    addToObject,
                    selectedElementProperties,
                    t
                  })
                  setSelectedElement(undefined)
                  setSelectedElementProperties({})
                }}
                label={t(operation)}
                icon="pi pi-chevron-right"
                iconPos="right"
              />
            </div>
          </>
        )
      }

    </>
  )
}

EditOntologyUpdateEdgeNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  addToArray: PropTypes.func.isRequired,
  removeFromObject: PropTypes.func.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  optionEdges: PropTypes.arrayOf(PropTypes.shape).isRequired,
  addToObject: PropTypes.func.isRequired,
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
)(EditOntologyUpdateEdgeNode)
