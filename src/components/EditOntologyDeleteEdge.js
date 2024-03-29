import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import { USER_DEFINED_PROPERTY } from '../constants/graph'

const EditOntologyDeleteEdge = ({
  type,
  operation,
  updateStoreValue,
  optionEdges,
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  const userDeletedEdges = optionEdges && optionEdges.length > 0
    ? optionEdges.filter((edge) => edge[USER_DEFINED_PROPERTY])
    : []

  return (
    <>
      {
        userDeletedEdges.length === 0
          ? (
            <div className="sidebar-main-body-info m-t-50">
              {t('noEdgesToDelete')}
            </div>
          ) : (
            <>
              <div
                className="edit-ontology-row m-t-50"
              >
                <label
                  className="sidebar-main-body-label"
                  htmlFor="delete-element-select"
                >
                  {t('selectElement')}
                </label>

                <MultiSelect
                  id="delete-element-select"
                  className="m-t-10"
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
              </div>
            </>
          )
      }
    </>
  )
}

EditOntologyDeleteEdge.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
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
