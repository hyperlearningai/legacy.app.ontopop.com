import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'
import { availableNodesNormalised } from './availableNodesNormalised'

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
  updatedNodes: []
}

export const setStoreStateFixture = [
  [
    'availableNodesNormalised', {
      ...availableNodesNormalised,
      'http://test.com/node': {
        label: 'New node',
        id: 'http://test.com/node',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
        },
        rdfsLabel: 'New node',
      }
    }
  ],
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
