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
import highlightSelectedNode from '../utils/nodesSelection/highlightSelectedNode'
import getEdgeIds from '../utils/nodesEdgesUtils/getEdgeIds'
import getElementLabel from '../utils/networkStyling/getElementLabel'
import { OPERATION_TYPE_UPDATE } from '../constants/store'

const ShortestPath = ({
  updateStoreValue,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable,
  nodesDropdownLabels
}) => {
  const { t } = useTranslation()

  const [isNodeOverlay, setNodesOverlay] = useState(false)
  const [nodesToExclude, setNodesToExclude] = useState([])
  const [edgesToExclude, setEdgesToExclude] = useState([])

  useEffect(() => () => {
    resetShortestPathNodes({
      updateStoreValue
    })
    updateStoreValue(['isElementSelectable'], OPERATION_TYPE_UPDATE, true)
  }, [])

  useEffect(() => {
    if (shortestPathNode1 && shortestPathNode1 !== '') {
      highlightSelectedNode({
        updateStoreValue,
        selectedNode: shortestPathNode1
      })
    }

    if (shortestPathNode2 && shortestPathNode2 !== '') {
      highlightSelectedNode({
        updateStoreValue,
        selectedNode: shortestPathNode2
      })
    }
  }, [shortestPathNode1, shortestPathNode2])

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
      <h1 className="sidebar-main-title">
        {t(SIDEBAR_VIEW_SHORTEST_PATH)}
      </h1>
      <div className="shortest-path">
        <div className="shortest-path-message">
          {t('selectNodesFromGraphOrFromList')}
        </div>

        <div className="shortest-path-button">
          <Button
            ariaLabel={t('edit')}
            label={t('selectStartingNode')}
            id="shortest-path-button-1"
            icon={isShortestPathNode1Selectable ? 'pi pi-circle-on' : 'pi pi-circle-off'}
            onClick={() => {
              updateStoreValue(['isShortestPathNode2Selectable'], OPERATION_TYPE_UPDATE, false)
              updateStoreValue(['isShortestPathNode1Selectable'], OPERATION_TYPE_UPDATE, true)
            }}
          />
        </div>

        <div className="shortest-path-dropdown">
          <Dropdown
            ariaLabel="node-select-1"
            id="node-select-1"
            value={shortestPathNode1}
            filter
            options={nodesDropdownLabels.filter((node) => node.value !== shortestPathNode2)}
            onChange={(e) => updateStoreValue(['shortestPathNode1'], OPERATION_TYPE_UPDATE, e.value)}
            placeholder={t('selectNode')}
          />
        </div>

        <div className="shortest-path-button">
          <Button
            ariaLabel={t('selectEndingNode')}
            label={t('selectEndingNode')}
            id="shortest-path-button-2"
            icon={isShortestPathNode2Selectable ? 'pi pi-circle-on' : 'pi pi-circle-off'}
            onClick={() => {
              updateStoreValue(['isShortestPathNode1Selectable'], OPERATION_TYPE_UPDATE, false)
              updateStoreValue(['isShortestPathNode2Selectable'], OPERATION_TYPE_UPDATE, true)
            }}
          />
        </div>

        <div className="shortest-path-dropdown">
          <Dropdown
            ariaLabel="node-select-2"
            id="node-select-2"
            value={shortestPathNode2}
            filter
            options={nodesDropdownLabels.filter((node) => node.value !== shortestPathNode1)}
            onChange={(e) => updateStoreValue(['shortestPathNode2'], OPERATION_TYPE_UPDATE, e.value)}
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
            options={nodesDropdownLabels.length > 0
              ? nodesDropdownLabels.filter((node) => (
                node.value !== shortestPathNode1
                && node.value !== shortestPathNode2
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

        <div className="shortest-path-toggle p-col-12  m-t-10">
          <Checkbox
            id="overlay-checkbox"
            onChange={(e) => setNodesOverlay(e.checked)}
            checked={isNodeOverlay}
          />
          <label htmlFor="overlay-checkbox" className="p-checkbox-label">
            {t('overlay')}
          </label>
        </div>

        <div className="shortest-path-buttons m-t-20">
          <Button
            ariaLabel={t('showShortestPath')}
            tooltip={t('showShortestPath')}
            className="shortest-path-show-button"
            disabled={shortestPathNode1 === '' || shortestPathNode2 === ''}
            icon="pi pi-chevron-right"
            iconPos="right"
            label={t('show')}
            onClick={() => setShortestPath({
              isNodeOverlay,
              updateStoreValue,
              nodesToExclude,
              edgesToExclude,
            })}
          />
        </div>
      </div>
    </>
  )
}

ShortestPath.propTypes = {
  updateStoreValue: PropTypes.func.isRequired,
  shortestPathNode1: PropTypes.string.isRequired,
  shortestPathNode2: PropTypes.string.isRequired,
  isShortestPathNode1Selectable: PropTypes.bool.isRequired,
  isShortestPathNode2Selectable: PropTypes.bool.isRequired,
  nodesDropdownLabels: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapToProps = ({
  classesFromApi,
  updateStoreValue,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable,
  nodesDropdownLabels
}) => ({
  classesFromApi,
  updateStoreValue,
  shortestPathNode1,
  shortestPathNode2,
  isShortestPathNode1Selectable,
  isShortestPathNode2Selectable,
  nodesDropdownLabels
})

export default connect(
  mapToProps,
  actions
)(ShortestPath)
