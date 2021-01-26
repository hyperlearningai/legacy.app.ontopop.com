import {
  useState,
  useEffect
} from 'react'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { InputText } from 'primereact/inputtext'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { MultiSelect } from 'primereact/multiselect'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import actions from '../store/actions'
import { SIDEBAR_VIEW_NODES_FILTER } from '../constants/views'
import focusNode from '../utils/focusNode'
import filterNodeProps from '../utils/filterNodeProps'
import {
  NODE_BACKGROUND,
} from '../constants/graph'
import highlightEdge from '../utils/highlightEdge'
import resetSearchSelection from '../utils/resetSearchSelection'

const OntologyFilter = ({
  setStoreState,
  availableNodes,
  classesFromApi,
  filterNodeByPropsData,
  filterNodesByPropSelectedElement,
  filterEdgeByPropsData,
  filterEdgesByPropSelectedElement,
  objectPropertiesFromApi,
  removeFromObject,
  nodesIdsToDisplay,
  edgesIdsToDisplay
}) => {
  const { t } = useTranslation()
  const [nodeStringSearch, setNodeStringSearch] = useState('')
  const [edgeStringSearch, setEdgeStringSearch] = useState('')
  const [selectedNodeProps, setSelectedNodeProps] = useState(null)
  const [selectedEdgeProps, setSelectedEdgeProps] = useState(null)
  const [prevSelectedNode, setPrevSelectedNode] = useState('')
  const [prevSelectedEdges, setPrevSelectedEdges] = useState([])
  const nodeProps = [
    { name: 'About', code: 'about' },
    { name: 'Comment', code: 'comment' },
    { name: 'Definition', code: 'definition' },
    { name: 'Label', code: 'label' }
  ]

  const edgeProps = [
    { name: 'About', code: 'about' },
    { name: 'Comment', code: 'comment' },
    { name: 'Definition', code: 'definition' },
    { name: 'Label', code: 'label' }
  ]

  const nodePropTemplate = (option) => (
    <div className="node-item">
      <div>{option.name}</div>
    </div>
  )

  const edgePropTemplate = (option) => (
    <div className="edge-item">
      <div>{option.name}</div>
    </div>
  )

  const selectedNodesOptions = (option) => {
    if (option) {
      return (
        <div className="node-item node-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return t('allNodeProperties')
  }

  const selectedEdgesOptions = (option) => {
    if (option) {
      return (
        <div className="edge-item edge-item-value">
          <div>{option.name}</div>
        </div>
      )
    }

    return t('allEdgeProperties')
  }

  useEffect(() => () => filterNodeProps({
    searchFilterNode: '',
    searchFilterEdge: '',
    nodesIdsToDisplay,
    edgesIdsToDisplay,
    classesFromApi,
    objectPropertiesFromApi,
    setStoreState
  }), [])

  return (
    <>
      <div className="sidebar-main-title">
        {t(SIDEBAR_VIEW_NODES_FILTER)}
      </div>
      <div className="ontology-filter">
        <div className="accordion-demo">
          <div className="card">
            <Accordion>
              <AccordionTab header={t('filterNodesByNodeProps')}>
                <div className="p-b-10">
                  <label htmlFor="filterNodeProps">{t('selectNodeProperties')}</label>
                </div>
                <div className="p-b-10">
                  <MultiSelect
                    id="filterNodeProps"
                    value={selectedNodeProps}
                    options={nodeProps}
                    onChange={(e) => setSelectedNodeProps(e.value)}
                    optionLabel="name"
                    placeholder={t('allNodeProperties')}
                    filter
                    className="multiselect-custom"
                    itemTemplate={nodePropTemplate}
                    selectedItemTemplate={selectedNodesOptions}
                  />
                </div>
                <div className="p-b-10">
                  <label htmlFor="filterNodePropsString">{t('searchInputText')}</label>
                </div>
                <div className="p-input-icon-right freetext-search-input">
                  <i className="pi pi-search" />
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
                
              </AccordionTab>
              <AccordionTab header={t('filterEdgesByEdgesProps')}>
                <div className="p-b-10">
                  <label htmlFor="filterEdgeProps">{t('selectEdgeProperties')}</label>
                </div>
                <div className="p-b-10">
                  <MultiSelect
                    id="filterEdgeProps"
                    value={selectedEdgeProps}
                    options={edgeProps}
                    onChange={(e) => setSelectedEdgeProps(e.value)}
                    optionLabel="name"
                    placeholder={t('allEdgeProperties')}
                    filter
                    className="multiselect-custom"
                    itemTemplate={edgePropTemplate}
                    selectedItemTemplate={selectedEdgesOptions}
                  />
                </div>
                <div className="p-b-10">
                  <label htmlFor="filterEdgePropsString">{t('searchInputText')}</label>
                </div>
                <div className="p-input-icon-right freetext-search-input">
                  <i className="pi pi-search" />

                  <InputText
                    id="filterEdgePropsString"
                    value={edgeStringSearch}
                    placeholder={t('freeEdgeSearchInputPlaceholder')}
                    onChange={(e) => {
                      setEdgeStringSearch(e.target.value)
                      filterNodeProps({
                        searchFilterEdge: e.target.value,
                        nodesIdsToDisplay,
                        edgesIdsToDisplay,
                        classesFromApi,
                        objectPropertiesFromApi,
                        setStoreState
                      })
                    }}
                  />

                </div>
                <div className="freetext-search">
                  {
                    Object.keys(filterEdgeByPropsData).length > 0
                    && Object.keys(filterEdgeByPropsData).map((elementId) => {
                      const elementType = filterEdgeByPropsData[elementId]

                      const elementLabel = elementType === 'node'
                        ? classesFromApi[elementId].rdfsLabel
                        : objectPropertiesFromApi[elementId].rdfsLabel

                      return (
                        <div
                          className={`freetext-search-row ${elementId === filterEdgesByPropSelectedElement ? 'freetext-search-row-selected' : ''}`}
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

                                removeFromObject('filterEdgeByPropsData', elementId)
                              }}
                              icon="pi pi-times"
                            />

                          </div>

                          <div className="freetext-search-row-main">
                            <Button
                              tooltip={`${t('focusElement')}: ${elementLabel}`}
                              disabled={elementId === filterEdgesByPropSelectedElement}
                              onClick={() => {
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
                  <p><strong>{t('filterEdgesDescription1')}</strong></p>
                  <div>
                    <Badge value="2" className="p-mr-2" size="large" severity="warning" />
                  </div>
                  <p><strong>{t('filterEdgesDescription2')}</strong></p>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}

OntologyFilter.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  removeFromObject: PropTypes.func.isRequired,
  availableNodes: PropTypes.shape().isRequired,
  filterNodeByPropsData: PropTypes.shape().isRequired,
  filterEdgeByPropsData: PropTypes.shape().isRequired,
  filterNodesByPropSelectedElement: PropTypes.string.isRequired,
  filterEdgesByPropSelectedElement: PropTypes.string.isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapToProps = ({
  graphData,
  currentGraph,
  classesFromApi,
  availableNodes,
  filterNodeByPropsData,
  filterNodesByPropSelectedElement,
  filterEdgeByPropsData,
  filterEdgesByPropSelectedElement,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay
}) => ({
  graphData,
  currentGraph,
  classesFromApi,
  availableNodes,
  filterNodeByPropsData,
  filterNodesByPropSelectedElement,
  filterEdgeByPropsData,
  filterEdgesByPropSelectedElement,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay
})

export default connect(
  mapToProps,
  actions
)(OntologyFilter)
