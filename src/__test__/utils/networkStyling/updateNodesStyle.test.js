import updateNodesStyle from '../../../utils/networkStyling/updateNodesStyle'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
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
      'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    ]))
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeCaptionProperty: 'rdfsLabel',
      classesFromApi: OwlClasses
    }))

    await updateNodesStyle()

    expect(updateNodes).toHaveBeenLastCalledWith(
      { id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M', label: 'Programme' }
    )
  })
})
