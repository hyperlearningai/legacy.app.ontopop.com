import clearNodesSelection from '../../../utils/boundingBoxSelection/clearNodesSelection'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('clearNodesSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not update if no selected nodes', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeBackgroundColor: '#ffff00',
      selectedBoundingBoxNodes: []
    }))

    await clearNodesSelection()

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should update if selected nodes', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeBackgroundColor: '#ffff00',
      selectedBoundingBoxNodes: [{
        id: 'node-123',
      }, {
        id: 'node-234',
      }]
    }))

    await clearNodesSelection()

    expect(updateNodes.mock.calls).toEqual(
      [
        [[{ color: { background: '#ffff00' }, id: 'node-123' }]],
        [[{ color: { background: '#ffff00' }, id: 'node-234' }]]
      ]
    )
  })
})
