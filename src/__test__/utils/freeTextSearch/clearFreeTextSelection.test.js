import clearFreeTextSelection from '../../../utils/freeTextSearch/clearFreeTextSelection'
import store from '../../../store'

const update = jest.fn()

describe('clearFreeTextSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not update if no elements selected', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      availableNodes: {
        update
      },
      freeTextSelection: {}
    }))

    await clearFreeTextSelection()

    expect(update).toHaveBeenCalledTimes(0)
  })

  it('should update node and ignore edge', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      availableNodes: {
        update
      },
      freeTextSelection: {
        'node-123': 'node',
        'edge-123': 'edge',
      }
    }))

    await clearFreeTextSelection()

    expect(update).toHaveBeenCalledWith(
      [{ color: { background: '#adefd1' }, id: 'node-123' }]
    )
  })
})
