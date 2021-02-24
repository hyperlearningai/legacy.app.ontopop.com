// import { DataSet } from 'vis-data'
import addNodesEdgesToGraph from '../../../utils/graphVisualisation/addNodesEdgesToGraph'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { triplesPerNode } from '../../fixtures/triplesPerNodeNew'
import store from '../../../store'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const setStoreState = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  triplesPerNode,
  classesFromApi,
  objectPropertiesFromApi,
  nodesConnections: {},
  isPhysicsOn: false,
  stylingNodeCaptionProperty: 'rdfsLabel'
}))

describe('addNodesEdgesToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '1'

    getEdge.mockImplementation(() => null)
    getNode.mockImplementation(() => null)

    await addNodesEdgesToGraph({
      nodeId,
      setStoreState
    })

    expect(addNode.mock.calls[0][0].id).toEqual('141')
    expect(setElementsStyle).toHaveBeenLastCalledWith()

    expect(addEdge).toHaveBeenLastCalledWith({
      from: '171',
      id: '1711',
      label: undefined,
      predicate: '1711',
      rdfAbout: '',
      rdfsLabel: 'Subclass of',
      to: '1'
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
        'nodesConnections',
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
    ])
  })
})
