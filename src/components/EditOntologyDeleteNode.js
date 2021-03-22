import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import { USER_DEFINED_PROPERTY } from '../constants/graph'

const EditOntologyDeleteNode = ({
  type,
  operation,
  setStoreState,
  addNumber,
  optionNodes,
  addSubValueToObject,
  toggleFromArrayInKey
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState(undefined)

  const userDefinedNodes = optionNodes && optionNodes.length > 0
    ? optionNodes.filter((node) => node[USER_DEFINED_PROPERTY])
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
          options={userDefinedNodes}
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

EditOntologyDeleteNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  addSubValueToObject: PropTypes.func.isRequired,
  toggleFromArrayInKey: PropTypes.func.isRequired,
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
)(EditOntologyDeleteNode)
