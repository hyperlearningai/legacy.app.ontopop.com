import clearNodesSelection from '../../../utils/canvasUtils/clearNodesSelection'
import store from '../../../store'

const update = jest.fn()

describe('clearNodesSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not update if no selected nodes', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      availableNodes: {
        update
      },
      selectedBoundingBoxNodes: []
    }))

    await clearNodesSelection()

    expect(update).toHaveBeenCalledTimes(0)
  })

  it('should update if selected nodes', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      availableNodes: {
        update
      },
      selectedBoundingBoxNodes: [
        'node-123',
        'node-234',
      ]

    }))

    await clearNodesSelection()

    expect(update.mock.calls).toEqual(
      [
        [[{ color: { background: '#adefd1' }, id: 'node-123' }]],
        [[{ color: { background: '#adefd1' }, id: 'node-234' }]]
      ]
    )
  })
})
