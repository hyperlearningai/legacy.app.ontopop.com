/* eslint max-len:0 */
import addNodesBorders from '../../../utils/networkStyling/addNodesBorders'
import highlightCommentedNodes from '../../../utils/networkStyling/highlightCommentedNodes'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'
import { ROUTE_NOTES } from '../../../constants/routes'

jest.mock('../../../utils/networkStyling/highlightCommentedNodes')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')

const currentLocation = window.location

describe('addNodesBorders', () => {
  afterEach(() => {
    jest.clearAllMocks()
    window.location = currentLocation
  })

  it('should work correctly when SIDEBAR_VIEW_NOTES', async () => {
    delete window.location
    window.location = { pathname: ROUTE_NOTES }

    await addNodesBorders()

    expect(highlightCommentedNodes).toHaveBeenCalledWith()
  })

  it('should work correctly', async () => {
    delete window.location
    window.location = { pathname: '/any' }

    await addNodesBorders()

    expect(highlightSpiderableNodes).toHaveBeenCalledWith()
  })
})
