import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import actions from '../store/actions'
import setOntology from '../utils/editOntology/setOntology'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getEdge from '../utils/nodesEdgesUtils/getEdge'
import getNode from '../utils/nodesEdgesUtils/getNode'

const EditOntologyDeleteConnection = ({
  type,
  operation,
  setStoreState,
  addToArray,
  removeFromObject,
  addToObject,
  stylingNodeCaptionProperty
}) => {
  const { t } = useTranslation()

  const [selectedElement, setSelectedElement] = useState(undefined)
  const [selectedElementProperties, setSelectedElementProperties] = useState({})

  const optionConnections = getEdgeIds().map((edgeId) => {
    const { label, from, to } = getEdge(edgeId)

    const fromNode = getNode(from)
    const fromLabel = fromNode ? fromNode[stylingNodeCaptionProperty] : ''

    const toNode = getNode(to)
    const toLabel = toNode ? toNode[stylingNodeCaptionProperty] : ''

    const connectionLabel = `${fromLabel} => (${label}) => ${toLabel}`

    return ({
      value: edgeId,
      label: connectionLabel
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
  stylingNodeCaptionProperty: PropTypes.string.isRequired,
}

const mapToProps = ({
  selectedGraphVersion,
  graphVersions,
  stylingNodeCaptionProperty
}) => ({
  selectedGraphVersion,
  graphVersions,
  stylingNodeCaptionProperty
})

export default connect(
  mapToProps,
  actions
)(EditOntologyDeleteConnection)
