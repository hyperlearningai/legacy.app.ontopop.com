import startupActions from '../../../utils/graphVisualisation/startupActions'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import loadStyling from '../../../utils/networkStyling/loadStyling'
import setNodesIdsToDisplay from '../../../utils/graphVisualisation/setNodesIdsToDisplay'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'
import notesGetNotes from '../../../utils/notes/notesGetNotes'

jest.mock('../../../utils/networkStyling/loadStyling')
jest.mock('../../../utils/apiCalls/getGraphData')
jest.mock('../../../utils/graphVisualisation/setNodesIdsToDisplay')
jest.mock('../../../utils/notes/notesGetNotes')

const setStoreState = jest.fn()
const addNumber = jest.fn()
const t = jest.fn()

describe('startupActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await startupActions({
      addNumber,
      setStoreState,
      t
    })

    expect(loadStyling).toHaveBeenCalledWith({
      addNumber,
      setStoreState,
      t
    })

    expect(getGraphData).toHaveBeenCalledWith({
      addNumber,
      setStoreState,
      t
    })

    expect(notesGetNotes.mock.calls).toEqual([
      [
        {
          addNumber,
          setStoreState,
          t
        }
      ],
      [
        {
          addNumber,
          setStoreState,
          type: 'node',
          t
        }
      ],
      [
        {
          addNumber,
          setStoreState,
          type: 'edge',
          t
        }
      ],
    ])

    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      type: ALGO_TYPE_FULL,
      setStoreState,
      t
    })
  })
})
