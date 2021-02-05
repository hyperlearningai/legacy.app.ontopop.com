/* eslint max-len:0 */
import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

const deletedNodes = Object.keys(OwlClasses).slice(2, 4)

const newClassesFromApi = JSON.parse(JSON.stringify(OwlClasses))

deletedNodes.map((nodeId) => {
  delete newClassesFromApi[nodeId]
  return true
})

newClassesFromApi['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'].rdfsSubClassOf = [{
  classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
  owlRestriction: {
    objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
    classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
  }
}, {
  classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
  owlRestriction: {
    objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
    classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
  }
}, {
  classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
  owlRestriction: {
    objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU',
    classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8'
  }
}, {
  classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
  owlRestriction: null
}]

export const addToObjectFixture = {
  addedNodes: [],
  classesFromApi: newClassesFromApi,
  classesFromApiBackup: OwlClasses,
  deletedNodes: [
    'http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8',
    'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
  ],
  objectPropertiesFromApi: OwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
}

export const setStoreStateFixture = [
  [
    'deletedNodes',
    [
      'http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8',
      'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
    ],
  ],
  [
    'isOntologyUpdated',
    true,
  ],
]
