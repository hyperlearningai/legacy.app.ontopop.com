import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import getElementLabel from '../utils/networkStyling/getElementLabel'

const EditOntologyRestoreEdge = ({
  type,
  operation,
  updateStoreValue,
  objectPropertiesFromApiBackup,
  deletedEdges,
  deletedNodes,
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

      const fromLabel = getElementLabel({
        type: 'node',
        id: from
      })

      const toLabel = getElementLabel({
        type: 'node',
        id: to
      })

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

EditOntologyRestoreEdge.propTypes = {
  type: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  updateStoreValue: PropTypes.func.isRequired,
  objectPropertiesFromApiBackup: PropTypes.shape().isRequired,
  deletedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  deletedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapToProps = ({
  deletedEdges,
  deletedNodes,
  objectPropertiesFromApiBackup,
}) => ({
  deletedEdges,
  deletedNodes,
  objectPropertiesFromApiBackup,
})

export default connect(
  mapToProps,
  actions
)(EditOntologyRestoreEdge)
