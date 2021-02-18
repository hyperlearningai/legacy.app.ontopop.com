import resetSelectedEdges from '../../../utils/edgesSelection/resetSelectedEdges'
import store from '../../../store'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

const setStoreState = jest.fn()

describe('resetSelectedEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no previously selected edge', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeWidth: 1,
      stylingEdgeLineColor: '#000',
      prevSelectedEdges: undefined
    }))

    await resetSelectedEdges({
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)

    expect(updateEdges).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when no previously selected edge', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeWidth: 1,
      stylingEdgeLineColor: '#000',
      prevSelectedEdges: [{
        id: 'edge-123',
        color: {
          color: '#ffff00'
        }
      }]
    }))

    await resetSelectedEdges({
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledWith('prevSelectedEdges', undefined)

    expect(updateEdges).toHaveBeenCalledWith({
      color: {
        color: '#ffff00',
      },
      width: 1,
      id: 'edge-123',
    })
  })
})
