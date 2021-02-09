/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyRestoreConnection from '../../../utils/editOntology/setOntologyRestoreConnection'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreConnection'

const selectedElement = [
  'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
]
const setStoreState = jest.fn()
const addToObject = jest.fn()
const newOwlClasses = JSON.parse(JSON.stringify(OwlClasses))
newOwlClasses['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'].rdfsSubClassOf = [{
  classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
  owlRestriction: null
}]

describe('setOntologyRestoreConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: newOwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      selectedGraphVersion: 'original',
      deletedConnections: [selectedElement[0]],
      availableEdges: new DataSet([])
    }))
    store.getState = getState

    await setOntologyRestoreConnection({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
