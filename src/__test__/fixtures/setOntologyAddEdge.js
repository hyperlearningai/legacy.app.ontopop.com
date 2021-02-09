import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

export const addToObjectFixture = {
  classesFromApi: OwlClasses,
  classesFromApiBackup: OwlClasses,
  deletedNodes: [],
  objectPropertiesFromApi: {
    'http://test.com/edge': {
      label: 'New edge',
      owlAnnotationProperties: {
        'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another edge',
      },
      rdfsLabel: 'New edge',
    },
    ...OwlObjectProperties
  },
  objectPropertiesFromApiBackup: OwlObjectProperties,
  addedNodes: [],
  updatedNodes: [],
  addedEdges: ['http://test.com/edge'],
  deletedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
}

export const setStoreStateFixture = [
  [
    'objectPropertiesFromApi',
    {
      'http://test.com/edge': {
        label: 'New edge',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another edge',
        },
        rdfsLabel: 'New edge',
      },
      ...OwlObjectProperties
    },
  ],
  [
    'addedEdges',
    ['http://test.com/edge']
  ]
]
