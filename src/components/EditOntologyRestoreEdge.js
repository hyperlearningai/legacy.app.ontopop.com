import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'

const EditOntologyRestoreEdge = ({
  type,
  operation,
  setStoreState,
  addNumber,
  classesFromApiBackup,
  objectPropertiesFromApiBackup,
  deletedEdges,
  deletedNodes,
  userDefinedNodeStyling,
  globalNodeStyling
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  const optionEdges = deletedEdges.length > 0
    ? deletedEdges.filter(
      (edgeId) => {
        const {
          from,
          to
        } = objectPropertiesFromApiBackup[edgeId]

        const isFromNodeDeleted = deletedNodes.includes(from)
        const isToNodeDeleted = deletedNodes.includes(to)

        const isVisible = !isFromNodeDeleted && !isToNodeDeleted
        return isVisible
      }
    ).map((edgeId) => {
      const {
        from,
        to,
        label
      } = objectPropertiesFromApiBackup[edgeId]

      const { stylingNodeCaptionProperty: fromStylingNodeCaptionProperty } = classesFromApiBackup[from].userDefined ? userDefinedNodeStyling : globalNodeStyling
      const { stylingNodeCaptionProperty: toStylingNodeCaptionProperty } = classesFromApiBackup[to].userDefined ? userDefinedNodeStyling : globalNodeStyling

      const fromLabel = classesFromApiBackup[from][fromStylingNodeCaptionProperty]
      const toLabel = classesFromApiBackup[to][toStylingNodeCaptionProperty]

      const connectionLabel = `${fromLabel} => (${label}) => ${toLabel}`

      return ({
        value: edgeId,
        label: connectionLabel
      })
    }) : []

  return (
    <>
      {
        optionEdges.length === 0
          ? (
            <div className="edit-ontology-row">
              {t('noDeletedElements')}
            </div>
          ) : (
            <>
              <div className="edit-ontology-row">
                <label htmlFor="element-select">
                  {t('selectElement')}
                </label>

                <MultiSelect
                  value={selectedElement}
                  options={optionEdges}
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

EditOntologyRestoreEdge.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  setStoreState: PropTypes.func.isRequired,
  addNumber: PropTypes.func.isRequired,
  classesFromApiBackup: PropTypes.shape().isRequired,
  objectPropertiesFromApiBackup: PropTypes.shape().isRequired,
  deletedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  deletedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  userDefinedNodeStyling: PropTypes.shape().isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
}

const mapToProps = ({
  classesFromApiBackup,
  deletedEdges,
  deletedNodes,
  stylingNodeCaptionProperty,
  objectPropertiesFromApiBackup, userDefinedNodeStyling,
  globalNodeStyling
}) => ({
  classesFromApiBackup,
  deletedEdges,
  deletedNodes,
  stylingNodeCaptionProperty,
  objectPropertiesFromApiBackup,
  userDefinedNodeStyling,
  globalNodeStyling
})

export default connect(
  mapToProps,
  actions
)(EditOntologyRestoreEdge)
