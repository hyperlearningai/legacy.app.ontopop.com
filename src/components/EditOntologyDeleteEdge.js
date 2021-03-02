import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'

const EditOntologyDeleteEdge = ({
  type,
  operation,
  setStoreState,
  addToArray,
  removeFromObject,
  addToObject,
  optionEdges
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  const userDeletedEdges = optionEdges && optionEdges.length > 0
    ? optionEdges.filter((edge) => edge.userDefined)
    : []

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
          options={userDeletedEdges}
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

EditOntologyDeleteEdge.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  addToArray: PropTypes.func.isRequired,
  removeFromObject: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
  optionEdges: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  selectedGraphVersion,
  graphVersions,
}) => ({
  selectedGraphVersion,
  graphVersions,
})

export default connect(
  mapToProps,
  actions
)(EditOntologyDeleteEdge)
