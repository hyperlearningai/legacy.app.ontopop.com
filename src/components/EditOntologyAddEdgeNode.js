import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import EditOntologyForm from './EditOntologyForm'
import { UNIQUE_PROPERTY } from '../constants/graph'

const EditOntologyAddEdgeNode = ({
  type,
  operation,
  setStoreState,
  addToArray,
  removeFromObject,
  addToObject,
  classesFromApi,
  objectPropertiesFromApi
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
        ((type === 'node'
        && classesFromApi[selectedElementProperties[UNIQUE_PROPERTY]])
        || (type === 'edge'
        && objectPropertiesFromApi[selectedElementProperties[UNIQUE_PROPERTY]])) && (
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
          className="go-button"
          tooltip={`${t(operation)}`}
          disabled={operation === 'add'
              && (
                !selectedElementProperties[UNIQUE_PROPERTY]
                || selectedElementProperties[UNIQUE_PROPERTY] === ''
                || (
                  type === 'node' && classesFromApi[selectedElementProperties[UNIQUE_PROPERTY]]
                )
                || (
                  type === 'edge' && objectPropertiesFromApi[selectedElementProperties[UNIQUE_PROPERTY]
                  ])
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

EditOntologyAddEdgeNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
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
)(EditOntologyAddEdgeNode)
