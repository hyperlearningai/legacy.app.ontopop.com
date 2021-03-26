/* eslint max-len:0 */
import checkNodeSpiderability from '../../../utils/networkStyling/checkNodeSpiderability'
import store from '../../../store'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

jest.mock('../../../utils/networkStyling/setNodeStyle')

store.getState = jest.fn().mockImplementation(() => ({
  totalEdgesPerNode
}))

const updateStoreValue = jest.fn()

describe('checkNodeSpiderability', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '12'
    const visibleEdges = ['1']

    await checkNodeSpiderability({
      nodeId,
      updateStoreValue,
      visibleEdges
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['nodesSpiderability', nodeId], OPERATION_TYPE_UPDATE, 'true'
    )
    expect(setNodeStyle).toHaveBeenCalledWith(
      { nodeId }
    )
  })
})
