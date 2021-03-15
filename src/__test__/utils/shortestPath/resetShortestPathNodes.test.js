import resetShortestPathNodes from '../../../utils/shortestPath/resetShortestPathNodes'
import store from '../../../store'
import setNodesStyle from '../../../utils/networkStyling/setNodesStyle'

const setStoreState = jest.fn()

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
      setStoreState,
    })

    expect(setNodesStyle).toHaveBeenCalledWith()
    expect(setStoreState.mock.calls).toEqual([
      [
        'isShortestPathNode1Selectable',
        false,
      ],
      [
        'isShortestPathNode2Selectable',
        false,
      ],
      [
        'shortestPathNode1',
        '',
      ],
      [
        'shortestPathNode2',
        '',
      ],
      [
        'shortestPathNode1Object',
        undefined,
      ],
      [
        'shortestPathNode2Object',
        undefined,
      ],

    ])
  })
})
