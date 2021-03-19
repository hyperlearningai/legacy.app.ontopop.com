import setNetworkGraphOptions from '../../../utils/networkGraphOptions/setNetworkGraphOptions'
import store from '../../../store'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'
import toggleElements from '../../../utils/networkGraphOptions/toggleElements'

const addToObject = jest.fn()
const toggleFromSubArray = jest.fn()
const toggleFromArrayInKey = jest.fn()
const setStoreState = jest.fn()
const addNumber = jest.fn()

jest.mock('../../../utils/networkGraphOptions/toggleElements')

store.getState = jest.fn().mockImplementation(() => ({
  currentGraph: 'graph-0',
  graphData: {
    'graph-0': {
      label: 'Main',
      noDelete: true,
      type: ALGO_TYPE_FULL,
      isUpperOntologyVisible: false,
      isSubClassEdgeVisible: true,
      isDatasetVisible: false
    }
  }
}))

describe('setNetworkGraphOptions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const isUpperOntologyVisible = true
    const isSubClassEdgeVisible = false
    const isDatasetVisible = true

    await setNetworkGraphOptions({
      isUpperOntologyVisible,
      isSubClassEdgeVisible,
      isDatasetVisible,
      addToObject,
      toggleFromSubArray,
      addNumber,
      toggleFromArrayInKey,
      setStoreState,
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphData',
      'graph-0',
      {
        label: 'Main',
        noDelete: true,
        type: ALGO_TYPE_FULL,
        isUpperOntologyVisible: true,
        isSubClassEdgeVisible: false,
        isDatasetVisible: true
      }
    )
    expect(toggleElements).toHaveBeenCalledWith({
      toggleFromSubArray,
      addNumber,
      toggleFromArrayInKey,
      setStoreState,
    })
  })
})
