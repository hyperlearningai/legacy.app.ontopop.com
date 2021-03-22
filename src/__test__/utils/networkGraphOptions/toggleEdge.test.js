import toggleEdge from '../../../utils/networkGraphOptions/toggleEdge'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'

const setStoreState = jest.fn()
const toggleFromSubArray = jest.fn()
const addNumber = jest.fn()
const toggleFromArrayInKey = jest.fn()

jest.mock('../../../utils/networkGraphOptions/toggleEdgesFromVisibleNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')

checkEdgeVisibility.mockImplementation(() => true)

store.getState = jest.fn().mockImplementation(() => ({
  graphData: {
    'graph-0': {
      hiddenNodes: ['1', '3']
    }
  },
  currentGraph: 'graph-0',
  objectPropertiesFromApiBackup: objectPropertiesFromApi
}))

getNodeIds.mockImplementation(() => ['7'])

jest.useFakeTimers()

describe('toggleEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await toggleEdge({
      edgeId: '1',
      addNumber,
      toggleFromArrayInKey,
      toggleFromSubArray,
      setStoreState,
      isLastEdge: true
    })

    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function), 1
    )
  })
})
