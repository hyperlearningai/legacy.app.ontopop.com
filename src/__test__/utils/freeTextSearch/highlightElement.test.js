import highlightElement from '../../../utils/freeTextSearch/highlightElement'
import store from '../../../store'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

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
    getEdge.mockImplementationOnce(() => ({
      color: {},
      id: '11',
      from: '1'
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      freeTextSelection: {
        'id-123': 'node',
        11: 'edge'
      },
      freeTextSelectedElement: '11',
      stylingNodeHighlightBackgroundColor: '#000',
      objectPropertiesFromApi,
      stylingEdgeLineColorHighlight: '#000',
      network
    }))

    await highlightElement({
      setStoreState
    })

    expect(updateEdges).toHaveBeenCalledWith(
      {
        color: { color: '#000' }, id: '11', width: 3,
      }
    )
    expect(setStoreState).toHaveBeenCalledWith('freeTextPrevSelectedElement',
      { color: { color: '#000' }, id: '11', from: '1' })
    expect(focus).toHaveBeenCalledWith(
      '1', { animation: true, scale: 1 }
    )
  })
})
