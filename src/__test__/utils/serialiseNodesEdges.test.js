import serialiseNodesEdges from '../../utils/serialiseNodesEdges'
import jsonClasses from '../../assets/json/test-ontology-classes.json'
import jsonObjectProperties from '../../assets/json/test-ontology-object-properties.json'

const setStoreState = jest.fn()
const classesFromApi = jsonClasses
const nodesIdsToDisplay = [
  'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
]
const objectPropertiesFromApi = jsonObjectProperties
const edgesToIgnore = [
  'http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0'
]

describe('serialiseNodesEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // TODO: Improve test once nodes/edges passed as parameters
  it('should work correctly', async () => {
    await serialiseNodesEdges({
      nodesIdsToDisplay,
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState,
      edgesToIgnore
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'availableNodesNormalised',
        {
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
            skosComment: 'A strategic goal that is achieved through a number of projects.',
            skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
            skosExample: 'Develop connectivity between London and Inverness.',
          },
          'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf': {
            id: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
            label: 'External Factor',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Plan',
              'http://www.w3.org/2004/02/skos/core#definition': 'Elements, often part of the economic, political and social environment of the locations where the company operates, that influence the business\' results and performance from the outside.',
              'http://www.w3.org/2004/02/skos/core#example': 'Climate change, big political change, global pandemic',
            },
            rdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
            rdfsLabel: 'External Factor',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0',
                },
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
            ],
            skosComment: null,
            skosDefinition: 'Elements, often part of the economic, political and social environment of the locations where the company operates, that influence the business\' results and performance from the outside.',
            skosExample: 'Climate change, big political change, global pandemic'
          },
          'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8': {
            id: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
            label: 'Role',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine, MIDAS, Options phase, Confirm',
              'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Employee, External Staff, Administrator, Analyst, Internal Customer, Project Manager, Sponsor, User',
              'http://webprotege.stanford.edu/RB4qRK0cMJE67o1Bc9MmGDD': 'GIS RedLine Confirm',
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Operate Design Finance Plan Communications',
              'http://www.w3.org/2004/02/skos/core#definition': 'The function assumed or part played by a person or thing in a particular situation.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
            rdfsLabel: 'Role',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv',
                },
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R7cbyWVOLsYCR1NFY11TBjJ',
                },
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC48Hic1INaQShlkSyb6ZIx',
                },
              },
            ],
            skosComment: null,
            skosDefinition: 'The function assumed or part played by a person or thing in a particular situation.',
            skosExample: null,
          },
          'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': {
            id: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            label: 'Principle',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Outlook/Approach',
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Plan',
              'http://www.w3.org/2004/02/skos/core#definition': 'Foundational statements that are adopted by an organization, department or team to guide future decisions.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            rdfsLabel: 'Principle',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
            ],
            skosComment: null,
            skosDefinition: 'Foundational statements that are adopted by an organization, department or team to guide future decisions.',
            skosExample: null,
          },
          'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g': {
            id: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            label: 'Regulation',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Traffic Regulation Act',
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Design Plan Construct Operate',
              'http://www.w3.org/2004/02/skos/core#definition': 'Rules made by a government or other authority in order to control the way something is done or the way people behave.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            rdfsLabel: 'Regulation',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RCt16VHlp30eNXujyqS0ik9',
                },
              },
            ],
            skosComment: null,
            skosDefinition: 'Rules made by a government or other authority in order to control the way something is done or the way people behave.',
            skosExample: null,
          },
        },
      ],
      [
        'availableNodes',
        [
          {
            id: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            label: 'Principle',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Outlook/Approach',
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Design Plan',
              'http://www.w3.org/2004/02/skos/core#definition': 'Foundational statements that are adopted by an organization, department or team to guide future decisions.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            rdfsLabel: 'Principle',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
            ],
            skosComment: null,
            skosDefinition: 'Foundational statements that are adopted by an organization, department or team to guide future decisions.',
            skosExample: null,
          },
          {
            id: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            label: 'Regulation',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Traffic Regulation Act',
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Design Plan Construct Operate',
              'http://www.w3.org/2004/02/skos/core#definition': 'Rules made by a government or other authority in order to control the way something is done or the way people behave.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            rdfsLabel: 'Regulation',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RCt16VHlp30eNXujyqS0ik9',
                },
              },
            ],
            skosComment: null,
            skosDefinition: 'Rules made by a government or other authority in order to control the way something is done or the way people behave.',
            skosExample: null,
          },
          {
            id: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
            label: 'Role',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'GIS RedLine, MIDAS, Options phase, Confirm',
              'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Employee, External Staff, Administrator, Analyst, Internal Customer, Project Manager, Sponsor, User',
              'http://webprotege.stanford.edu/RB4qRK0cMJE67o1Bc9MmGDD': 'GIS RedLine Confirm',
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Operate Design Finance Plan Communications',
              'http://www.w3.org/2004/02/skos/core#definition': 'The function assumed or part played by a person or thing in a particular situation.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
            rdfsLabel: 'Role',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv',
                },
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/R7cbyWVOLsYCR1NFY11TBjJ',
                },
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/R7YIZpydsaz383PdnJekN8S',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC48Hic1INaQShlkSyb6ZIx',
                },
              },
            ],
            skosComment: null,
            skosDefinition: 'The function assumed or part played by a person or thing in a particular situation.',
            skosExample: null,
          },
          {
            id: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
            label: 'External Factor',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Plan',
              'http://www.w3.org/2004/02/skos/core#definition': 'Elements, often part of the economic, political and social environment of the locations where the company operates, that influence the business\' results and performance from the outside.',
              'http://www.w3.org/2004/02/skos/core#example': 'Climate change, big political change, global pandemic',
            },
            rdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
            rdfsLabel: 'External Factor',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp',
                owlRestriction: {
                  classRdfAbout: 'http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp',
                  objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0',
                },
              },
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
                owlRestriction: null,
              },
            ],
            skosComment: null,
            skosDefinition: 'Elements, often part of the economic, political and social environment of the locations where the company operates, that influence the business\' results and performance from the outside.',
            skosExample: 'Climate change, big political change, global pandemic',
          },
          {
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
            skosComment: 'A strategic goal that is achieved through a number of projects.',
            skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
            skosExample: 'Develop connectivity between London and Inverness.',
          },
        ],
      ],
      [
        'availableEdges',
        [
          {
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            label: 'Governed by',
            to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
          },
          {
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            label: 'Governed by',
            to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
          },
          {
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            label: 'Managed by',
            to: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
          },
          {
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            label: 'Affected by',
            to: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
          },
        ],
      ],
    ])
  })
})