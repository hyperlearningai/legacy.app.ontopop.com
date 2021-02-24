import setAnnotationProperties from '../../../utils/apiCalls/setAnnotationProperties'

const setStoreState = jest.fn()

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

    await setAnnotationProperties({
      setStoreState,
      nodes
    })

    expect(setStoreState).toHaveBeenLastCalledWith(
      'annotationProperties',
      [{
        label: 'Business Area',
        value: 'Business Area'
      }, {
        label: 'rdfAbout',
        value: 'rdfAbout'
      }, {
        label: 'rdfsLabel',
        value: 'rdfsLabel'
      }, {
        label: 'skosComment',
        value: 'skosComment'
      }, {
        label: 'skosDefinition',
        value: 'skosDefinition'
      }, {
        label: 'skosExample',
        value: 'skosExample'
      }]
    )
  })
})
