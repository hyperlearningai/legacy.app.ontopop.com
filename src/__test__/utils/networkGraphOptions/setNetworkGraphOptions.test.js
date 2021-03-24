import setNetworkGraphOptions from '../../../utils/networkGraphOptions/setNetworkGraphOptions'
import store from '../../../store'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'
import toggleElements from '../../../utils/networkGraphOptions/toggleElements'
import { DEFAULT_HIDDEN_ELEMENT_PROPERTY } from '../../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()

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
      updateStoreValue,
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['graphData',
        'graph-0'],
      OPERATION_TYPE_UPDATE,
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
      updateStoreValue,
    })
  })
})
