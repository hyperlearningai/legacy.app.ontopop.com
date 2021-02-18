import highlightElement from '../../../utils/freeTextSearch/highlightElement'
import store from '../../../store'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

const setStoreState = jest.fn()

const fit = jest.fn()
const focus = jest.fn()
const network = {
  fit,
  focus
}

describe('highlightElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update node', async () => {
    getNode.mockImplementationOnce(() => ({
      color: {}
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      freeTextSelection: {
        'id-123': 'node',
        'id-234': 'edge'
      },
      freeTextSelectedElement: 'id-123',
      stylingNodeHighlightBackgroundColor: '#000',
      stylingEdgeLineColorHighlight: '#000',
      network
    }))

    await highlightElement({
      setStoreState
    })

    expect(updateNodes).toHaveBeenCalledWith(
      { color: { background: '#000' }, id: 'id-123' }
    )
    expect(setStoreState).toHaveBeenCalledWith('freeTextPrevSelectedElement', {
      color: {
        background: '#000',
      },
    })
    expect(focus).toHaveBeenCalledWith('id-123', { animation: true, scale: 2 })
  })

  it('should update edge', async () => {
    getEdge.mockImplementationOnce(() => ([{
      color: {},
      id: 'id-123___node1___node2'
    }]))

    store.getState = jest.fn().mockImplementation(() => ({
      freeTextSelection: {
        'id-123': 'node',
        'id-234': 'edge'
      },
      freeTextSelectedElement: 'id-234',
      stylingNodeHighlightBackgroundColor: '#000',
      stylingEdgeLineColorHighlight: '#000',
      network
    }))

    await highlightElement({
      setStoreState
    })

    expect(updateEdges).toHaveBeenCalledWith(
      { color: { color: '#000' }, id: 'id-123___node1___node2', width: 3 }
    )
    expect(setStoreState).toHaveBeenCalledWith('freeTextPrevSelectedElement',
      [{ color: { color: '#000' }, id: 'id-123___node1___node2' }])
    expect(fit).toHaveBeenCalledWith({ animation: true })
  })
})
