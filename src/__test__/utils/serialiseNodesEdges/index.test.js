/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import serialiseNodesEdges from '../../../utils/serialiseNodesEdges'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { serialiseNodesEdges1 } from '../../fixtures/serialiseNodesEdges'
import store from '../../../store'
import highlightSpiderableNodes from '../../../utils/highlightSpiderableNodes'

jest.mock('../../../utils/highlightSpiderableNodes')
const setStoreState = jest.fn()

const availableNodes = new DataSet([])
const availableEdges = new DataSet([])
const isNodeOverlay = true
const nodesIdsToDisplay = [
  'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
  'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
  'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
  'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf'
]
const edgesIdsToDisplay = [
  'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
  'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
]
const highlightedNodes = []
const shortestPathResults = []
const classesFromApi = OwlClasses
const objectPropertiesFromApi = OwlObjectProperties
const redraw = jest.fn()
const setOptions = jest.fn()
const network = {
  redraw,
  setOptions
}
const isPhysicsOn = false
const physicsHierarchicalView = true
const physicsRepulsion = false
const physicsEdgeLength = 100

const getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  availableEdges,
  classesFromApi,
  edgesIdsToDisplay,
  highlightedNodes,
  isNodeOverlay,
  network,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  shortestPathResults,
  triplesPerNode,
  isPhysicsOn,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength
}))

store.getState = getState

describe('serialiseNodesEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await serialiseNodesEdges({
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual(serialiseNodesEdges1)
    expect(redraw).toHaveBeenCalled()
    expect(setOptions).toHaveBeenCalledWith({
      autoResize: true,
      edges: {
        arrows: {
          to: true,
        },
        color: '#070b11',
        labelHighlightBold: true,
        selectionWidth: 3,
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier',
        },
      },
      interaction: {
        hideEdgesOnDrag: true,
        hover: true,
        keyboard: true,
        navigationButtons: true,
      },
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 50,
          nodeSpacing: 100,
          sortMethod: 'hubsize',
          treeSpacing: 115,
        },
        improvedLayout: false,
        randomSeed: 333,
      },
      nodes: {
        color: {
          background: '#adefd1',
          border: '#011e41',
          highlight: {
            background: '#abd6df',
            border: '#009688',
          },
          hover: {
            background: '#f2f2f2',
            border: '#607d8b',
          },
        },
        font: {
          bold: '700',
          color: 'black',
          face: 'Montserrat',
          size: 12,
        },
        shape: 'circle',
      },
      physics: false,
    })
    expect(highlightSpiderableNodes).toHaveBeenCalledWith({
      triplesPerNode,
      availableNodes,
      availableNodesNormalised: {
        'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': {
          id: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          label: 'Programme',
          opacity: 0.1,
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
              classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
              owlRestriction: {
                classRdfAbout: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
                objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              },
            },
            {
              classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
              owlRestriction: {
                classRdfAbout: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
                objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
              },
            },
            {
              classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
              owlRestriction: {
                classRdfAbout: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
                objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU',
              },
            },
            {
              classRdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
              owlRestriction: {
                classRdfAbout: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
                objectPropertyRdfAbout: 'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
              },
            },
            {
              classRdfAbout: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
              owlRestriction: null,
            },
          ],
          skosComment: 'A strategic goal that is achieved through a number of projects.',
          skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
          skosExample: 'Develop connectivity between London and Inverness.',
        },
        'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf': {
          id: 'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
          label: 'External\nFactor',
          opacity: 0.1,
          owlAnnotationProperties: {
            'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Plan',
            'http://www.w3.org/2004/02/skos/core#definition': "Elements, often part of the economic, political and social environment of the locations where the company operates, that influence the business' results and performance from the outside.",
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
          skosDefinition: "Elements, often part of the economic, political and social environment of the locations where the company operates, that influence the business' results and performance from the outside.",
          skosExample: 'Climate change, big political change, global pandemic',
        },
        'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': {
          id: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
          label: 'Principle',
          opacity: 0.1,
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
          opacity: 0.1,
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
      nodesConnections: {
        'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': [
          {
            arrows: {
              to: {
                scaleFactor: 0.2,
              },
            },
            dashes: true,
            edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            fromLabel: 'Programme',
            id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            label: 'Governed by',
            to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            toLabel: 'Principle',
            width: 0.2,
          },
          {
            arrows: {
              to: {
                scaleFactor: 0.2,
              },
            },
            dashes: true,
            edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            fromLabel: 'Programme',
            id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            label: 'Governed by',
            to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            toLabel: 'Regulation',
            width: 0.2,
          },
        ],
        'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': [
          {
            arrows: {
              to: {
                scaleFactor: 0.2,
              },
            },
            dashes: true,
            edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            fromLabel: 'Programme',
            id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            label: 'Governed by',
            to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
            toLabel: 'Principle',
            width: 0.2,
          },
        ],
        'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g': [
          {
            arrows: {
              to: {
                scaleFactor: 0.2,
              },
            },
            dashes: true,
            edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
            from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
            fromLabel: 'Programme',
            id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            label: 'Governed by',
            to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
            toLabel: 'Regulation',
            width: 0.2,
          },
        ],
      },
    })
  })
})
