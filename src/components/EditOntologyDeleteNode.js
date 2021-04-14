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
  updateStoreValue,
  optionNodes,
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState(undefined)

  const userDefinedNodes = optionNodes && optionNodes.length > 0
    ? optionNodes.filter((node) => node[USER_DEFINED_PROPERTY])
    : []

  return (
    <>
      {
        userDefinedNodes.length === 0
          ? (
            <div className="sidebar-main-body-info m-t-50">
              {t('noNodesToDelete')}
            </div>
          ) : (
            <>
              <div
                className="edit-ontology-row m-t-50"
              >
                <label
                  className="sidebar-main-body-label"
                  htmlFor="element-select"
                >
                  {t('selectElement')}
                </label>

                <MultiSelect
                  value={selectedElement}
                  options={userDefinedNodes}
                  onChange={(e) => setSelectedElement(e.value)}
                  placeholder={t('selectElement')}
                  className="m-t-10"
                  display="chip"
                  filter
                  showClear
                  filterBy="label"
                />
              </div>

              <Button
                aria-label={`${t(operation)}`}
                className="sidebar-button-primary go-button m-t-50"
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

EditOntologyDeleteNode.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  optionNodes: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
