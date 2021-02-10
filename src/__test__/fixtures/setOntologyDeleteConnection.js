// import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

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

const newClassesFromApiBackup = OwlClasses

export const addToObjectFixture = {
  classesFromApi: newClassesFromApi,
  classesFromApiBackup: newClassesFromApiBackup,
  deletedNodes: [],
  objectPropertiesFromApi: OwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  addedConnections: [],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections,
  addedNodes: [],
}

export const setStoreStateFixture = [
  [
    'classesFromApi',
    newClassesFromApi,
  ],
  [
    'deletedConnections',
    deletedConnections,
  ]
]
