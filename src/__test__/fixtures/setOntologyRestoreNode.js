/* eslint max-len:0 */
import { OwlClasses } from './test-ontology-classes'
import { OwlObjectProperties } from './test-ontology-object-properties'

const deletedNodes = Object.keys(OwlClasses).slice(2, 4)

const newClassesFromApi = JSON.parse(JSON.stringify(OwlClasses))

deletedNodes.map((nodeId) => {
  delete newClassesFromApi[nodeId]
  return true
})

newClassesFromApi['http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8'] = {
  owlAnnotationProperties: {
    'http://www.w3.org/2004/02/skos/core#definition': 'Design (for programmers) that further exposes logical detailed Design of each of the elements present in the High Level Design.',
  },
  rdfAbout: 'http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8',
  rdfsLabel: 'Low Level Design',
  rdfsSubClassOf: [
    {
      classRdfAbout: 'http://webprotege.stanford.edu/R9WIxkbvxYbhp8NthzYsXSx',
      owlRestriction: null,
    },
  ],
  skosComment: null,
  skosDefinition: 'Design (for programmers) that further exposes logical detailed Design of each of the elements present in the High Level Design.',
  skosExample: null,
}

newClassesFromApi['http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf'] = {
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
}

const idLabelsToRemove = [
  'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
  'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
  'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
  'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
]

const newClassesFromApiBackup = JSON.parse(JSON.stringify(OwlClasses))
idLabelsToRemove.map((id) => {
  delete newClassesFromApiBackup[id].id
  delete newClassesFromApiBackup[id].label
  return true
})

export const addToObjectFixture = {
  addedNodes: [],
  classesFromApi: newClassesFromApi,
  classesFromApiBackup: newClassesFromApiBackup,
  deletedNodes: [
    'http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8',
    'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
  ],
  objectPropertiesFromApi: OwlObjectProperties,
  objectPropertiesFromApiBackup: OwlObjectProperties,
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
}

export const setStoreStateFixture = [
  [
    'classesFromApi',
    newClassesFromApi,
  ],
  [
    'deletedNodes',
    [
      'http://webprotege.stanford.edu/R1AD8Bb0IbQzZYE0Ee9Qa8',
      'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf',
    ],
  ],
]
