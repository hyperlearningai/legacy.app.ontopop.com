import appendNode from '../../../utils/graphVisualisation/appendNode'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

describe('appendNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const addedNodes = []
    const nodeId = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    const nodeIdObject = {
      id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'test'
    }

    getNode.mockImplementationOnce(() => null)

    await appendNode({
      addedNodes,
      nodeId,
      nodeIdObject,
    })

    expect(addNode.mock.calls[0][0].id).toEqual('http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M')
    expect(addedNodes).toEqual(['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'])
  })
})
