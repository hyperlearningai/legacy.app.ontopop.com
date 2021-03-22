import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'
import { uniq } from 'lodash'
import actions from '../store/actions'
import {
  SIDEBAR_VIEW_SHORTEST_PATH
} from '../constants/views'
import setShortestPath from '../utils/shortestPath/setShortestPath'
import resetShortestPathNodes from '../utils/shortestPath/resetShortestPathNodes'
import setNodesStyle from '../utils/networkStyling/setNodesStyle'
import highlightSelectedNode from '../utils/nodesSelection/highlightSelectedNode'
import getNodeIds from '../utils/nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getElementLabel from '../utils/networkStyling/getElementLabel'

const ShortestPath = ({
  setStoreState,
  addToObject,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable,
}) => {
  const { t } = useTranslation()

  const [isNodeOverlay, setNodesOverlay] = useState(false)
  const [nodesToExclude, setNodesToExclude] = useState([])
  const [edgesToExclude, setEdgesToExclude] = useState([])

  useEffect(() => () => resetShortestPathNodes({
    setStoreState
  }), [])

  useEffect(() => {
    setNodesStyle()

    if (shortestPathNode1 && shortestPathNode1 !== '') {
      highlightSelectedNode({
        setStoreState,
        selectedNode: shortestPathNode1
      })
    }

    if (shortestPathNode2 && shortestPathNode2 !== '') {
      highlightSelectedNode({
        setStoreState,
        selectedNode: shortestPathNode2
      })
    }
  }, [shortestPathNode1, shortestPathNode2])

  const availableNodeIds = getNodeIds()

  const availableNodes = availableNodeIds.length > 0 ? availableNodeIds.map(
    (nodeId) => {
      const label = getElementLabel({
        type: 'node',
        id: nodeId
      })

      return ({
        value: nodeId,
        label: label || nodeId
      })
    }
  ) : []

  const availableEdgeIds = getEdgeIds()

  const availableEdges = availableEdgeIds.length > 0 ? uniq(availableEdgeIds.map(
    (edgeId) => {
      const label = getElementLabel({
        type: 'edge',
        id: edgeId
      })

      return label
    }
  )).sort().map((label) => ({
    value: label,
    label
  })) : []

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SHORTEST_PATH)}
      </div>
      <div className="shortest-path">
        <div className="shortest-path-message">
          {t('selectNodesFromGraphOrFromList')}
        </div>

        <div className="shortest-path-button">
          <Button
            aria-label={t('edit')}
            label={t('selectStartingNode')}
            id="shortest-path-button-1"
            icon={isShortestPathNode1Selectable ? 'pi pi-circle-on' : 'pi pi-circle-off'}
            onClick={() => {
              setStoreState('isShortestPathNode2Selectable', false)
              setStoreState('isShortestPathNode1Selectable', true)
            }}
          />
        </div>

        <div className="shortest-path-dropdown">
          <Dropdown
            id="node-select-1"
            value={shortestPathNode1}
            filter
            options={availableNodes}
            onChange={(e) => setStoreState('shortestPathNode1', e.value)}
            placeholder={t('selectNode')}
          />
        </div>

        <div className="shortest-path-button">
          <Button
            aria-label={t('selectEndingNode')}
            label={t('selectEndingNode')}
            id="shortest-path-button-2"
            icon={isShortestPathNode2Selectable ? 'pi pi-circle-on' : 'pi pi-circle-off'}
            onClick={() => {
              setStoreState('isShortestPathNode1Selectable', false)
              setStoreState('isShortestPathNode2Selectable', true)
            }}
          />
        </div>

        <div className="shortest-path-dropdown">
          <Dropdown
            id="node-select-2"
            value={shortestPathNode2}
            filter
            options={availableNodes}
            onChange={(e) => setStoreState('shortestPathNode2', e.value)}
            placeholder={t('selectNode')}
          />
        </div>

        <div className="shortest-path-multiselect-label m-t-40 m-b-10">
          {t('nodesToExclude')}
        </div>

        <div className="shortest-path-multiselect">
          <MultiSelect
            id="excluded-nodes-select"
            value={nodesToExclude}
            filter
            options={availableNodes.length > 0
              ? availableNodes.filter((node) => (
                node.id !== shortestPathNode1
                && node.id !== shortestPathNode2
              ))
              : []}
            onChange={(e) => setNodesToExclude(e.value)}
            placeholder={t('selectNodes')}
          />
        </div>

        <div className="shortest-path-multiselect-label  m-t-40 m-b-10">
          {t('edgesToExclude')}
        </div>

        <div className="shortest-path-multiselect">
          <MultiSelect
            id="excluded-edges-select"
            value={edgesToExclude}
            filter
            options={availableEdges}
            onChange={(e) => setEdgesToExclude(e.value)}
            placeholder={t('selectEdges')}
          />
        </div>

        <div className="shortest-path-toggle p-col-12  m-t-40">
          <Checkbox
            id="overlay-checkbox"
            onChange={(e) => setNodesOverlay(e.checked)}
            checked={isNodeOverlay}
          />
          <label htmlFor="overlay-checkbox" className="p-checkbox-label">
            {t(isNodeOverlay ? 'isNodeOverlay' : 'isNotNodeOverlay')}
          </label>
        </div>

        <div className="shortest-path-buttons m-t-20">
          <Button
            aria-label={t('showShortestPath')}
            tooltip={t('showShortestPath')}
            className="shortest-path-show-button"
            disabled={shortestPathNode1 === '' || shortestPathNode2 === ''}
            icon="pi pi-chevron-right"
            iconPos="right"
            label={t('show')}
            onClick={() => setShortestPath({
              isNodeOverlay,
              setStoreState,
              addToObject,
              nodesToExclude,
              edgesToExclude
            })}
          />
        </div>
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
  isShortestPathNode2Selectable,
}) => ({
  classesFromApi,
  setStoreState,
  addToObject,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable,
})

export default connect(
  mapToProps,
  actions
)(ShortestPath)
