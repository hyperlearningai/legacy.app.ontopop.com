import { DataSet } from 'vis-data'
import { AUTH_COOKIE } from '../../../constants/auth'
import { ROUTE_LOGIN } from '../../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import store from '../../../store'
import logout from '../../../utils/auth/logout'

describe('logout', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const push = jest.fn()
    const router = { push }
    const updateStoreValue = jest.fn()

    const removeItem = jest.fn()

    const availableNodes = new DataSet([{ id: '1' }])
    const availableEdges = new DataSet([{ id: '3' }])

    store.getState = jest.fn().mockImplementation(() => ({
      availableNodes,
      availableEdges
    }))

    Storage.prototype.removeItem = removeItem

    await logout({
      router,
      updateStoreValue
    })

    expect(availableNodes.length).toEqual(0)
    expect(availableEdges.length).toEqual(0)

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'isSidebarOpen'
          ],
          OPERATION_TYPE_UPDATE,
          true
        ],
        [
          [
            'sidebarView'
          ],
          OPERATION_TYPE_UPDATE,
          'search'
        ],
        [
          [
            'activeLoaders'
          ],
          OPERATION_TYPE_UPDATE,
          0
        ],
        [
          [
            'networkVisualisation'
          ],
          OPERATION_TYPE_UPDATE,
          'graph'
        ],
        [
          [
            'user'
          ],
          OPERATION_TYPE_UPDATE,
          {
            email: '',
            firstName: '',
            lastName: '',
            company: '',
            isGuest: false,
            token: ''
          }
        ],
        [
          [
            'classesFromApi'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'objectPropertiesFromApi'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'classesFromApiBackup'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'objectPropertiesFromApiBackup'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'totalEdgesPerNode'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'totalEdgesPerNodeBackup'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'nodesSpiderability'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'network'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'annotationProperties'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'annotationPropertiesDatasets'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'deletedNodes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'addedNodes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'updatedNodes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'deletedEdges'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'addedEdges'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'availableNodesCount'
          ],
          OPERATION_TYPE_UPDATE,
          0
        ],
        [
          [
            'availableEdgesCount'
          ],
          OPERATION_TYPE_UPDATE,
          0
        ],
        [
          [
            'nodesIdsToDisplay'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'nodesEdges'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'highlightedNodes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'highlightedEdges'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'dataTableTriples',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'dataTableTriplesWithLabels',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'globalEdgeStyling'
          ],
          OPERATION_TYPE_UPDATE,
          {
            stylingEdgeLineColor: '#070b11',
            stylingEdgeLineColorHover: '#070b11',
            stylingEdgeLineColorHighlight: '#9c27b0',
            stylingEdgeLineStyle: false,
            stylingEdgeTextColor: '#070b11',
            stylingEdgeTextSize: 12,
            stylingEdgeTextAlign: 'horizontal',
            stylingEdgeWidth: 1,
            stylingEdgeLength: 250,
            stylingEdgeCaptionProperty: 'rdfsLabel'
          }
        ],
        [
          [
            'userDefinedEdgeStyling'
          ],
          OPERATION_TYPE_UPDATE,
          {
            stylingEdgeLineColor: '#070b11',
            stylingEdgeLineColorHover: '#070b11',
            stylingEdgeLineColorHighlight: '#9c27b0',
            stylingEdgeLineStyle: false,
            stylingEdgeTextColor: '#070b11',
            stylingEdgeTextSize: 12,
            stylingEdgeTextAlign: 'horizontal',
            stylingEdgeWidth: 1,
            stylingEdgeLength: 250,
            stylingEdgeCaptionProperty: 'rdfsLabel'
          }
        ],
        [
          [
            'stylingEdgeByProperty'
          ],
          OPERATION_TYPE_UPDATE,
          [
            {
              filterType: 'equal',
              filterValue: 'Subclass of',
              styleType: 'stylingEdgeLineStyle',
              styleValue: true,
              property: 'rdfsLabel'
            },
            {
              filterType: 'equal',
              filterValue: '',
              styleType: '',
              styleValue: ''
            }
          ]
        ],
        [
          [
            'globalNodeStyling'
          ],
          OPERATION_TYPE_UPDATE,
          {
            stylingNodeSize: 25,
            stylingNodeBorder: 1,
            stylingNodeTextColor: '#000000',
            stylingNodeBorderSelected: 2,
            stylingNodeBorderColor: '#011e41',
            stylingNodeBackgroundColor: '#adefd1',
            stylingNodeBackgroundColorDataset: '#00bcd4',
            stylingNodeHighlightBorderColor: '#009688',
            stylingNodeHighlightBackgroundColor: '#ffed00',
            stylingNodeHoverBackgroundColor: '#f2f2f2',
            stylingNodeHoverBorderColor: '#607d8b',
            stylingNodeShape: 'circle',
            stylingNodeTextFontSize: 12,
            stylingNodeTextFontAlign: 'center',
            stylingNodeCaptionProperty: 'rdfsLabel',
            stylingNodeCaptionPropertyDataset: 'name',
            stylingNodeOverlayOpacity: 0.1
          }
        ],
        [
          [
            'userDefinedNodeStyling'
          ],
          OPERATION_TYPE_UPDATE,
          {
            stylingNodeSize: 25,
            stylingNodeBorder: 1,
            stylingNodeTextColor: '#000000',
            stylingNodeBorderSelected: 2,
            stylingNodeBorderColor: '#011e41',
            stylingNodeBackgroundColor: '#adefd1',
            stylingNodeBackgroundColorDataset: '#00bcd4',
            stylingNodeHighlightBorderColor: '#009688',
            stylingNodeHighlightBackgroundColor: '#ffed00',
            stylingNodeHoverBackgroundColor: '#f2f2f2',
            stylingNodeHoverBorderColor: '#607d8b',
            stylingNodeShape: 'circle',
            stylingNodeTextFontSize: 12,
            stylingNodeTextFontAlign: 'center',
            stylingNodeCaptionProperty: 'rdfsLabel',
            stylingNodeCaptionPropertyDataset: 'name',
            stylingNodeOverlayOpacity: 0.1
          }
        ],
        [
          [
            'stylingNodeByProperty'
          ],
          OPERATION_TYPE_UPDATE,
          [
            {
              filterType: 'equal',
              filterValue: '',
              styleType: '',
              styleValue: ''
            }
          ]
        ],
        [
          [
            'entrySearchFilter'
          ],
          OPERATION_TYPE_UPDATE,
          'all'
        ],
        [
          [
            'entrySearchResults'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'entrySearchAnnotationProperties'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'entrySearchResultsByPage'
          ],
          OPERATION_TYPE_UPDATE,
          {}
        ],
        [
          [
            'isFirstQuery'
          ],
          OPERATION_TYPE_UPDATE,
          true
        ],
        [
          [
            'entrySearchValue'
          ],
          OPERATION_TYPE_UPDATE,
          ''
        ],
        [
          [
            'isDataEntityTypeSearch',
          ],
          OPERATION_TYPE_UPDATE,
          true,
        ],
        [
          [
            'isDatasetTypeSearch',
          ],
          OPERATION_TYPE_UPDATE,
          true,
        ],
        [
          [
            'isUpperOntologySearch',
          ],
          OPERATION_TYPE_UPDATE,
          true,
        ],
        [
          [
            'totalSearchCount',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
        [
          [
            'searchPageSelected',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
        [
          [
            'isSearchLoading',
          ],
          OPERATION_TYPE_UPDATE,
          false,
        ],
        [
          [
            'dataTypeSearch',
          ],
          OPERATION_TYPE_UPDATE,
          'any',
        ],
        [
          [
            'upperOntologySearch',
          ],
          OPERATION_TYPE_UPDATE,
          'any',
        ],
        [
          [
            'advancedSearchFilters',
          ],
          OPERATION_TYPE_UPDATE,
          {
            0: {
              property: '',
              value: '',
            },
          },
        ],
        [
          [
            'isElementSelectable'
          ],
          OPERATION_TYPE_UPDATE,
          true
        ],
        [
          [
            'selectedElement'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'isNodeSelectable'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'selectedNode'
          ],
          OPERATION_TYPE_UPDATE,
          ''
        ],
        [
          [
            'prevSelectedNode'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'isEdgeSelectable'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'selectedEdge'
          ],
          OPERATION_TYPE_UPDATE,
          ''
        ],
        [
          [
            'prevSelectedEdge'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'selectedBoundingBoxNodes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'isBoundingBoxSelectable'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'isBoundingBoxDrawable'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'boundingBoxGeometry'
          ],
          OPERATION_TYPE_UPDATE,
          {
            fixedPointX: 0,
            fixedPointY: 0,
            boundingBoxPosX: 0,
            boundingBoxPosY: 0,
            boundingBoxWidth: 0,
            boundingBoxHeight: 0
          }
        ],
        [
          [
            'isBoundingBoxSelectionInternal'
          ],
          OPERATION_TYPE_UPDATE,
          true
        ],
        [
          [
            'exportFileName'
          ],
          OPERATION_TYPE_UPDATE,
          'network-graph'
        ],
        [
          [
            'selectedNeighbourNode'
          ],
          OPERATION_TYPE_UPDATE,
          ''
        ],
        [
          [
            'isNeighbourNodeSelectable'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'isShortestPathNode1Selectable'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'isShortestPathNode2Selectable'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'shortestPathNode1Object'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'shortestPathNode1'
          ],
          OPERATION_TYPE_UPDATE,
          ''
        ],
        [
          [
            'shortestPathNode2Object'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'shortestPathNode2'
          ],
          OPERATION_TYPE_UPDATE,
          ''
        ],
        [
          [
            'shortestPathResults'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'isNodeOverlay'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'shortestPathNodes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'showContextMenu'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'contextMenuData'
          ],
          OPERATION_TYPE_UPDATE,
          {
            top: 0,
            left: 0,
            nodeId: '',
            edgeId: ''
          }
        ],
        [
          [
            'notes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'nodesNotes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'edgesNotes'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'selectedNotesType'
          ],
          OPERATION_TYPE_UPDATE,
          'graph'
        ],
        [
          [
            'noteElementId'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'nodesSynonyms'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'synonymElementId'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'isPhysicsOn'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'physicsHierarchicalView'
          ],
          OPERATION_TYPE_UPDATE,
          false
        ],
        [
          [
            'physicsRepulsion'
          ],
          OPERATION_TYPE_UPDATE,
          true
        ],
        [
          [
            'customQueryOutput'
          ],
          OPERATION_TYPE_UPDATE,
          undefined
        ],
        [
          [
            'customQueryFromLatestOutput'
          ],
          OPERATION_TYPE_UPDATE,
          ''
        ],
        [
          [
            'customQueryStringHistory'
          ],
          OPERATION_TYPE_UPDATE,
          [
            "g.V().hasLabel('class').count()",
            "g.V().has('name', 'Link').valueMap()"
          ]
        ],
        [
          [
            'lastGraphIndex'
          ],
          OPERATION_TYPE_UPDATE,
          0
        ],
        [
          [
            'currentGraph'
          ],
          OPERATION_TYPE_UPDATE,
          'graph-0'
        ],
        [
          [
            'graphData'
          ],
          OPERATION_TYPE_UPDATE,
          {
            'graph-0': {
              label: 'Main',
              noDelete: true,
              type: 'full',
              isUserDefinedNodeVisible: true,
              isOrphanNodeVisible: false,
              isUpperOntologyVisible: true,
              isSubClassEdgeVisible: true,
              isDatasetVisible: true,
              hiddenNodesProperties: {
                0: {
                  type: 'and',
                  properties: {
                    0: {
                      property: '',
                      operation: 'includes',
                      value: ''
                    }
                  }
                }
              },
              hiddenEdgesProperties: {
                0: {
                  type: 'and',
                  properties: {
                    0: {
                      property: '',
                      operation: 'includes',
                      value: ''
                    }
                  }
                }
              }
            }
          }
        ],
        [
          [
            'nodesDropdownLabels'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'edgesDropdownLabels'
          ],
          OPERATION_TYPE_UPDATE,
          []
        ],
        [
          [
            'isCookieBarOpen',
          ],
          OPERATION_TYPE_UPDATE,
          false,
        ],
        [
          [
            'isAnalyticsCookie',
          ],
          OPERATION_TYPE_UPDATE,
          undefined,
        ],
        [
          [
            'isPreferencesCookie',
          ],
          OPERATION_TYPE_UPDATE,
          undefined,
        ],
        [
          [
            'uniqueFingerprint',
          ],
          OPERATION_TYPE_UPDATE,
          undefined,
        ],
      ]
    )

    expect(removeItem).toHaveBeenCalledWith(AUTH_COOKIE)
    expect(push).toHaveBeenCalledWith(
      ROUTE_LOGIN
    )
  })
})
