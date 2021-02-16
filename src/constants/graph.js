export const NODE_BACKGROUND = '#adefd1' // 'adefd1' // '03a9f4' // '2B7CE9',
export const NODE_BORDER = '#011e41' // 'D2E5FF',
export const NODE_BORDER_WIDTH = 1
export const CLICK_NODE_BACKGROUND = '#ffed00' // '#abd6df'
export const HIGHLIGHT_NODE_BACKGROUND = '#ffef00'
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

export const FONT_ALIGNMENT_OPTIONS = [
  { icon: 'pi pi-align-left', value: 'left' },
  { icon: 'pi pi-align-right', value: 'right' },
  { icon: 'pi pi-align-center', value: 'center' },
  { icon: 'pi pi-align-justify', value: 'justify' }
]

export const NODE_SHAPES_AFFECTED_BY_SIZE = [
  'diamond', 'dot', 'star', 'triangle', 'triangleDown', 'hexagon', 'square'
]

export const NODE_SHAPES = [
  ...NODE_SHAPES_AFFECTED_BY_SIZE,
  'ellipse',
  'circle',
  'database',
  'box',
  'text'
]

export const FILTER_TYPE_OPTIONS = ['contains', 'equal']

export const NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT = {
  property: undefined,
  filterType: 'equal',
  filterValue: '',
  styleType: '',
  styleValue: ''
}

export const SUBCLASS_EDGE_STYLING_DEFAULT_OBJECT = {
  filterType: 'equal',
  filterValue: 'subClassOf',
  styleType: 'stylingEdgeLineStyle',
  styleValue: true,
  property: 'rdfsLabel'
}

export const FONT_ALIGNMENT_TEMPLATE = (option) => <i className={option.icon} />

export const NODE_STYLING_PROPERTIES = {
  stylingNodeSize: {
    type: 'number',
    defaultValue: 25,
    min: 1,
    max: 1000,
    step: 1,
    label: 'stylingNodeSize'
  },
  stylingNodeBorder: {
    type: 'number',
    defaultValue: 1,
    min: 1,
    max: 10,
    step: 0.5,
    label: 'stylingNodeBorder'
  },
  stylingNodeTextColor: {
    type: 'color',
    defaultValue: NODE_TEXT_COLOR.replace('#', ''),
    label: 'stylingNodeTextColor'
  },
  stylingNodeBorderSelected: {
    type: 'number',
    defaultValue: 2,
    min: 1,
    max: 10,
    step: 0.5,
    label: 'stylingNodeBorderSelected'
  },
  stylingNodeBorderColor: {
    type: 'color',
    defaultValue: NODE_BORDER.replace('#', ''),
    label: 'stylingNodeBorderColor'
  },
  stylingNodeBackgroundColor: {
    type: 'color',
    defaultValue: NODE_BACKGROUND.replace('#', ''),
    label: 'stylingNodeBackgroundColor'
  },
  stylingNodeHighlightBorderColor: {
    type: 'color',
    defaultValue: HIGHLIGHT_NODE_BORDER.replace('#', ''),
    label: 'stylingNodeHighlightBorderColor'
  },
  stylingNodeHighlightBackgroundColor: {
    type: 'color',
    defaultValue: CLICK_NODE_BACKGROUND.replace('#', ''),
    label: 'stylingNodeHighlightBackgroundColor'

  },
  stylingNodeHoverBackgroundColor: {
    type: 'color',
    defaultValue: HOVER_NODE_BACKGROUND.replace('#', ''),
    label: 'stylingNodeHoverBackgroundColor'

  },
  stylingNodeHoverBorderColor: {
    type: 'color',
    defaultValue: HOVER_NODE_BORDER.replace('#', ''),
    label: 'stylingNodeHoverBorderColor'
  },
  stylingNodeShape: {
    type: 'dropdown',
    defaultValue: NODE_DEFAULT_SHAPE,
    options: NODE_SHAPES,
    needsI18n: true,
    label: 'stylingNodeShape',
    placeholder: 'nodeShapeInstructions'
  },
  stylingNodeTextFontSize: {
    type: 'number',
    defaultValue: 12,
    min: 1,
    max: 200,
    step: 1,
    label: 'stylingNodeTextFontSize'
  },
  stylingNodeTextFontAlign: {
    type: 'selectButton',
    defaultValue: 'center',
    options: FONT_ALIGNMENT_OPTIONS,
    label: 'stylingNodeTextFontAlign',
    itemTemplate: FONT_ALIGNMENT_TEMPLATE
  },
}

export const EDGE_LINE_STYLE_TEMPLATE = (option) => <i className={option.icon} />

export const EDGE_LINE_STYLE_OPTIONS = [
  { icon: 'pi pi-ellipsis-h', value: true },
  { icon: 'pi pi-minus', value: false }
]

export const EDGE_ALIGNMENT_OPTIONS = ['horizontal', 'top', 'middle', 'bottom']

export const EDGE_STYLING_PROPERTIES = {
  stylingEdgeLength: {
    type: 'number',
    defaultValue: 250,
    min: 1,
    max: 1000,
    step: 1,
    label: 'stylingEdgeLength'
  },
  stylingEdgeWidth: {
    type: 'number',
    defaultValue: 1,
    min: 1,
    max: 20,
    step: 1,
    label: 'stylingEdgeWidth'
  },
  stylingEdgeLineColor: {
    type: 'color',
    defaultValue: EDGE_COLOR.replace('#', ''),
    label: 'stylingEdgeLineColor'
  },
  stylingEdgeLineColorHighlight: {
    type: 'color',
    defaultValue: EDGE_COLOR_HIGHLIGHTED.replace('#', ''),
    label: 'stylingEdgeLineColorHighlight'
  },
  stylingEdgeLineColorHover: {
    type: 'color',
    defaultValue: EDGE_COLOR.replace('#', ''),
    label: 'stylingEdgeLineColorHover'
  },
  stylingEdgeLineStyle: {
    type: 'selectButton',
    defaultValue: false,
    options: EDGE_LINE_STYLE_OPTIONS,
    label: 'stylingEdgeLineStyle',
    itemTemplate: EDGE_LINE_STYLE_TEMPLATE
  },
  stylingEdgeTextSize: {
    type: 'number',
    defaultValue: 1,
    min: 1,
    max: 200,
    step: 1,
    label: 'stylingEdgeTextSize'
  },
  stylingEdgeTextColor: {
    type: 'color',
    defaultValue: CLICK_NODE_BACKGROUND.replace('#', ''),
    label: 'stylingEdgeTextColor'
  },
  stylingEdgeTextAlign: {
    type: 'selectButton',
    defaultValue: 'horizontal',
    options: EDGE_ALIGNMENT_OPTIONS,
    label: 'stylingEdgeTextAlign',
    needsI18n: true,
  },
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
