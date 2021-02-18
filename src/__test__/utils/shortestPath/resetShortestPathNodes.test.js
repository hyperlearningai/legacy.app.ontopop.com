import resetShortestPathNodes from '../../../utils/shortestPath/resetShortestPathNodes'
import store from '../../../store'
import updateNodeBackground from '../../../utils/shortestPath/updateNodeBackground'

const setStoreState = jest.fn()

const shortestPathNode1 = 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV'
const shortestPathNode2 = 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
const stylingNodeBackgroundColor = '#000'
const shortestPathNode1Object = { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }
const shortestPathNode2Object = { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }

jest.mock('../../../utils/shortestPath/updateNodeBackground')

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
    expect(updateNodeBackground.mock.calls).toEqual(
      [[{
        background: '#000',
        nodeId: 'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
        originalNode: { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }
      }], [{
        background: '#000',
        nodeId: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
        originalNode: { id: 'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9' }
      }]]
    )
  })
})
