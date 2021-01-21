import searchElement from '../../utils/searchElement'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties.json'

const setStoreState = jest.fn()

describe('searchElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set freeTextSelection as empty when no seasrch', async () => {
    const search = ''
    const classesFromApi = OwlClasses
    const objectPropertiesFromApi = OwlObjectProperties
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf'
    ]
    const edgesIdsToDisplay = [
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
    ]

    await searchElement({
      classesFromApi,
      edgesIdsToDisplay,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { }
    )
  })

  it('should set freeTextSelection when node found', async () => {
    const search = 'projects or tasks'
    const classesFromApi = OwlClasses
    const objectPropertiesFromApi = OwlObjectProperties
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf'
    ]
    const edgesIdsToDisplay = [
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
    ]

    await searchElement({
      classesFromApi,
      edgesIdsToDisplay,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': 'node' }
    )
  })

  it('should set freeTextSelection when edge found', async () => {
    const search = 'specify the Entity'
    const classesFromApi = OwlClasses
    const objectPropertiesFromApi = OwlObjectProperties
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf'
    ]
    const edgesIdsToDisplay = [
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
    ]

    await searchElement({
      classesFromApi,
      edgesIdsToDisplay,
      nodesIdsToDisplay,
      objectPropertiesFromApi,
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB': 'edge' }
    )
  })
})
