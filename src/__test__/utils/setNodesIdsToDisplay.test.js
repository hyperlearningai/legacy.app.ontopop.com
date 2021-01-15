import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD
} from '../../constants/algorithms'
import setNodesIdsToDisplay from '../../utils/setNodesIdsToDisplay'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties.json'
import { algoTypeFull } from '../fixtures/setNodesIdsToDisplayResults'
import { triplesPerNode } from '../fixtures/triplesPerNode'

const setStoreState = jest.fn()
const classesFromApi = OwlClasses
const objectPropertiesFromApi = OwlObjectProperties

describe('setNodesIdsToDisplay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when ALGO_TYPE_FULL', async () => {
    const type = ALGO_TYPE_FULL

    await setNodesIdsToDisplay({
      type,
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual(algoTypeFull)
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
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'highlightedNodes',
        [
          'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        ],
      ],
      [
        'edgesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          'http://webprotege.stanford.edu/RBouRer6kTdZCfCZ4kpk7K3',
        ],
      ],
      [
        'nodesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
          'http://webprotege.stanford.edu/Rhx4iGF2ITGgrmcS2fHAN5',
        ],
      ],

    ])
  })
})
