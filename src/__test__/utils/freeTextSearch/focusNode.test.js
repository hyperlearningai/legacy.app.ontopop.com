import { DataSet } from 'vis-data'
import focusNode from '../../../utils/freeTextSearch/focusNode'
import store from '../../../store'

const setStoreState = jest.fn()
const setPrevSelectedNode = jest.fn()
const availableNodes = new DataSet([{
  id: 'id-123',
  color: 'ffffff'
}, {
  id: 'id-234',
  color: 'ffffff'
}])
const focus = jest.fn()
const network = {
  focus
}
const getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  network,
}))
store.getState = getState

describe('focusNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const elementId = 'id-123'
    const prevSelectedNode = 'id-234'

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
