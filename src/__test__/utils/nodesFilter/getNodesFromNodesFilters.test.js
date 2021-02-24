import getNodesFromNodesFilters from '../../../utils/nodesFilter/getNodesFromNodesFilters'
import store from '../../../store'
import { availableNodes } from '../../fixtures/availableNodesNormalised'

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
        'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
        'http://webprotege.stanford.edu/R9yaUi67502d49oMbx70wiF',
        'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9',
        'http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS',
        'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
        'http://webprotege.stanford.edu/R7pIV91w7fTKppAHSmrz8n',
        'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
        'http://webprotege.stanford.edu/RB0lf4hZ1CRIjB3tldwNYlq',
        'http://webprotege.stanford.edu/RnMK2vS5olvsw9Krge2Ymj',
        'http://webprotege.stanford.edu/Rf8re1EdmLU47EIlLtCpzx',
        'http://webprotege.stanford.edu/R9WIxkbvxYbhp8NthzYsXSx',
        'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
        'http://webprotege.stanford.edu/RBKQgaabYcnNDy5hL7YKCKt',
        'http://webprotege.stanford.edu/RBeMHRpPtIj9w4fNQv66hnI',
        'http://webprotege.stanford.edu/RmVBgJPMOQ5Amchla0VZUw',
        'http://webprotege.stanford.edu/RCrgRyMOzbaY6vxlnONgyzo',
        'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK',
      ]
    )
  })
})
