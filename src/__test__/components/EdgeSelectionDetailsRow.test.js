import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelectionDetails from '../../components/EdgesSelectionDetails'

const setup = () => {
  const props = {
    connection: {
      from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      predicate: 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM',
      to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
    },
    availableNodesNormalised: {
      'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY': {
        id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        label: 'Communication Document',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Communications',
          'http://www.w3.org/2004/02/skos/core#comment': 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          'http://www.w3.org/2004/02/skos/core#definition': 'Document storing the information conveyed between two or more parties.',
        },
        rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        rdfsLabel: 'Communication Document',
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
            owlRestriction: null,
          },
          {
            classRdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            owlRestriction: {
              classRdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM',
            },
          },
        ],
        skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
        skosDefinition: 'Document storing the information conveyed between two or more parties.',
        skosExample: null,
      },
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': {
        id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        label: 'Programme',
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Plan',
          'http://www.w3.org/2004/02/skos/core#comment': 'A strategic goal that is achieved through a number of projects.',
          'http://www.w3.org/2004/02/skos/core#definition': 'A collection of projects or tasks undertaken to realise a strategic goal.',
          'http://www.w3.org/2004/02/skos/core#example': 'Develop connectivity between London and Inverness.',
        },
        rdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
        rdfsLabel: 'Programme',
        rdfsSubClassOf: [
          {
            classRdfAbout: 'http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8',
            owlRestriction: {
              classRdfAbout: 'http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8',
              objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R4I2v4Y7su3Adf0Vcj6TWd',
            },
          },
        ],
        skosComment: 'A strategic goal that is achieved through a number of projects.',
        skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
        skosExample: 'Develop connectivity between London and Inverness.',
      }
    }
  }

  const component = shallow(<EdgesSelectionDetails {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesSelectionDetails', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
