import { DataSet } from 'vis-data'
import highlightEdge from '../../utils/highlightEdge'

const setStoreState = jest.fn()
const setPrevSelectedEdges = jest.fn()
const fit = jest.fn()
const network = {
  fit
}

describe('highlightEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const elementId = 'id-123'
    const availableEdges = new DataSet([{
      id: 'id-123',
      color: 'ffffff'
    }, {
      id: 'id-234',
      color: 'ffffff'
    }])
    const availableEdgesNormalised = {
      'id-123___node1___node2': {
        id: 'id-123___node1___node2',
        edgeId: 'id-123'
      }
    }

    await highlightEdge({
      availableEdges,
      availableEdgesNormalised,
      elementId,
      network,
      setPrevSelectedEdges,
      setStoreState
    })

    expect(setPrevSelectedEdges).toHaveBeenCalledWith(['id-123___node1___node2'])
    expect(fit).toHaveBeenCalledWith({ animation: true })
    expect(setStoreState).toHaveBeenCalledWith('freeTextSelectedElement', 'id-123')
  })
})
