/* eslint max-len:0 */
import setOntologyRestoreConnection from '../../../utils/editOntology/setOntologyRestoreConnection'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreConnection'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')

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
    const getState = jest.fn().mockImplementation(() => ({
      graphVersions,
      classesFromApi: newOwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      selectedGraphVersion: 'original',
      deletedConnections: [selectedElement[0]],
      stylingNodeCaptionProperty: 'rdfsLabel'
    }))
    store.getState = getState

    await setOntologyRestoreConnection({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      edgeId: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      fromLabel: 'Communication Document',
      id: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      label: 'Provided to',
      owlAnnotationProperties: { 'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Transfer', 'http://www.w3.org/2004/02/skos/core#comment': 'The difference with "Issued to" is that "Issued to" implies there is a legal or contractural arrangement applied.', 'http://www.w3.org/2004/02/skos/core#definition': 'Relationship that specifies the receiver of an Entity that has been sent out or put forth.' },
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      rdfsSubPropertyOf: ['http://webprotege.stanford.edu/R864k4trK0sb0XWCVmIQkLN'],
      skosComment: 'The difference with "Issued to" is that "Issued to" implies there is a legal or contractural arrangement applied.',
      skosDefinition: 'Relationship that specifies the receiver of an Entity that has been sent out or put forth.',
      to: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      toLabel: 'Licence Holder'
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
