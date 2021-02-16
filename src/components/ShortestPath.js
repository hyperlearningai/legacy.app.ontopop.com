import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { ToggleButton } from 'primereact/togglebutton'
import { Chip } from 'primereact/chip'
import actions from '../store/actions'
import {
  SIDEBAR_VIEW_SHORTEST_PATH
} from '../constants/views'
import setShortestPath from '../utils/shortestPath/setShortestPath'
import getNode from '../utils/nodesEdgesUtils/getNode'
import resetShortestPathNodes from '../utils/shortestPath/resetShortestPathNodes'

const ShortestPath = ({
  setStoreState,
  addToObject,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable
}) => {
  const { t } = useTranslation()

  const [isNodeOverlay, setNodeOverlay] = useState(false)

  useEffect(() => () => resetShortestPathNodes({
    setStoreState
  }), [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SHORTEST_PATH)}
      </div>
      <div className="shortest-path">
        <div className="shortest-path-selection">
          {t('selectNodesFromGraph')}
        </div>

        <div className="shortest-path-button">
          <Button
            label={t('selectStartingNode')}
            icon={isShortestPathNode1Selectable ? 'pi pi-circle-on' : 'pi pi-circle-off'}
            onClick={() => {
              setStoreState('isShortestPathNode2Selectable', false)
              setStoreState('isShortestPathNode1Selectable', true)
            }}
          />
        </div>

        <div className="shortest-path-node">
          {
            shortestPathNode1 !== ''
            && (
              <Chip
                label={getNode(shortestPathNode1).label}
                removable
                onRemove={() => {
                  setStoreState('shortestPathNode1', '')
                }}
              />
            )
          }
        </div>

        <div className="shortest-path-button">
          <Button
            label={t('selectEndingNode')}
            icon={isShortestPathNode2Selectable ? 'pi pi-circle-on' : 'pi pi-circle-off'}
            onClick={() => {
              setStoreState('isShortestPathNode1Selectable', false)
              setStoreState('isShortestPathNode2Selectable', true)
            }}
          />
        </div>

        <div className="shortest-path-node">
          {
            shortestPathNode2 !== ''
            && (
              <Chip
                label={getNode(shortestPathNode2).label}
                removable
                onRemove={() => setStoreState('shortestPathNode2', '')}
              />
            )
          }
        </div>

        <div className="shortest-path-toggle">
          <ToggleButton
            checked={isNodeOverlay}
            onChange={() => setNodeOverlay(!isNodeOverlay)}
            onLabel={t('isNodeOverlay')}
            offLabel={t('isNotNodeOverlay')}
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            style={{ width: '100%' }}
          />
        </div>

        <Button
          tooltip={t('showNeighbourhood')}
          className="shortest-path-button"
          disabled={shortestPathNode1 === '' || shortestPathNode2 === ''}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setShortestPath({
            isNodeOverlay,
            setStoreState,
            addToObject,
          })}
        />
      </div>
    </>
  )
}

ShortestPath.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  addToObject: PropTypes.func.isRequired,
  shortestPathNode1: PropTypes.string.isRequired,
  shortestPathNode2: PropTypes.string.isRequired,
  isShortestPathNode1Selectable: PropTypes.bool.isRequired,
  isShortestPathNode2Selectable: PropTypes.bool.isRequired,
}

const mapToProps = ({
  classesFromApi,
  setStoreState,
  addToObject,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable
}) => ({
  classesFromApi,
  setStoreState,
  addToObject,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable
})

export default connect(
  mapToProps,
  actions
)(ShortestPath)
