/* eslint max-len:0 */
import addNodeBorders from '../../../utils/networkStyling/addNodeBorders'
import highlightCommentedNode from '../../../utils/networkStyling/highlightCommentedNode'
import highlightSpiderableNode from '../../../utils/networkStyling/highlightSpiderableNode'
import { ROUTE_NOTES } from '../../../constants/routes'

jest.mock('../../../utils/networkStyling/highlightCommentedNode')
jest.mock('../../../utils/networkStyling/highlightSpiderableNode')

const node = { id: '12' }

const currentLocation = window.location

describe('addNodeBorders', () => {
  afterEach(() => {
    jest.clearAllMocks()
    window.location = currentLocation
  })

  it('should work correctly when ROUTE_NOTES', async () => {
    delete window.location
    window.location = { pathname: ROUTE_NOTES }

    await addNodeBorders({
      node
    })

    expect(highlightCommentedNode).toHaveBeenCalledWith({
      node
    })
    expect(highlightSpiderableNode).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    delete window.location
    window.location = { pathname: '/any' }

    await addNodeBorders({
      node
    })

    expect(highlightCommentedNode).toHaveBeenCalledTimes(0)
    expect(highlightSpiderableNode).toHaveBeenCalledWith({
      node
    })
  })
})
