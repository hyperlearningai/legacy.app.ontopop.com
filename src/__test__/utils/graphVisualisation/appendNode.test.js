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
    const nodeId = 1
    const nodeIdObject = {
      id: 1,
      label: 'test'
    }

    getNode.mockImplementationOnce(() => null)

    await appendNode({
      addedNodes,
      nodeId,
      nodeIdObject,
    })

    expect(addNode.mock.calls[0][0].id).toEqual(1)
    expect(addedNodes).toEqual(['1'])
  })
})
