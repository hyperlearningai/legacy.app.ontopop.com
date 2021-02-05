import getNodesEdgesFromEdgesFilters from '../../utils/getNodesEdgesFromEdgesFilters'
import store from '../../store'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties.json'
import { availableEdgesNormalised } from '../fixtures/availableEdgesNormalised'

const getState = jest.fn().mockImplementation(() => ({
  objectPropertiesFromApi: OwlObjectProperties,
  availableEdgesNormalised
}))
store.getState = getState

describe('getNodesEdgesFromEdgesFilters', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const edgesFilters = [{
      property: 'rdfsLabel',
      value: 'comp'
    }]

    const {
      edgesToDisplay,
      nodesToDisplay
    } = await getNodesEdgesFromEdgesFilters({
      edgesFilters
    })

    expect(edgesToDisplay).toEqual(
      [
        'http://webprotege.stanford.edu/RBGj27xJbqpVePdpgjXqeVk',
        'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ'
      ]
    )

    expect(nodesToDisplay).toEqual(
      [
        'http://webprotege.stanford.edu/R2RFTG7iNuFjv3A8V7qHOb',
        'http://webprotege.stanford.edu/RB2wiyzebv6p4qrvJjgommU',
        'http://webprotege.stanford.edu/R7dcPTLwQrLcc9eK22R7swU',
        'http://webprotege.stanford.edu/RFNK6OsKMaap9LxxLXdLxR',
        'http://webprotege.stanford.edu/R7pIV91w7fTKppAHSmrz8n',
        'http://webprotege.stanford.edu/R81y0gnn3Ar0DJ8FatMTqK3',
        'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
        'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
        'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
        'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
        'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
        'http://webprotege.stanford.edu/R8N1a0K78gZZbVLw2P1NkTX',
        'http://webprotege.stanford.edu/RCGrVyxcVdUB7rI7qGrKvTF',
        'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
        'http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm',
        'http://webprotege.stanford.edu/RC714KfXzpEYi4lGyNUEbWI',
        'http://webprotege.stanford.edu/RBzF9qwVtyzz358WQ0Iaxjs',
        'http://webprotege.stanford.edu/RCdB5m1RZhhIcJM0SpRcJvn',
        'http://webprotege.stanford.edu/RnzPd3Edkzo3UTz2B80djl']
    )
  })
})
