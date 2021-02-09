import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

const newClassesFromApi = {
  ...OwlClasses,
  'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
    ...OwlClasses['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'],
    id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
    label: 'Communication\nDocument',
    [SUBCLASSOF_PROPERTY]: [
      ...OwlClasses['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'][SUBCLASSOF_PROPERTY],
      {
        classRdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        owlRestriction: {
          classRdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
        }
      }
    ]
  }
}

newClassesFromApi['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'].id = 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
newClassesFromApi['http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'].label = 'Programme'

const newClassesFromApiBackup = { ...OwlClasses }

newClassesFromApiBackup['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'].id = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
newClassesFromApiBackup['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'].label = 'Communication\nDocument'

export const addToObjectFixture = {
  classesFromApi: newClassesFromApi,
  classesFromApiBackup: newClassesFromApiBackup,
  deletedNodes: [],
  objectPropertiesFromApi: OwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  addedConnections: ['http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedNodes: [],
}

export const setStoreStateFixture = [
  [
    'classesFromApi',
    newClassesFromApi,
  ],
  [
    'addedConnections',
    ['http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M']
  ]
]
