import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import setAnnotationProperties from '../../../utils/apiCalls/setAnnotationProperties'
import en from '../../../i18n/en'

const updateStoreValue = jest.fn()
const t = (id) => en[id]

describe('setAnnotationProperties', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return data', async () => {
    const nodes = [
      {
        id: '1',
        label: 'class',
        rdfsLabel: 'Communication Document',
        'Business Area': 'Communications',
        skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
        userDefined: false,
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        skosDefinition: 'Document storing the information conveyed between two or more parties.',
        nodeId: 1
      },
      {
        id: '2',
        label: 'dataset',
        rdfsLabel: 'Programme',
        skosExample: 'Develop connectivity between London and Inverness.',
        'Business Area': 'Maintain Plan',
        skosComment: 'A strategic goal that is achieved through a number of projects.',
        userDefined: false,
        rdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
        nodeId: 2
      },
    ]

    await setAnnotationProperties({
      updateStoreValue,
      nodes,
      t
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['annotationProperties'], OPERATION_TYPE_UPDATE, [{
        label: 'Business Area',
        value: 'Business Area'
      }, {
        label: en.rdfAbout,
        value: 'rdfAbout'
      }, {
        label: en.rdfsLabel,
        value: 'rdfsLabel'
      }, {
        label: en.skosComment,
        value: 'skosComment'
      }, {
        label: en.skosDefinition,
        value: 'skosDefinition'
      }]], [['annotationPropertiesDatasets'], OPERATION_TYPE_UPDATE,
        [{
          label: 'Business Area',
          value: 'Business Area'
        }, { label: en.rdfAbout, value: 'rdfAbout' }, {
          label: en.rdfsLabel,
          value: 'rdfsLabel'
        }, { label: en.skosComment, value: 'skosComment' }, {
          label: en.skosDefinition,
          value: 'skosDefinition'
        }, {
          label: en.skosExample,
          value: 'skosExample'
        }]
      ]]
    )
  })
})
