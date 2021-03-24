import resetShortestPathNodes from '../../../utils/shortestPath/resetShortestPathNodes'
import store from '../../../store'
import setNodesStyle from '../../../utils/networkStyling/setNodesStyle'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()

const shortestPathNode1 = 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV'
const shortestPathNode2 = 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
const stylingNodeBackgroundColor = '#000'
const shortestPathNode1Object = { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }
const shortestPathNode2Object = { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }

jest.mock('../../../utils/networkStyling/setNodesStyle')

store.getState = jest.fn().mockImplementation(() => ({
  shortestPathNode1,
  shortestPathNode2,
  stylingNodeBackgroundColor,
  shortestPathNode1Object,
  shortestPathNode2Object
}))

describe('resetShortestPathNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await resetShortestPathNodes({
      updateStoreValue,
    })

    expect(setNodesStyle).toHaveBeenCalledWith()
    expect(updateStoreValue.mock.calls).toEqual([
      [
        ['isShortestPathNode1Selectable'],
        OPERATION_TYPE_UPDATE,
        false,
      ],
      [
        ['isShortestPathNode2Selectable'],
        OPERATION_TYPE_UPDATE,
        false,
      ],
      [
        ['shortestPathNode1'],
        OPERATION_TYPE_UPDATE,
        '',
      ],
      [
        ['shortestPathNode2'],
        OPERATION_TYPE_UPDATE,
        '',
      ],
      [
        ['shortestPathNode1Object'],
        OPERATION_TYPE_UPDATE,
        undefined,
      ],
      [
        ['shortestPathNode2Object'],
        OPERATION_TYPE_UPDATE,
        undefined,
      ],

    ])
  })
})
