/* eslint max-len:0 */
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreNode'
import { nodesConnections } from '../../fixtures/nodesConnections'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { edgesConnections } from '../../fixtures/edgesConnections'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'

const selectedElement = Object.keys(OwlClasses).slice(0, 2)
const deletedNodes = Object.keys(OwlClasses).slice(0, 4)

const setStoreState = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setElementsStyle')
jest.mock('../../../utils/graphVisualisation/getEdgeObject')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('setOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      objectPropertiesFromApi: OwlObjectProperties,
      deletedNodes,
      classesFromApiBackup: OwlClasses,
      classesFromApi: OwlClasses,
      stylingNodeCaptionProperty: 'rdfsLabel',
      nodesConnections,
      triplesPerNode,
      edgesConnections
    }))

    getNode.mockImplementation(() => ({ id: '123' }))
    getEdgeObject.mockImplementation(() => ({
      edge: { id: 'node-123' },
      edgeConnection: {
        to: 'node-123',
        from: 'node-234'
      }
    }))

    await setOntologyRestoreNode({
      selectedElement,
      setStoreState,
    })

    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(addNode).toHaveBeenLastCalledWith(
      {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'Programme',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Plan', 'http://www.w3.org/2004/02/skos/core#comment': 'A strategic goal that is achieved through a number of projects.', 'http://www.w3.org/2004/02/skos/core#definition': 'A collection of projects or tasks undertaken to realise a strategic goal.', 'http://www.w3.org/2004/02/skos/core#example': 'Develop connectivity between London and Inverness.'
        },
        rdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        rdfsLabel: 'Programme',
        rdfsSubClassOf: [{ classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6', owlRestriction: { classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6', objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB' } }, { classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g', owlRestriction: { classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g', objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB' } }, { classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8', owlRestriction: { classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8', objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU' } }, { classRdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf', owlRestriction: { classRdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf', objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay' } }, { classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs', owlRestriction: null }],
        skosComment: 'A strategic goal that is achieved through a number of projects.',
        skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
        skosExample: 'Develop connectivity between London and Inverness.'
      }
    )
    expect(addEdge).toHaveBeenLastCalledWith({ id: 'node-123' })
    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
