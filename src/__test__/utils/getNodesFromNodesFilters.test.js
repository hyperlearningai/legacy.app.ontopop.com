import getNodesFromNodesFilters from '../../utils/getNodesFromNodesFilters'
import store from '../../store'
import { availableNodesNormalised } from '../fixtures/availableNodesNormalised'

const getState = jest.fn().mockImplementation(() => ({
  availableNodesNormalised
}))
store.getState = getState

describe('getNodesFromNodesFilters', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodesFilters = [{
      property: 'rdfsLabel',
      value: 'road'
    }]

    const nodesToDisplay = await getNodesFromNodesFilters({
      nodesFilters
    })

    expect(nodesToDisplay).toEqual(
      [
        'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
        'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
        'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
        'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK'
      ]
    )
  })
})
