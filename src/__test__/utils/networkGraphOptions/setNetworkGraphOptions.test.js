import setNetworkGraphOptions from '../../../utils/networkGraphOptions/setNetworkGraphOptions'
import store from '../../../store'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'
import toggleElements from '../../../utils/networkGraphOptions/toggleElements'
import { DEFAULT_HIDDEN_ELEMENT_PROPERTY } from '../../../constants/graph'

const addToObject = jest.fn()
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
      isDatasetVisible: false,
      hiddenNodesProperties: {},
      hiddenEdgesProperties: {},
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
    const hiddenNodesProperties = DEFAULT_HIDDEN_ELEMENT_PROPERTY
    const hiddenEdgesProperties = DEFAULT_HIDDEN_ELEMENT_PROPERTY

    await setNetworkGraphOptions({
      isUpperOntologyVisible,
      isSubClassEdgeVisible,
      isDatasetVisible,
      hiddenNodesProperties,
      hiddenEdgesProperties,
      addToObject,
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
        isUpperOntologyVisible,
        isSubClassEdgeVisible,
        isDatasetVisible,
        hiddenNodesProperties,
        hiddenEdgesProperties
      }
    )
    expect(toggleElements).toHaveBeenCalledWith({
      addNumber,
      toggleFromArrayInKey,
      setStoreState,
    })
  })
})
