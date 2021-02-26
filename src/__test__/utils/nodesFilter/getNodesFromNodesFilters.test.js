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
        '32',
        '53',
        '70',
        '76',
        '91',
        '92',
        '99',
        '104',
        '110',
        '122',
        '130',
        '144',
        '161',
        '177',
        '180',
        '184',
        '186',
      ]
    )
  })
})
