import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'

const EditOntologyRestoreNode = ({
  type,
  operation,
  setStoreState,
  addNumber,
  optionNodes,
  optionEdges
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState(undefined)

  return (
    <>
      <div
        className="edit-ontology-row"
      >
        {
          (type === 'node'
            && optionNodes.length === 0)
          || (type === 'edge'
            && optionEdges.length === 0)
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
                  options={type === 'node' ? optionNodes : optionEdges}
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

EditOntologyRestoreNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
)(EditOntologyRestoreNode)
