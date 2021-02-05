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
import setShortestPath from '../utils/setShortestPath'

const ShortestPath = ({
  classesFromApi,
  removeFromArray,
  setStoreState,
  shortestPathSelectedNodes,
  updateGraphData,
}) => {
  const { t } = useTranslation()

  const [isNodeOverlay, setNodeOverlay] = useState(false)

  useEffect(() => {
    setStoreState('isShortestPathNodeSelectable', true)
    setStoreState('shortestPathSelectedNodes', [])

    return () => {
      setStoreState('isShortestPathNodeSelectable', false)
      setStoreState('shortestPathSelectedNodes', [])
    }
  }, [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SHORTEST_PATH)}
      </div>
      <div className="shortest-path">
        <div className="shortest-path-selection">
          {t('selectNodesFromGraph')}
        </div>

        {
          shortestPathSelectedNodes?.length > 0 && (
            <div className="shortest-path-nodes-list">
              {shortestPathSelectedNodes.map((node) => (
                <Chip
                  key={`shortest-path-node-${node}`}
                  label={classesFromApi[node].label}
                  removable
                  onRemove={() => removeFromArray('shortestPathSelectedNodes', node)}
                />
              ))}
            </div>
          )
        }

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
          disabled={shortestPathSelectedNodes.length < 2}
          icon="pi pi-chevron-right"
          iconPos="right"
          label={t('show')}
          onClick={() => setShortestPath({
            isNodeOverlay,
            setStoreState,
            updateGraphData,
          })}
        />
      </div>
    </>
  )
}

ShortestPath.propTypes = {
  classesFromApi: PropTypes.shape().isRequired,
  removeFromArray: PropTypes.func.isRequired,
  setStoreState: PropTypes.func.isRequired,
  shortestPathSelectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateGraphData: PropTypes.func.isRequired,
}

const mapToProps = ({
  classesFromApi,
  removeFromArray,
  setStoreState,
  shortestPathSelectedNodes,
  updateGraphData,
}) => ({
  classesFromApi,
  removeFromArray,
  setStoreState,
  shortestPathSelectedNodes,
  updateGraphData,
})

export default connect(
  mapToProps,
  actions
)(ShortestPath)
