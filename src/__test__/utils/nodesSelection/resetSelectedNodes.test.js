import resetSelectedNode from '../../../utils/nodesSelection/resetSelectedNode'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

const setStoreState = jest.fn()

describe('resetSelectedNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no previously selected node', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeBackgroundColor: '#ffff00',
      prevSelectedNode: undefined
    }))

    await resetSelectedNode({
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when no previously selected node', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeBackgroundColor: '#000',
      prevSelectedNode: {
        id: 'node-123',
        color: {
          background: '#ffff00'
        }
      }
    }))

    await resetSelectedNode({
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledWith('prevSelectedNode', undefined)

    expect(updateNodes).toHaveBeenCalledWith({
      color: {
        background: '#000',
      },
      id: 'node-123',
    })
  })
})
