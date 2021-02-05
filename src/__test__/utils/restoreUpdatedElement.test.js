import restoreUpdatedElement from '../../utils/restoreUpdatedElement'
import store from '../../store'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'

const setSelectedElementProperties = jest.fn()
const selectedElement = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
const getState = jest.fn().mockImplementation(() => ({
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

describe('restoreUpdatedElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node', async () => {
    const type = 'node'

    await restoreUpdatedElement({
      setSelectedElementProperties,
      type,
      selectedElement
    })

    expect(setSelectedElementProperties).toHaveBeenCalledWith(
      {
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        rdfsLabel: 'Communication Document'
      }
    )
  })
})
