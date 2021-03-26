/* eslint max-len:0 */
import addNodeBorders from '../../../utils/networkStyling/addNodeBorders'
import highlightCommentedNode from '../../../utils/networkStyling/highlightCommentedNode'
import highlightSpiderableNode from '../../../utils/networkStyling/highlightSpiderableNode'
import store from '../../../store'
import { SIDEBAR_VIEW_NOTES } from '../../../constants/views'

jest.mock('../../../utils/networkStyling/highlightCommentedNode')
jest.mock('../../../utils/networkStyling/highlightSpiderableNode')

const node = { id: '12' }

describe('addNodeBorders', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when SIDEBAR_VIEW_NOTES', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      sidebarView: SIDEBAR_VIEW_NOTES
    }))

    await addNodeBorders({
      node
    })

    expect(highlightCommentedNode).toHaveBeenCalledWith({
      node
    })
    expect(highlightSpiderableNode).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      sidebarView: 'any'

    }))

    await addNodeBorders({
      node
    })

    expect(highlightCommentedNode).toHaveBeenCalledTimes(0)
    expect(highlightSpiderableNode).toHaveBeenCalledWith({
      node
    })
  })
})
