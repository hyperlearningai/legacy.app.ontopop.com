export const NODE_BACKGROUND = '#adefd1' // 'adefd1' // '03a9f4' // '2B7CE9',
export const NODE_BORDER = '#011e41' // 'D2E5FF',
export const NODE_BORDER_WIDTH = 1
export const CLICK_NODE_BACKGROUND = '#abd6df'
export const HIGHLIGHT_NODE_BACKGROUND = '#ffe715'
export const HIGHLIGHT_NODE_BORDER = '#009688'
export const HOVER_NODE_BACKGROUND = '#f2f2f2'
export const HOVER_NODE_BORDER = '#607d8b'
export const SELECTED_NODE_COLOR = '#ff6f61'
export const SPIDERABLE_NODE_BORDER_COLOR = '#ff6f61'
export const SPIDERABLE_NODE_BORDER_WIDTH = 2
export const NODE_TEXT_COLOR = '#000000'
export const NODE_DEFAULT_SHAPE = 'circle'
export const EDGE_COLOR = '#070b11'
export const EDGE_COLOR_SELECTED = '#03a9f4'
export const EDGE_COLOR_HIGHLIGHTED = '#9c27b0'

export const NODE_FONT = {
  size: 12,
  color: 'black',
  face: 'Montserrat',
  bold: '700'
}

export const SUB_CLASS_OF_ID = 'http://www.w3.org/2000/01/rdf-schema#subclassof'
export const SUB_CLASS_OF_LABEL = 'subClassOf'

export const SUB_CLASS_OF_OBJECT = {
  id: SUB_CLASS_OF_ID,
  label: SUB_CLASS_OF_LABEL,
  value: SUB_CLASS_OF_ID
}

export const LOW_LEVEL_PROPERTIES = [
  'rdfAbout',
  'rdfsLabel',
  'skosDefinition',
  'skosComment'
]

export const MINIMAL_LOW_LEVEL_PROPERTIES = [
  'rdfAbout',
  'rdfsLabel',
]

export const REQUIRED_PROPERTIES = [
  'rdfAbout',
]

export const UNIQUE_PROPERTY = 'rdfAbout'
export const LABEL_PROPERTY = 'rdfsLabel'
export const SUBCLASSOF_PROPERTY = 'rdfsSubClassOf'
export const OWL_ANNOTATION_PROPERTIES = 'owlAnnotationProperties'
export const OWL_RESTRICTION = 'owlRestriction'

export const REQUIRED_PREDICATES = [
  'rdfsSubClassOf',
  'http://www.w3.org/2000/01/rdf-schema#subclassof',
  'http://www.w3.org/2002/07/owl#topObjectProperty'
]

export const GRAPH_VERSION_STRUCTURE = {
  classesFromApi: {},
  objectPropertiesFromApi: {},
  classesFromApiBackup: {},
  objectPropertiesFromApiBackup: {},
  deletedNodes: [],
  addedNodes: [],
  updatedNodes: [],
  deletedEdges: [],
  addedEdges: [],
  updatedEdges: [],
  deletedConnections: [],
  addedConnections: [],
}

export const PROPERTIES_TO_IGNORE = [
  'id',
  'label',
  'x',
  'y'
]
