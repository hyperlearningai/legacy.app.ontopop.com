/* eslint max-len:0 */
import addNodesBorders from '../../../utils/networkStyling/addNodesBorders'
import highlightCommentedNodes from '../../../utils/networkStyling/highlightCommentedNodes'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'
import store from '../../../store'
import { SIDEBAR_VIEW_NOTES } from '../../../constants/views'

jest.mock('../../../utils/networkStyling/highlightCommentedNodes')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')

describe('addNodesBorders', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when SIDEBAR_VIEW_NOTES', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      sidebarView: SIDEBAR_VIEW_NOTES
    }))

    await addNodesBorders()

    expect(highlightCommentedNodes).toHaveBeenCalledWith()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      sidebarView: 'any'

    }))

    await addNodesBorders()

    expect(highlightSpiderableNodes).toHaveBeenCalledWith()
  })
})
