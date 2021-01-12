import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD
} from '../../constants/algorithms'
import setNodesIdsToDisplay from '../../utils/setNodesIdsToDisplay'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { algoTypeFull } from '../fixtures/setNodesIdsToDisplayResults'
import { triplesPerNode } from '../fixtures/triplesPerNode'

const setStoreState = jest.fn()

describe('setNodesIdsToDisplay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when ALGO_TYPE_FULL', async () => {
    const type = ALGO_TYPE_FULL

    await setNodesIdsToDisplay({
      type,
      classesFromApi: OwlClasses,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith('nodesIdsToDisplay', algoTypeFull)
  })

  it('should work correctly when ALGO_TYPE_NEIGHBOURHOOD', async () => {
    const type = ALGO_TYPE_NEIGHBOURHOOD

    const options = {
      selectedNodeId: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      separationDegree: 1,
      triplesPerNode
    }

    await setNodesIdsToDisplay({
      type,
      classesFromApi: OwlClasses,
      setStoreState,
      options
    })

    expect(setStoreState).toHaveBeenCalledWith('nodesIdsToDisplay', [
      'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      'http://webprotege.stanford.edu/Rhx4iGF2ITGgrmcS2fHAN5',
      'http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1',
      'http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc',
      'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
      'http://webprotege.stanford.edu/R9sbR69tmanyzKyA39GGMRD',
      'http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D',
      'http://webprotege.stanford.edu/RCnRceKsHZf8Gt9UvDjM6We',
      'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
      'http://webprotege.stanford.edu/RDZQxNkcGSsNALjBJH6keFD',
      'http://webprotege.stanford.edu/RFwjTev6moOjE08akYHzWP',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
      'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
      'http://webprotege.stanford.edu/RF3YeWGVEQjj16Hy07lXyU',
      'http://webprotege.stanford.edu/RBJ3sWyEdjzo3HjkcABim8C',
      'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
      'http://webprotege.stanford.edu/R9BdIrtS5xNdcAPHLf4JaEE',
    ])
  })
})
