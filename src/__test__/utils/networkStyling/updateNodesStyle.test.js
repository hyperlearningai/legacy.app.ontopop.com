import updateNodesStyle from '../../../utils/networkStyling/updateNodesStyle'
import { classesFromApi } from '../../fixtures/classesFromApi'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('updateNodesStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getNodeIds.mockImplementationOnce(() => ([
      '1'
    ]))
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeCaptionProperty: 'rdfsLabel',
      classesFromApi
    }))

    await updateNodesStyle()

    expect(updateNodes).toHaveBeenLastCalledWith(
      { id: '1', label: 'Communication\nDocument' }
    )
  })
})
