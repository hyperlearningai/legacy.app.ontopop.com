import { DataSet } from 'vis-data'
import addElementToGraph from '../../../utils/graphVisualisation/addElementToGraph'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'

const setStoreState = jest.fn()
const addNumber = jest.fn()
const fit = jest.fn()
const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'
const nodesIdsToDisplay = [
  '1',
  '170',
  '141'
]

store.getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  availableEdges,
  edgesPerNode,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  isPhysicsOn: false,
  globalNodeStyling: {
    stylingNodeCaptionProperty,
  },
  stylingNodeByProperty: [],
  stylingEdgeByProperty: [],
  userDefinedNodeStyling: {
    stylingNodeCaptionProperty,
  },
  highlightedNodes: [],
  highlightedEdges: [],
  nodesEdges: {
    1: [
      '11',
      '12',
    ],
    141: [
      '11',
    ],
    170: [
      '12',
    ],
  }
}))

jest.useFakeTimers()

describe('addElementToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await addElementToGraph({
      classesFromApi,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      edgesPerNode,
      globalNodeStyling: {
        stylingNodeCaptionProperty,
      },
      userDefinedNodeStyling: {
        stylingNodeCaptionProperty,
      },
      globalEdgeStyling: {
        stylingNodeCaptionProperty,
      },
      userDefinedEdgeStyling: {
        stylingNodeCaptionProperty,
      },
      setStoreState,
      addNumber,
      i: 2,
      nodeIdsLength: 3,
      processedEdges: [],
      nodesEdges: {
        1: [
          '11',
          '12',
        ],
        141: [
          '11',
        ],
        170: [
          '12',
        ],
      },
      currentPhysicsOnState: false,
      network: {
        fit
      }
    })

    expect(setStoreState.mock.calls).toEqual(
      [['availableNodesCount', 2],
        ['availableEdgesCount', 1],
        ['nodesEdges', {
          1: [
            '11',
            '12',
          ],
          141: [
            '11',
          ],
          170: [
            '12',
          ],
        }],
        ['isPhysicsOn', true]]
    )

    expect(addNumber).toHaveBeenCalledWith('activeLoaders', -1)

    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 3000
    )
  })
})
