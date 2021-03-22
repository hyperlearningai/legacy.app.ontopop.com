/* eslint max-len:0 */
import highlightEdgesNotes from '../../../utils/notes/highlightEdgesNotes'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')

const commonState = {
  globalNodeStyling: {
    stylingEdgeLineColor: '#000',
    stylingEdgeWidth: 1,
  },
  userDefinedNodeStyling: {
    stylingEdgeLineColor: '#000',
    stylingEdgeWidth: 1,
  },
}

const edgeIds = [
  '1',
  '170'
]

const noteMock = {
  id: 1,
  type: 'graph',
  userId: 'username@domain.tld',
  contents: 'example text',
  dateCreated: '2021-12-12 10:10:10',
  dateLastUpdated: '2021-12-12 10:10:10'
}

describe('highlighEdgeNotes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const edge = { userDefined: false }
    const mockNotes = [{ ...noteMock, id: 1 }, { ...noteMock, id: 170 }]

    getEdgeIds.mockImplementation(() => edgeIds)
    getEdge.mockImplementation((edgeId) => ({ userDefined: false, id: edgeId }))

    store.getState = jest.fn().mockImplementationOnce(() => ({
      ...commonState,
      notes: mockNotes,
    }))

    await highlightEdgesNotes({
      edge
    })

    expect(updateEdges).toHaveBeenCalledWith(
      {
        width: 1,
        color: {
          color: '#000',
        },
        id: '1',
      }
    )
  })
})
