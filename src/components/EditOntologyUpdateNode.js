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
import { USER_DEFINED_PROPERTY } from '../constants/graph'

const EditOntologyUpdateNode = ({
  operation,
  setStoreState,
  addNumber,
  optionNodes,
  classesFromApi,
  addSubValueToObject,
  toggleFromArrayInKey
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  const type = 'node'

  const userDefinedNodes = optionNodes && optionNodes.length > 0
    ? optionNodes.filter((node) => node[USER_DEFINED_PROPERTY])
    : []

  return (
    <>
      <div
        className="edit-ontology-row"
      >
        <label htmlFor="graph-select">
          {t('selectElement')}
        </label>

        <Dropdown
          ariaLabel="graph-select"
          id="graph-select"
          value={selectedElement}
          filter
          options={userDefinedNodes}
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
              initialData={classesFromApi[selectedElement]}
            />

            <div className="edit-ontology-row">
              <Button
                className="go-button"
                tooltip={`${t(operation)}`}
                onClick={() => restoreUpdatedElement({
                  setSelectedElementProperties,
                  selectedElement
                })}
                label={t('restoreOriginal')}
                aria-label={t('restoreOriginal')}
                icon="pi pi-refresh"
                iconPos="left"
              />
            </div>

            <div className="edit-ontology-row">
              <Button
                aria-label={t(operation)}
                className="go-button"
                tooltip={`${t(operation)}`}
                onClick={() => {
                  setOntology({
                    operation,
                    type,
                    selectedElement,
                    setStoreState,
                    addNumber,
                    selectedElementProperties,
                    addSubValueToObject,
                    toggleFromArrayInKey,
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

EditOntologyUpdateNode.propTypes = {
  operation: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  addSubValueToObject: PropTypes.func.isRequired,
  toggleFromArrayInKey: PropTypes.func.isRequired,
}

const mapToProps = ({
  selectedGraphVersion,
  graphVersions,
  classesFromApi,
}) => ({
  selectedGraphVersion,
  graphVersions,
  classesFromApi,
})

export default connect(
  mapToProps,
  actions
)(EditOntologyUpdateNode)
