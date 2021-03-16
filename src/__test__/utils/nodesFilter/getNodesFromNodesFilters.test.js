import getNodesFromNodesFilters from '../../../utils/nodesFilter/getNodesFromNodesFilters'
import store from '../../../store'
import { availableNodes } from '../../fixtures/availableNodes'

store.getState = jest.fn().mockImplementation(() => ({
  availableNodes
}))

describe('getNodesFromNodesFilters', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodesFilters = [{
      property: 'rdfsLabel',
      value: 'ro'
    }]

    const nodesToDisplay = await getNodesFromNodesFilters({
      nodesFilters
    })

    expect(nodesToDisplay).toEqual(
      [
        '2',
        '35',
        '56',
        '73',
        '79',
        '94',
        '95',
        '103',
        '108',
        '115',
        '128',
        '136',
        '150',
        '168',
        '184',
        '187',
        '191',
        '193',
      ]
    )
  })
})
