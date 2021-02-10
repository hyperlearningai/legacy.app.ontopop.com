import clearFreeTextSelection from '../../../utils/freeTextSearch/clearFreeTextSelection'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('clearFreeTextSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not updateNodes if no elements selected', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      freeTextSelection: {}
    }))

    await clearFreeTextSelection()

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should updateNodes node and ignore edge', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      freeTextSelection: {
        'node-123': 'node',
        'edge-123': 'edge',
      }
    }))

    await clearFreeTextSelection()

    expect(updateNodes).toHaveBeenCalledWith(
      [{ color: { background: '#adefd1' }, id: 'node-123' }]
    )
  })
})
