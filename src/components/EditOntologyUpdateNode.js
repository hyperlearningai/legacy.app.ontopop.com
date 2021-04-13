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
  updateStoreValue,
  optionNodes,
  classesFromApi,
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
        className="edit-ontology-row m-t-50"
      >
        <label
          className="sidebar-main-body-label m-t-50"
          htmlFor="graph-select"
        >
          {t('selectNode')}
        </label>

        <Dropdown
          aria-label="graph-select"
          id="graph-select"
          className="m-t-10"
          value={selectedElement}
          filter
          options={userDefinedNodes}
          onChange={(e) => setSelectedElement(e.value)}
          placeholder={t('selectNode')}
        />
      </div>

      {
        selectedElement
        && (
          <>
            <div className="sidebar-main-body-title m-t-50">
              {t('insertProperties')}
            </div>

            <EditOntologyForm
              selectedElementProperties={selectedElementProperties}
              operation={operation}
              type={type}
              setSelectedElementProperties={setSelectedElementProperties}
              initialData={classesFromApi[selectedElement]}
            />

            <div className="edit-ontology-row-buttons m-t-50">
              <Button
                className="sidebar-button-secondary go-button m-r-10"
                onClick={() => restoreUpdatedElement({
                  setSelectedElementProperties,
                  selectedElement
                })}
                label={t('restoreOriginal')}
                aria-label={t('restoreOriginal')}
                icon="pi pi-refresh"
                iconPos="left"
              />

              <Button
                aria-label={t(operation)}
                className="sidebar-button-primary go-button m-l-10"
                onClick={() => {
                  setOntology({
                    operation,
                    type,
                    selectedElement,
                    updateStoreValue,
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

EditOntologyUpdateNode.propTypes = {
  operation: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  classesFromApi: PropTypes.shape().isRequired,
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
