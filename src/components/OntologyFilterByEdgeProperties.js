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
import EdgesSelectionDetails from './EdgesSelectionDetails'
import getEdgesAndNodeProperties from '../utils/getEdgesAndNodeProperties'
import {
  NODE_BACKGROUND,
} from '../constants/graph'
import highlightEdge from '../utils/highlightEdge'
import resetSearchSelection from '../utils/resetSearchSelection'

const OntologyFilterByEdgeProperties = ({
  setStoreState,
  selectedEdges,
  removeFromArray,
  availableNodes,
  classesFromApi,
  filterEdgeByPropsData,
  filterEdgesByPropSelectedElement,
  objectPropertiesFromApi,
  removeFromObject,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  filterEdgesByPropElementArray
}) => {
  const { t } = useTranslation()
  const [isEdgeSelected, toggleEdgeSelected] = useState(false)
  const [edgeStringSearch, setEdgeStringSearch] = useState('')
  const [selectedEdgeProps, setSelectedEdgeProps] = useState(null)
  const [prevSelectedNode, setPrevSelectedNode] = useState('')
  const [prevSelectedEdges, setPrevSelectedEdges] = useState([])
  const [edgeId, setEdgeId] = useState('')

  const edgePropTemplate = (option) => (
    <div className="edge-item">
      <div>{option.name}</div>
    </div>
  )

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

  return (
    <>
      <div className="p-b-10">
        <label htmlFor="filterEdgeProps">{t('selectEdgeProperties')}</label>
      </div>
      <div className="p-b-10">
        <MultiSelect
          id="filterEdgeProps"
          value={selectedEdgeProps}
          options={orderBy(filterEdgesByPropElementArray, ['name'], ['asc'])}
          onChange={(e) => setSelectedEdgeProps(e.value)}
          optionLabel="name"
          placeholder={t('allEdgeProperties')}
          filter
          className="multiselect-custom"
          itemTemplate={edgePropTemplate}
          selectedItemTemplate={selectedEdgesOptions}
          display="chip"
        />
      </div>
      <div className="p-b-10">
        <label htmlFor="filterEdgePropsString">{t('searchInputText')}</label>
      </div>
      <div className="p-input-icon-right freetext-search-input">
        {edgeStringSearch === ''
          ? (
            <i className="pi pi-search" />
          )
          : (
            <i className="pi pi-times-circle" />
          )}

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

      {!isEdgeSelected ? (
        <div className="edges-selection">
          {
            selectedEdges.length > 0
              ? selectedEdges.map((selectedEdge) => {
                const edgeUniqueId = selectedEdge

                const { rdfsLabel } = objectPropertiesFromApi[edgeUniqueId]

                return (
                  <div
                    className="edges-selection-row"
                    key={`selected-edge-row-${selectedEdge}`}
                  >
                    <div className="edges-selection-row-delete">
                      <Button
                        tooltip={`${t('removeEdge')}: ${rdfsLabel}`}
                        onClick={() => removeFromArray('selectedEdges', selectedEdge)}
                        icon="pi pi-times"
                      />
                    </div>

                    <div className="edges-selection-row-main">
                      <Button
                        tooltip={`${t('viewEdge')}: ${rdfsLabel}`}
                        onClick={() => {
                          setEdgeId(edgeUniqueId)
                          toggleEdgeSelected(true)
                        }}
                        label={rdfsLabel}
                        icon="pi pi-chevron-right"
                        iconPos="right"
                      />
                    </div>
                  </div>
                )
              }) : (
                <div className="edges-selection-message">
                  {/* {t('selectEdgeFromGraph')} */}
                </div>
              )
          }
        </div>
      ) : (
        <EdgesSelectionDetails
          edgeId={edgeId}
        />
      )}

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
                      setEdgeId(elementId)
                      toggleEdgeSelected(true)
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
    </>
  )
}

OntologyFilterByEdgeProperties.propTypes = {
  setStoreState: PropTypes.func.isRequired,
  selectedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  removeFromObject: PropTypes.func.isRequired,
  removeFromArray: PropTypes.func.isRequired,
  availableNodes: PropTypes.shape().isRequired,
  filterEdgeByPropsData: PropTypes.shape().isRequired,
  filterEdgesByPropSelectedElement: PropTypes.string.isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  edgesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterEdgesByPropElementArray: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

const mapToProps = ({
  graphData,
  selectedEdges,
  currentGraph,
  classesFromApi,
  availableNodes,
  filterEdgeByPropsData,
  filterEdgesByPropSelectedElement,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  filterEdgesByPropElementArray
}) => ({
  graphData,
  selectedEdges,
  currentGraph,
  classesFromApi,
  availableNodes,
  filterEdgeByPropsData,
  filterEdgesByPropSelectedElement,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesIdsToDisplay,
  filterEdgesByPropElementArray,
})

export default connect(
  mapToProps,
  actions
)(OntologyFilterByEdgeProperties)
