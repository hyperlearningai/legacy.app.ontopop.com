import startupActions from '../../../utils/graphVisualisation/startupActions'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import loadStyling from '../../../utils/networkStyling/loadStyling'
import setNodesIdsToDisplay from '../../../utils/graphVisualisation/setNodesIdsToDisplay'
import notesGetNotes from '../../../utils/notes/notesGetNotes'

jest.mock('../../../utils/networkStyling/loadStyling')
jest.mock('../../../utils/apiCalls/getGraphData')
jest.mock('../../../utils/graphVisualisation/setNodesIdsToDisplay')
jest.mock('../../../utils/notes/notesGetNotes')

const updateStoreValue = jest.fn()
const t = jest.fn()

describe('startupActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await startupActions({
      updateStoreValue,
      t
    })

    expect(loadStyling).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })

    expect(getGraphData).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })

    expect(notesGetNotes.mock.calls).toEqual([
      [
        {
          updateStoreValue,
          t
        }
      ],
      [
        {
          updateStoreValue,
          type: 'node',
          t
        }
      ],
      [
        {
          updateStoreValue,
          type: 'edge',
          t
        }
      ],
    ])

    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      updateStoreValue,
      t
    })
  })
})
