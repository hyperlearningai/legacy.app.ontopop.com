import { DataSet } from 'vis-data'
import focusNode from '../../utils/focusNode'

const setStoreState = jest.fn()
const setPrevSelectedNode = jest.fn()
const focus = jest.fn()
const network = {
  focus
}

describe('focusNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const elementId = 'id-123'
    const prevSelectedNode = 'id-234'
    const availableNodes = new DataSet([{
      id: 'id-123',
      color: 'ffffff'
    }, {
      id: 'id-234',
      color: 'ffffff'
    }])

    await focusNode({
      availableNodes,
      elementId,
      network,
      prevSelectedNode,
      setPrevSelectedNode,
      setStoreState
    })

    expect(setPrevSelectedNode).toHaveBeenCalledWith('id-123')
    expect(focus).toHaveBeenCalledWith('id-123', { animation: true })
    expect(setStoreState).toHaveBeenCalledWith('freeTextSelectedElement', 'id-123')
  })
})
