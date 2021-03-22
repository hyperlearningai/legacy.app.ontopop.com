/* eslint max-len:0 */
import highlightNodesSynonyms from '../../../utils/synonyms/highlightNodesSynonyms'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')

const commonState = {
  globalNodeStyling: {
    stylingNodeBorderColor: '#000',
    stylingNodeBorder: 1,
  },
  userDefinedNodeStyling: {
    stylingNodeBorderColor: '#000',
    stylingNodeBorder: 1,
  },
}

const nodeIds = [
  '1',
  '170'
]

const synonymMock = {
  id: 1,
  userId: 'username@domain.tld',
  synonym: 'example text',
  dateCreated: '2021-12-12 10:10:10',
  dateLastUpdated: '2021-12-12 10:10:10'
}

describe('highlighNodeSynonyms', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const node = { userDefined: false }
    const mockSynonyms = [{ ...synonymMock, id: 1 }, { ...synonymMock, id: 170 }]

    getNodeIds.mockImplementation(() => nodeIds)
    getNode.mockImplementation((nodeId) => ({ userDefined: false, id: nodeId }))

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      synonyms: mockSynonyms,
    }))

    await highlightNodesSynonyms({
      node
    })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: 1,
        color: {
          border: '#000',
        },
        id: '1',
      }
    )
  })
})
