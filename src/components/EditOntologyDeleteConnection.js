import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import { getEdgeAndNodes } from '../constants/functions'
import { LABEL_PROPERTY, SUB_CLASS_OF_LABEL } from '../constants/graph'

const EditOntologyDeleteConnection = ({
  type,
  operation,
  setStoreState,
  addToArray,
  removeFromObject,
  addToObject,
  availableEdges,
  classesFromApi,
  objectPropertiesFromApi
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  const optionConnections = availableEdges.getIds().map((edgeId) => {
    const [predicate, from, to] = getEdgeAndNodes(edgeId)

    const fromLabel = classesFromApi[from][LABEL_PROPERTY]
    const toLabel = classesFromApi[to][LABEL_PROPERTY]
    const predicateLabel = objectPropertiesFromApi[predicate] ? objectPropertiesFromApi[predicate][LABEL_PROPERTY] : SUB_CLASS_OF_LABEL

    const label = `${fromLabel} => (${predicateLabel}) => ${toLabel}`

    return ({
      value: edgeId,
      label
    })
  })

  return (
    <>
      <div
        className="edit-ontology-row"
      >
        <label htmlFor="element-select">
          {t('selectElement')}
        </label>

        <MultiSelect
          value={selectedElement}
          options={optionConnections}
          onChange={(e) => setSelectedElement(e.value)}
          placeholder={t('selectElement')}
          display="chip"
          filter
          showClear
          filterBy="label"
        />
      </div>

      <div className="edit-ontology-row">
        <Button
          className="go-button"
          tooltip={`${t(operation)}`}
          disabled={!selectedElement}
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

EditOntologyDeleteConnection.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  addToArray: PropTypes.func.isRequired,
  removeFromObject: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
  availableEdges: PropTypes.shape.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
}

const mapToProps = ({
  selectedGraphVersion,
  graphVersions,
  availableEdges,
  classesFromApi,
  objectPropertiesFromApi
}) => ({
  selectedGraphVersion,
  graphVersions,
  availableEdges,
  classesFromApi,
  objectPropertiesFromApi
})

export default connect(
  mapToProps,
  actions
)(EditOntologyDeleteConnection)
