import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const ElementInfo = ({
  selectedNode,
  availableNodesNormalised
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
    </div>
  )
}

ElementInfo.propTypes = {
  selectedNode: PropTypes.string,
  availableNodesNormalised: PropTypes.shape().isRequired,
}

ElementInfo.defaultProps = {
  selectedNode: undefined,
}

const mapToProps = ({
  selectedNode,
  availableNodesNormalised
}) => ({
  selectedNode,
  availableNodesNormalised
})

export default connect(
  mapToProps
)(ElementInfo)
