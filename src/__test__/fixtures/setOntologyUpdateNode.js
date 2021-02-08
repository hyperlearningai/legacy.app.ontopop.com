import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

const newClassesFromApi = {
  ...OwlClasses,
  'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
    ...OwlClasses['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'],
    label: 'New node',
    owlAnnotationProperties: {
      ...OwlClasses['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'].owlAnnotationProperties,
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
    },
    rdfsLabel: 'New node',
  },
}

export const addToObjectFixture = {
  classesFromApi: newClassesFromApi,
  classesFromApiBackup: OwlClasses,
  deletedNodes: [],
  objectPropertiesFromApi: OwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  addedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
  updatedNodes: ['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY']
}

export const setStoreStateFixture = [
  [
    'classesFromApi',
    newClassesFromApi
  ],
  [
    'updatedNodes',
    ['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY']
  ]
]
