import { DataSet } from 'vis-data'
import searchElement from '../../../utils/freeTextSearch/searchElement'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import store from '../../../store'

const setStoreState = jest.fn()
const classes = Object.keys(OwlClasses).map((elementId) => ({
  ...OwlClasses[elementId],
  id: elementId
}))

const getState = jest.fn().mockImplementation(() => ({
  classesFromApi: OwlClasses,
  edgesIdsToDisplay: [
    'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
    'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
  ],
  objectPropertiesFromApi: OwlObjectProperties,
  availableNodes: new DataSet(classes),
  annotationProperties: [
    'rdfsLabel',
    'rdfAbout'
  ],
  selectedGraphVersion: 'original',
  graphVersions: {
    original: {
      classesFromApi: {

      },
      objectPropertiesFromApi: {

      },
      classesFromApiBackup: OwlClasses,
    }
  }
}))
store.getState = getState

describe('searchElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set freeTextSelection as empty when no seasrch', async () => {
    const search = ''

    await searchElement({
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { }
    )
  })

  it('should set freeTextSelection when node found', async () => {
    const search = 'projects or tasks'

    await searchElement({
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': 'node' }
    )
  })

  it('should set freeTextSelection when edge found', async () => {
    const search = 'specify the Entity'

    await searchElement({
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB': 'edge' }
    )
  })
})
