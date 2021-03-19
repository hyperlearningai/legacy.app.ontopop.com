import toggleElements from '../../../utils/networkGraphOptions/toggleElements'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import { classesFromApi } from '../../fixtures/classesFromApi'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'

const setStoreState = jest.fn()
const toggleFromSubArray = jest.fn()
const addNumber = jest.fn()
const toggleFromArrayInKey = jest.fn()

jest.mock('../../../utils/networkGraphOptions/toggleEdgesFromVisibleNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')

checkNodeVisibility.mockImplementation(() => true)

store.getState = jest.fn().mockImplementation(() => ({
  graphData: {
    'graph-0': {
      hiddenNodes: ['1', '3']
    }
  },
  currentGraph: 'graph-0',
  classesFromApiBackup: classesFromApi
}))

getNodeIds.mockImplementation(() => ['7'])

jest.useFakeTimers()

describe('toggleElements', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await toggleElements({
      toggleFromSubArray,
      addNumber,
      toggleFromArrayInKey,
      setStoreState
    })

    expect(addNumber).toHaveBeenCalledWith(
      'activeLoaders', 1
    )
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function), 1
    )
  })
})
