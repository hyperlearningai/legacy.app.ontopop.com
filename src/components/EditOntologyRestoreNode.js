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
  updateStoreValue,
  optionNodes,
  optionEdges,
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState(undefined)

  return (
    <>
      {
        (type === 'node'
          && optionNodes.length === 0)
        || (type === 'edge'
          && optionEdges.length === 0)
          ? (
            <div className="sidebar-main-body-info m-t-50">
              {t('noDeletedElements')}
            </div>
          ) : (
            <>
              <div className="edit-ontology-row">
                <label
                  className="sidebar-main-body-label"
                  htmlFor="element-select"
                >
                  {t('selectElement')}
                </label>

                <MultiSelect
                  value={selectedElement}
                  className="m-t-20"
                  options={type === 'node' ? optionNodes : optionEdges}
                  onChange={(e) => setSelectedElement(e.value)}
                  placeholder={t('selectElement')}
                  display="chip"
                  filter
                  showClear
                  filterBy="label"
                />
              </div>

              <Button
                aria-label={`${t(operation)}`}
                className="sidebar-button-primary go-button"
                disabled={!selectedElement}
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
            </>
          )
      }
    </>
  )
}

EditOntologyRestoreNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
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
