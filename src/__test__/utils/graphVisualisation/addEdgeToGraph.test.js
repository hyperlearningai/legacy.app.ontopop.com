/* eslint max-len:0 */
import addEdgeToGraph from '../../../utils/graphVisualisation/addEdgeToGraph'
import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import getElementLabel from '../../../utils/networkStyling/getElementLabel'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

const updateStoreValue = jest.fn()
jest.mock('../../../utils/graphVisualisation/actionAfterNodesAdded')
jest.mock('../../../utils/networkStyling/setEdgeStyle')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/networkStyling/getElementLabel')

getElementLabel.mockImplementation(() => 'test')

store.getState = jest.fn().mockImplementation(() => ({
  objectPropertiesFromApi
}))

const edgeId = '12'
const edge = {
  edgeId: 12,
  from: '1',
  id: '12',
  label: 'test',
  rdfsLabel: 'Subclass of',
  role: 'Subclass of',
  to: '147',
  userDefined: false
}

describe('addEdgeToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when is last', async () => {
    const isLast = true

    await addEdgeToGraph({
      updateStoreValue,
      edgeId,
      isLast
    })

    expect(addEdge).toHaveBeenCalledWith({
      edge,
      updateStoreValue
    })

    expect(setEdgeStyle).toHaveBeenCalledWith({ edge })

    expect(actionAfterNodesAdded).toHaveBeenCalledWith({
      updateStoreValue,
    })
  })

  it('should work correctly', async () => {
    const isLast = false

    await addEdgeToGraph({
      updateStoreValue,
      edgeId,
      isLast
    })

    expect(addEdge).toHaveBeenCalledWith({
      edge,
      updateStoreValue
    })
    expect(setEdgeStyle).toHaveBeenCalledWith({ edge })
    expect(actionAfterNodesAdded).toHaveBeenCalledTimes(0)
  })
})
