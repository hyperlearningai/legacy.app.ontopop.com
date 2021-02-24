import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { OwlClasses } from './test-ontology-classes'

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

export const setStoreStateFixture = [
  [
    'edgesConnections',
    {
      'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8': [
        {
          from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        },
      ],
    },
  ],
  [
    'nodesConnections',
    {
      'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': [
        {
          from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
          to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        },
      ],
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': [
        {
          from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
          to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        },
      ],
    },
  ],
  [
    'triplesPerNode',
    {
      'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': [
        {
          from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
          to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        },
      ],
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': [
        {
          from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
          to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        },
      ],
    }
  ],
  [
    'classesFromApi',
    newClassesFromApi,
  ],
  [
    'addedConnections',
    ['http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8']
  ]
]
