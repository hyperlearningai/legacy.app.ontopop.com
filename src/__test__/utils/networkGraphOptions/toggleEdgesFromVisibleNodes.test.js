import toggleEdgesFromVisibleNodes from '../../../utils/networkGraphOptions/toggleEdgesFromVisibleNodes'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import toggleEdge from '../../../utils/networkGraphOptions/toggleEdge'
import updateStyleAndPhysics from '../../../utils/networkGraphOptions/updateStyleAndPhysics'
import setEdgesStyle from '../../../utils/networkStyling/setEdgesStyle'

const setStoreState = jest.fn()
const toggleFromSubArray = jest.fn()
const addNumber = jest.fn()
const toggleFromArrayInKey = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/networkGraphOptions/updateStyleAndPhysics')
jest.mock('../../../utils/networkStyling/setEdgesStyle')
jest.mock('../../../utils/networkGraphOptions/toggleEdge')

store.getState = jest.fn().mockImplementation(() => ({
  graphData: {
    'graph-0': {
      hiddenNodes: ['1', '3']
    }
  },
  currentGraph: 'graph-0',
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  totalEdgesPerNode
}))

getNodeIds.mockImplementation(() => ['7'])

describe('toggleEdgesFromVisibleNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const visibleNodes = ['1', '3', '7', '177']

    await toggleEdgesFromVisibleNodes({
      visibleNodes,
      toggleFromArrayInKey,
      setStoreState,
      toggleFromSubArray,
      addNumber
    })

    expect(addNumber.mock.calls).toEqual(
      [
        ['activeLoaders', 1],
        ['activeLoaders', -1],
      ]
    )
    expect(setEdgesStyle).toHaveBeenCalledWith()
    expect(toggleEdge).toHaveBeenLastCalledWith({
      edgeId: '11',
      addNumber,
      toggleFromArrayInKey,
      toggleFromSubArray,
      setStoreState,
      isLastEdge: false
    })
    expect(updateStyleAndPhysics).toHaveBeenCalledWith({
      setStoreState
    })
  })
})
