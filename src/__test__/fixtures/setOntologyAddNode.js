import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

export const addToObjectFixture = {
  classesFromApi: {
    'http://test.com/node': {
      label: 'New node',
      owlAnnotationProperties: {
        'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
      },
      rdfsLabel: 'New node',
    },
    ...OwlClasses
  },
  classesFromApiBackup: OwlClasses,
  deletedNodes: [],
  objectPropertiesFromApi: OwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  addedNodes: ['http://test.com/node'],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
}

export const setStoreStateFixture = [
  [
    'classesFromApi',
    {
      'http://test.com/node': {
        label: 'New node',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
        },
        rdfsLabel: 'New node',
      },
      ...OwlClasses
    },
  ],
  [
    'addedNodes',
    ['http://test.com/node']
  ]
]
