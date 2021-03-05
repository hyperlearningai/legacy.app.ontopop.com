import expandNode from '../../../utils/graphVisualisation/expandNode'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import store from '../../../store'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const setStoreState = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  edgesPerNode,
  classesFromApi,
  objectPropertiesFromApi,
  nodesEdges: {},
  isPhysicsOn: false,
  globalNodeStyling: {
    stylingNodeCaptionProperty: 'rdfsLabel'
  },
  userDefinedNodeStyling: {
    stylingNodeCaptionProperty: 'rdfsLabel'
  },
  globalEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
  userDefinedEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
}))

countNodes.mockImplementation(() => 10)
countEdges.mockImplementation(() => 10)

describe('expandNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '1'

    getEdge.mockImplementation(() => null)
    getNode.mockImplementation(() => null)

    await expandNode({
      nodeId,
      setStoreState
    })

    expect(addNode.mock.calls[0][0].id).toEqual('141')
    expect(setElementsStyle).toHaveBeenLastCalledWith()

    expect(addEdge).toHaveBeenLastCalledWith({
      edgeId: 1711,
      from: '171',
      id: '1711',
      label: 'Subclass of',
      rdfsLabel: 'Subclass of',
      role: 'Subclass of',
      to: '1',
      userDefined: false,
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'isPhysicsOn',
        true,
      ],
      [
        'physicsRepulsion',
        false,
      ],
      [
        'nodesEdges',
        {
          1: [
            '11',
            '12',
            '1361',
            '1784',
            '411',
            '1851',
            '781',
            '751',
            '1711',
          ],
          136: [
            '1361',
          ],
          141: [
            '11',
          ],
          170: [
            '12',
          ],
          171: [
            '1711',
          ],
          178: [
            '1784',
          ],
          185: [
            '1851',
          ],
          41: [
            '411',
          ],
          75: [
            '751',
          ],
          78: [
            '781',
          ],
        },
      ],
      [
        'availableNodesCount',
        10,
      ],
      [
        'availableEdgesCount',
        10,
      ],
    ])
  })
})
