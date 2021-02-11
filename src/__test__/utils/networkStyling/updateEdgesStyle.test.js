import updateEdgesStyle from '../../../utils/networkStyling/updateEdgesStyle'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import store from '../../../store'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

describe('updateEdgesStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getEdgeIds.mockImplementationOnce(() => ([
      'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM',
      'http://webprotege.stanford.edu/R4I2v4Y7su3Adf0Vcj6TWd'
    ]))
    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeCaptionProperty: 'rdfsLabel',
      objectPropertiesFromApi: OwlObjectProperties
    }))

    await updateEdgesStyle()

    expect(updateEdges).toHaveBeenLastCalledWith(
      { id: 'http://webprotege.stanford.edu/R4I2v4Y7su3Adf0Vcj6TWd', label: 'Proposed\nin' }
    )
  })
})
