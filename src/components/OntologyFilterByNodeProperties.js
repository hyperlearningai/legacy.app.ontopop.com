import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { orderBy } from 'lodash'
import actions from '../store/actions'
import focusNode from '../utils/focusNode'
import filterNodeProps from '../utils/filterNodeProps'
import NodesSelectionDetails from './NodesSelectionDetails'
import getEdgesAndNodeProperties from '../utils/getEdgesAndNodeProperties'
import {
  NODE_BACKGROUND,
} from '../constants/graph'
import highlightEdge from '../utils/highlightEdge'
import resetSearchSelection from '../utils/resetSearchSelection'

const OntologyFilterByNodeProperties = ({
  setStoreState,
  availableNodesNormalised,
  selectedNodes,
  removeFromArray,
  availableNodes,
  classesFromApi,
  filterNodeByPropsData,
  filterNodesByPropSelectedElement,
  objectPropertiesFromApi,
  removeFromObject,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  filterNodesByPropElementArray,
}) => {
  const { t } = useTranslation()
  const [isNodeSelected, toggleNodeSelected] = useState(false)
  const [nodeStringSearch, setNodeStringSearch] = useState('')
  const [selectedNodeProps, setSelectedNodeProps] = useState(null)
  const [prevSelectedNode, setPrevSelectedNode] = useState('')
  const [prevSelectedEdges, setPrevSelectedEdges] = useState([])
  const [nodeId, setNodeId] = useState('')

  const nodePropTemplate = (option) => (
    <div className="node-item">
      <div>{option.label}</div>
    </div>
  )

  const selectedNodesOptions = (option) => {
    if (option) {
      return (
        <div className="node-item node-item-value">
          <div>{option.label}</div>
        </div>
      )
    }

    return t('allNodeProperties')
  }

  useEffect(() => {
    getEdgesAndNodeProperties({ setStoreState })
    return () => filterNodeProps({
      searchFilterNode: '',
      searchFilterEdge: '',
      nodesIdsToDisplay,
      edgesIdsToDisplay,
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState
    })
  }, [])

  console.log({
    filterNodesByPropElementArray
  })

  return (
    <>
      <div className="p-b-10">
        <label htmlFor="filterNodeProps">{t('selectNodeProperties')}</label>
      </div>
      <div className="p-b-10">
        <MultiSelect
          id="filterNodeProps"
          value={selectedNodeProps}
          options={orderBy(filterNodesByPropElementArray, ['label'], ['asc'])}
          onChange={(e) => setSelectedNodeProps(e.value)}
          placeholder={t('allNodeProperties')}
          filter
          className="multiselect-custom"
          itemTemplate={nodePropTemplate}
          selectedItemTemplate={selectedNodesOptions}
          display="chip"
        />
      </div>
      <div className="p-b-10">
        <label htmlFor="filterNodePropsString">{t('searchInputText')}</label>
      </div>
      <div className="p-input-icon-right freetext-search-input">
        {nodeStringSearch === ''
          ? (
            <i className="pi pi-search" />
          )
          : (
            <i className="pi pi-times-circle" />
          )}

        <InputText
          id="filterNodePropsString"
          value={nodeStringSearch}
          placeholder={t('freeNodeSearchInputPlaceholder')}
          onChange={(e) => {
            setNodeStringSearch(e.target.value)
            filterNodeProps({
              searchFilterNode: e.target.value,
              nodesIdsToDisplay,
              edgesIdsToDisplay,
              classesFromApi,
              objectPropertiesFromApi,
              setStoreState
            })
          }}
        />

      </div>

      {!isNodeSelected ? (
        <div className="nodes-selection">
          {
            selectedNodes.length > 0
              ? selectedNodes.map((selectedNode) => {
                const { label } = availableNodesNormalised[selectedNode]

                return (
                  <div
                    className="nodes-selection-row"
                    key={`selected-node-row-${selectedNode}`}
                  >
                    <div className="nodes-selection-row-delete">
                      <Button
                        tooltip={`${t('removeNode')}: ${label}`}
                        onClick={() => removeFromArray('selectedNodes', selectedNode)}
                        icon="pi pi-times"
                      />
                    </div>
                    <div className="nodes-selection-row-main">
                      <Button
                        tooltip={`${t('viewNode')}: ${label}`}
                        onClick={() => {
                          setNodeId(selectedNode)
                          toggleNodeSelected(true)
                        }}
                        label={label}
                        icon="pi pi-chevron-right"
                        iconPos="right"
                      />
                    </div>
                  </div>
                )
              }) : (
                <div className="nodes-selection-message" />
              )
          }
        </div>
      ) : (
        <NodesSelectionDetails
          nodeId={nodeId}
        />
      )}

      <div className="freetext-search">
        {
          Object.keys(filterNodeByPropsData).length > 0
          && Object.keys(filterNodeByPropsData).map((elementId) => {
            const elementType = filterNodeByPropsData[elementId]

            const elementLabel = elementType === 'node'
              ? classesFromApi[elementId].rdfsLabel
              : objectPropertiesFromApi[elementId].rdfsLabel

            return (
              <div
                className={`freetext-search-row ${elementId === filterNodesByPropSelectedElement ? 'freetext-search-row-selected' : ''}`}
                key={`freetext-search-row-${elementId}`}
              >
                <div className="freetext-search-row-delete">

                  <Button
                    tooltip={`${t('removeGraph')}: ${elementId}`}
                    onClick={() => {
                      if (elementType === 'node') {
                        availableNodes.update(
                          [{ id: elementId, color: { background: NODE_BACKGROUND } }]
                        )
                      }

                      removeFromObject('filterNodeByPropsData', elementId)
                    }}
                    icon="pi pi-times"
                  />

                </div>

                <div className="freetext-search-row-main">
                  <Button
                    tooltip={`${t('focusElement')}: ${elementLabel}`}
                    disabled={elementId === filterNodesByPropSelectedElement}
                    onClick={() => {
                      setNodeId(elementId)
                      toggleNodeSelected(true)
                      resetSearchSelection({
                        prevSelectedEdges,
                        setPrevSelectedEdges,
                        prevSelectedNode,
                        setPrevSelectedNode,
                      })

                      if (elementType === 'edge') {
                        return highlightEdge({
                          setPrevSelectedEdges,
                          elementId,
                          setStoreState,
                        })
                      }

                      return focusNode({
                        setPrevSelectedNode,
                        elementId,
                        setStoreState
                      })
                    }}
                  >
                    <span>
                      <i className={`pi pi-${elementType === 'node' ? 'circle-off' : 'arrow-up'}`} />
                      {' '}
                      {elementLabel}
                    </span>
                    <i className="pi pi-chevron-right" />
                  </Button>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="p-l-30 p-t-30 p-r-30 p-b-30 text-center">
        <div>
          <Badge value="1" className="p-mr-2" size="large" severity="warning" />
        </div>
        <p><strong>{t('filterNodesDescription1')}</strong></p>
        <div>
          <Badge value="2" className="p-mr-2" size="large" severity="warning" />
        </div>
        <p><strong>{t('filterNodesDescription2')}</strong></p>
      </div>
    </>
  )
}

OntologyFilterByNodeProperties.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  removeFromObject: PropTypes.func.isRequired,
  removeFromArray: PropTypes.func.isRequired,
  availableNodes: PropTypes.shape().isRequired,
  filterNodeByPropsData: PropTypes.shape().isRequired,
  filterNodesByPropSelectedElement: PropTypes.string.isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableNodesNormalised: PropTypes.shape().isRequired,
  filterNodesByPropElementArray: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

const mapToProps = ({
  graphData,
  selectedNodes,
  currentGraph,
  classesFromApi,
  availableNodes,
  filterNodeByPropsData,
  filterNodesByPropSelectedElement,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  availableNodesNormalised,
  filterNodesByPropElementArray,
}) => ({
  graphData,
  selectedNodes,
  currentGraph,
  classesFromApi,
  availableNodes,
  filterNodeByPropsData,
  filterNodesByPropSelectedElement,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  availableNodesNormalised,
  filterNodesByPropElementArray,
})

export default connect(
  mapToProps,
  actions
)(OntologyFilterByNodeProperties)
