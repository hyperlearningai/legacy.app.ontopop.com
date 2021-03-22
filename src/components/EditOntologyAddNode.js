import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import EditOntologyForm from './EditOntologyForm'
import { RDF_ABOUT_PROPERTY } from '../constants/graph'

const EditOntologyAddNode = ({
  type,
  operation,
  setStoreState,
  addNumber,
  classesFromApi,
  toggleFromArrayInKey,
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
        classesFromApi[selectedElementProperties[RDF_ABOUT_PROPERTY]]
         && (
         <div
           className="edit-ontology-row"
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

      <div className="edit-ontology-row">
        <Button
          aria-label={`${t(operation)}`}
          className="go-button"
          tooltip={`${t(operation)}`}
          disabled={operation === 'add'
              && (
                !selectedElementProperties[RDF_ABOUT_PROPERTY]
                || selectedElementProperties[RDF_ABOUT_PROPERTY] === ''
                || (
                  type === 'node' && classesFromApi[selectedElementProperties[RDF_ABOUT_PROPERTY]]
                )
              )}
          onClick={() => {
            setOntology({
              operation,
              type,
              selectedElement,
              setStoreState,
              selectedElementProperties,
              addNumber,
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

EditOntologyAddNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
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
)(EditOntologyAddNode)
