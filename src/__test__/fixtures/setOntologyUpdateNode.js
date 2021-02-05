import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'
import { availableNodesNormalised } from './availableNodesNormalised'

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

const newAvailableNodesNormalised = {
  ...availableNodesNormalised,
  'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
    id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
    rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
    rdfsLabel: 'New node',
    skosDefinition: 'Document storing the information conveyed between two or more parties.',
    skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
    skosExample: null,
    owlAnnotationProperties: {
      'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
      'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
      'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    },
    rdfsSubClassOf: [
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
        owlRestriction: null
      },
      {
        classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
        }
      }
    ],
    label: 'New node'
  }
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
    'availableNodesNormalised',
    newAvailableNodesNormalised
  ],

  [
    'updatedNodes',
    ['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY']
  ]
]
