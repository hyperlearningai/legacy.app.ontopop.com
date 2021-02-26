import restoreUpdatedElement from '../../../utils/editOntology/restoreUpdatedElement'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'

const setSelectedElementProperties = jest.fn()
const selectedElement = '1'
const getState = jest.fn().mockImplementation(() => ({
  annotationProperties: [
    'rdfsLabel',
    'rdfAbout'
  ],
  classesFromApiBackup: classesFromApi,
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
