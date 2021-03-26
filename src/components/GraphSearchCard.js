import { useState } from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Card } from 'primereact/card'
import actions from '../store/actions'
import { RESERVED_PROPERTIES } from '../constants/graph'
import setSearchNeighbourNodes from '../utils/graphSearch/setSearchNeighbourNodes'

const GraphSearchCard = ({
  updateStoreValue,
  searchResult,
  globalNodeStyling,
  userDefinedNodeStyling,
  globalEdgeStyling,
  userDefinedEdgeStyling
}) => {
  const { t } = useTranslation()

  const [isShowMore, setShowMore] = useState(false)
  const { type, userDefined } = searchResult

  const { stylingNodeCaptionProperty } = userDefined ? userDefinedNodeStyling : globalNodeStyling
  const { stylingEdgeCaptionProperty } = userDefined ? userDefinedEdgeStyling : globalEdgeStyling

  const captionProperty = type === 'edge' ? stylingEdgeCaptionProperty : stylingNodeCaptionProperty

  const label = searchResult[captionProperty]

  const properties = Object.keys(searchResult).filter((property) => !RESERVED_PROPERTIES.includes(property))

  return (
    <Card
      title={label}
    >
      <Divider />
      <div className="p-card-row">

        <span className="bold">
          {t('type')}
        </span>
        :
        {' '}
        {t(type)}
      </div>
      {
        isShowMore
        && properties.length > 0
        && properties.map((property) => (
          <div
            key={`property-${label}-${property}`}
            className="p-card-row"
          >
            <span className="bold">
              {property}
            </span>
            :
            {' '}
            {searchResult[property]}
          </div>
        ))
      }
      <Divider />
      <div className="p-card-buttons">
        <Button
          aria-label="showMore"
          className="p-card-buttons-info"
          label={t(isShowMore ? 'lessInfo' : 'moreInfo')}
          onClick={() => setShowMore(!isShowMore)}
        />

        <Button
          aria-label={t('show')}
          label={t('show')}
          onClick={() => setSearchNeighbourNodes({
            separationDegree: 1,
            updateStoreValue,
            searchResult
          })}
        />
      </div>
    </Card>
  )
}

GraphSearchCard.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  searchResult: PropTypes.shape().isRequired,
  globalNodeStyling: PropTypes.shape().isRequired,
  userDefinedNodeStyling: PropTypes.shape().isRequired,
  globalEdgeStyling: PropTypes.shape().isRequired,
  userDefinedEdgeStyling: PropTypes.shape().isRequired,
}

const mapToProps = ({
  entrySearchResults,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty,
  globalNodeStyling,
  userDefinedNodeStyling,
  globalEdgeStyling,
  userDefinedEdgeStyling
}) => ({
  entrySearchResults,
  stylingNodeCaptionProperty,
  stylingEdgeCaptionProperty,
  globalNodeStyling,
  userDefinedNodeStyling,
  globalEdgeStyling,
  userDefinedEdgeStyling
})

export default connect(
  mapToProps,
  actions
)(GraphSearchCard)
