import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import actions from '../store/actions'

const ElementInfo = ({
  selectedNode,
  availableNodesNormalised,
  setStoreState,
  deletedNodes
}) => {
  const { t } = useTranslation()

  const selectedElementInfo = availableNodesNormalised[selectedNode]

  const tableRowNames = [
    'id',
    'rdfAbout',
    'skosComment',
    'skosDefinition',
    'skosExample'
  ]

  if (!selectedElementInfo) return null

  const { label } = selectedElementInfo

  return (
    <div className="element-info">
      <div className="element-info-title">
        {label}
      </div>

      {
        tableRowNames.map((tableRowName) => (
          <div
            className="element-info-item"
            key={`info-row-${tableRowName}`}
          >
            <span className="element-info-item-label">
              {t(tableRowName)}
            </span>
            <span className="element-info-item-value">
              {selectedElementInfo[tableRowName] || t('null')}
            </span>
          </div>
        ))
      }

      <div className="element-info-item">
        <button
          type="button"
          title={t('deleteNode')}
          onClick={() => {
            const newDeletedNodes = deletedNodes.slice()

            newDeletedNodes.push(selectedNode)

            setStoreState('deletedNodes', newDeletedNodes)

            setStoreState('selectedNode', undefined)
          }}
        >
          {t('deleteNode')}
        </button>
      </div>
    </div>
  )
}

ElementInfo.propTypes = {
  selectedNode: PropTypes.string,
  availableNodesNormalised: PropTypes.shape().isRequired,
  setStoreState: PropTypes.func.isRequired,
  deletedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

ElementInfo.defaultProps = {
  selectedNode: undefined,
}

const mapToProps = ({
  selectedNode,
  availableNodesNormalised,
  deletedNodes
}) => ({
  selectedNode,
  availableNodesNormalised,
  deletedNodes
})

export default connect(
  mapToProps,
  actions
)(ElementInfo)
