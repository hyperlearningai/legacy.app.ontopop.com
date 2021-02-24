import setClassesFromApi from '../../../utils/apiCalls/setClassesFromApi'

const setStoreState = jest.fn()

describe('setClassesFromApi', () => {
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
        label: 'class',
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

    await setClassesFromApi({
      setStoreState,
      nodes
    })

    expect(setStoreState.mock.calls).toEqual(
      [['classesFromApi', {
        1: {
          'Business Area': 'Communications',
          id: '1',
          label: 'Communication Document',
          nodeId: 1,
          rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          rdfsLabel: 'Communication Document',
          skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          skosDefinition: 'Document storing the information conveyed between two or more parties.',
          userDefined: false
        },
        2: {
          'Business Area': 'Maintain Plan',
          id: '2',
          label: 'Programme',
          nodeId: 2,
          rdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          rdfsLabel: 'Programme',
          skosComment: 'A strategic goal that is achieved through a number of projects.',
          skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
          skosExample: 'Develop connectivity between London and Inverness.',
          userDefined: false
        }
      }],
      ['classesFromApiBackup', {
        1: {
          'Business Area': 'Communications',
          id: '1',
          label: 'Communication Document',
          nodeId: 1,
          rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          rdfsLabel: 'Communication Document',
          skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          skosDefinition: 'Document storing the information conveyed between two or more parties.',
          userDefined: false
        },
        2: {
          'Business Area': 'Maintain Plan',
          id: '2',
          label: 'Programme',
          nodeId: 2,
          rdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          rdfsLabel: 'Programme',
          skosComment: 'A strategic goal that is achieved through a number of projects.',
          skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
          skosExample: 'Develop connectivity between London and Inverness.',
          userDefined: false
        }
      }]]
    )
  })
})
