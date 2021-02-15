import clearElement from '../../../utils/freeTextSearch/clearElement'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

describe('clearElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return if no previous selection', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeBackgroundColor: '#000',
      stylingEdgeLineColor: '#000',
      freeTextPrevSelectedElement: undefined,
    }))

    await clearElement()

    expect(updateEdges).toHaveBeenCalledTimes(0)
    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should updateNodes', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeBackgroundColor: '#000',
      stylingEdgeLineColor: '#000',
      freeTextPrevSelectedElement: {
        id: 'node-123'
      },
    }))

    await clearElement()

    expect(updateEdges).toHaveBeenCalledTimes(0)
    expect(updateNodes).toHaveBeenCalledWith(
      { color: { background: '#000' }, id: 'node-123' }
    )
  })

  it('should updateEdges', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingNodeBackgroundColor: '#000',
      stylingEdgeLineColor: '#000',
      freeTextPrevSelectedElement: [{
        id: 'node-123'
      }],
    }))

    await clearElement()

    expect(updateEdges).toHaveBeenCalledWith(
      { color: { color: '#000' }, id: 'node-123', width: 1 }
    )
    expect(updateNodes).toHaveBeenCalledTimes(0)
  })
})
