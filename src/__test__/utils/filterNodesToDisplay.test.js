import filterNodesToDisplay from '../../utils/filterNodesToDisplay'

const setStoreState = jest.fn()
const classesFromApi = {
  OwlClasses: {
    'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
      rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      rdfsLabel: 'Communication Document',
      skosDefinition: 'Document storing the information conveyed between two or more parties.',
      skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
      skosExample: null,
      owlAnnotationProperties: {
        'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
        'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
        'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.'
      },
      rdfsSubClassOf: [{
        classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
        owlRestriction: null
      }, {
        classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
        owlRestrictio: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          classRdfAbout: 'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
        }
      }]
    },
    'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': {
      rdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      rdfsLabel: 'Programme',
      skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
      skosComment: 'A strategic goal that is achieved through a number of projects.',
      skosExample: 'Develop connectivity between London and Inverness.',
      owlAnnotationProperties: {
        'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Plan',
        'http://www.w3.org/2004/02/skos/core#comment': 'A strategic goal that is achieved through a number of projects.',
        'http://www.w3.org/2004/02/skos/core#example': 'Develop connectivity between London and Inverness.',
        'http://www.w3.org/2004/02/skos/core#definition': 'A collection of projects or tasks undertaken to realise a strategic goal.'
      },
      rdfsSubClassOf: [{
        classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
          classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6'
        }
      }, {
        classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
          classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g'
        }
      }, {
        classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU',
          classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8'
        }
      }, {
        classRdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
        owlRestriction: {
          objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
          classRdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf'
        }
      }, {
        classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
        owlRestriction: null
      }]
    },
  }
}

describe('filterNodesToDisplay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when filter on', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
    ]

    const searchFilter = 'prog'

    await filterNodesToDisplay({
      classesFromApi,
      setStoreState,
      searchFilter
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'nodesIdsToDisplay', nodesIdsToDisplay
    )
  })

  it('should work correctly when no filter', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
    ]

    const searchFilter = ''

    await filterNodesToDisplay({
      classesFromApi,
      setStoreState,
      searchFilter
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'nodesIdsToDisplay', nodesIdsToDisplay
    )
  })
})
