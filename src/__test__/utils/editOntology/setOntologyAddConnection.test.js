/* eslint max-len:0 */
import setOntologyAddConnection from '../../../utils/editOntology/setOntologyAddConnection'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyAddConnection'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')

const selectedElementProperties = {
  from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
  predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
  to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
}

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyAddConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementation(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      selectedGraphVersion: 'original',
      addedConnections: [],
      stylingNodeCaptionProperty: 'rdfsLabel'
    }))
    store.getState = getState

    await setOntologyAddConnection({
      setStoreState,
      selectedElementProperties,
      addToObject
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      edgeId: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
      from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      fromLabel: 'Communication Document',
      id: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      label: 'Selected in',
      owlAnnotationProperties: { 'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Causality', 'http://www.w3.org/2004/02/skos/core#definition': 'Relationship that specifies when or where another Entity has been chosen.' },
      rdfAbout: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
      rdfsLabel: 'Selected in',
      rdfsSubPropertyOf: ['http://webprotege.stanford.edu/RD3fuHtzxeYkMf46qK7HAsD'],
      skosComment: null,
      skosDefinition: 'Relationship that specifies when or where another Entity has been chosen.',
      to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      toLabel: 'Programme'
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
