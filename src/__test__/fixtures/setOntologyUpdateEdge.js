import { OwlClasses } from './test-ontology-classes'
import { objectPropertiesFromApi } from './objectPropertiesFromApi'

const newOwlObjectProperties = {
  ...objectPropertiesFromApi,
  // 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': {
  //   ...OwlObjectProperties['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM'],
  //   label: 'New edge',
  //   owlAnnotationProperties: {
  //     'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': 'Another edge',
  //     'http://webprotege.stanford.edu/RtMeQat8p1tL74b64dS2qs': 'Record',
  //   },
  //   rdfsLabel: 'New edge',
  // },
}

export const addToObjectFixture = {
  classesFromApi: OwlClasses,
  classesFromApiBackup: OwlClasses,
  deletedNodes: [],
  objectPropertiesFromApi: newOwlObjectProperties,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  addedNodes: [],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: ['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM']
}

export const setStoreStateFixture = [
  [
    'objectPropertiesFromApi',
    newOwlObjectProperties
  ],
  [
    'updatedEdges',
    ['http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM']
  ]
]
