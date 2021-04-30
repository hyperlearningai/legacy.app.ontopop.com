import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import EditOntologyForm from './EditOntologyForm'
import { LABEL_PROPERTY, RDF_ABOUT_PROPERTY } from '../constants/graph'

const EditOntologyAddNode = ({
  type,
  operation,
  updateStoreValue,
  classesFromApi,
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  return (
    <>
      <div className="sidebar-main-body-title m-t-50">
        {t('insertProperties')}
      </div>

      <EditOntologyForm
        selectedElement={selectedElement}
        selectedElementProperties={selectedElementProperties}
        setSelectedElementProperties={setSelectedElementProperties}
        operation={operation}
        type={type}
      />

      {
        classesFromApi[selectedElementProperties[RDF_ABOUT_PROPERTY]] && (
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

      <Button
        className="sidebar-button-primary go-button m-t-50"
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
        disabled={operation === 'add'
        && (
          !selectedElementProperties[LABEL_PROPERTY]
          || selectedElementProperties[LABEL_PROPERTY] === ''
        )}
        label={t(operation)}
        icon="pi pi-chevron-right"
        aria-label={t(operation)}
        iconPos="right"
      />
    </>
  )
}

EditOntologyAddNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  updateStoreValue: PropTypes.func.isRequired,
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
