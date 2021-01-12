import getAllTriplesPerNode from '../../utils/getAllTriplesPerNode'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { triplesPerNode } from '../fixtures/triplesPerNode'

const setStoreState = jest.fn()
const classesFromApi = OwlClasses
const classesIds = Object.keys(classesFromApi)

describe('getAllTriplesPerNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await getAllTriplesPerNode({
      classesIds,
      setStoreState,
      classesFromApi
    })

    expect(setStoreState).toHaveBeenCalledWith('triplesPerNode', triplesPerNode)
  })
})
