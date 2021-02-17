// import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { OwlClasses } from './test-ontology-classes'
import { nodesConnections } from './nodesConnections'
import { triplesPerNode } from './triplesPerNode'
import { edgesConnections } from './edgesConnections'

const deletedConnections = ['http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ']

const rdfsSubClassOf = [
  {
    classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
    owlRestriction: {
      classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
    }
  }
]

const newClassesFromApi = {
  ...OwlClasses,
  'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
    ...OwlClasses['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'],
    [SUBCLASSOF_PROPERTY]: rdfsSubClassOf
  }
}

const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))

newNodesConnections['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'].splice(0, 1)
newNodesConnections['http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'].splice(0, 1)

newTriplesPerNode['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'].splice(1, 1)
newTriplesPerNode['http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'].splice(0, 1)

export const setStoreStateFixture = [
  [
    'nodesConnections', newNodesConnections
  ],
  [
    'edgesConnections', newEdgesConnections
  ],
  [
    'triplesPerNode', newTriplesPerNode
  ],
  [
    'classesFromApi',
    newClassesFromApi,
  ],
  [
    'deletedConnections',
    deletedConnections,
  ]
]
