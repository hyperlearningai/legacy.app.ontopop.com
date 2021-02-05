/* eslint max-len:0 */
import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

const deletedEdges = Object.keys(OwlObjectProperties).slice(2, 4)
const deletedNodes = Object.keys(OwlClasses).slice(0, 4)

const newClassesFromApi = JSON.parse(JSON.stringify(OwlClasses))
const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(OwlObjectProperties))

deletedEdges.map((edgeId) => {
  delete newObjectPropertiesFromApi[edgeId]
  return true
})

deletedNodes.map((nodeId) => {
  delete newClassesFromApi[nodeId]
  return true
})

newClassesFromApi['http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'].rdfsSubClassOf = newClassesFromApi['http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'].rdfsSubClassOf.filter((item) => item.classRdfAbout !== 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M')

newObjectPropertiesFromApi['http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8'] = {
  owlAnnotationProperties: {
    'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Causality',
    'http://www.w3.org/2004/02/skos/core#definition': 'Relationship that specifies when or where another Entity has been chosen.',
  },
  rdfAbout: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
  rdfsLabel: 'Selected in',
  rdfsSubPropertyOf: [
    'http://webprotege.stanford.edu/RD3fuHtzxeYkMf46qK7HAsD',
  ],
  skosComment: null,
  skosDefinition: 'Relationship that specifies when or where another Entity has been chosen.',
}

newObjectPropertiesFromApi['http://webprotege.stanford.edu/R79SeNap6q11kTo4DsroWaC'] = {
  owlAnnotationProperties: {
    'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Responsibility',
    'http://www.w3.org/2004/02/skos/core#definition': 'Relationship used to define the Entity that gathers different values and status information about another Entity.',
  },
  rdfAbout: 'http://webprotege.stanford.edu/R79SeNap6q11kTo4DsroWaC',
  rdfsLabel: 'Measured by',
  rdfsSubPropertyOf: [
    'http://webprotege.stanford.edu/RD3fuHtzxeYkMf46qK7HAsD',
  ],
  skosComment: null,
  skosDefinition: 'Relationship used to define the Entity that gathers different values and status information about another Entity.',
}

export const addToObjectFixture = {
  addedNodes: [],
  classesFromApi: newClassesFromApi,
  classesFromApiBackup: OwlClasses,
  deletedEdges: [
    'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
    'http://webprotege.stanford.edu/R79SeNap6q11kTo4DsroWaC',
  ],
  objectPropertiesFromApi: newObjectPropertiesFromApi,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  updatedNodes: [],
  deletedNodes: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
}

export const setStoreStateFixture = [
  [
    'deletedEdges',
    [
      'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
      'http://webprotege.stanford.edu/R79SeNap6q11kTo4DsroWaC',
    ],
  ],
  [
    'isOntologyUpdated',
    true,
  ],
]
