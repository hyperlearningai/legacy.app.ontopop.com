import {
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  HOVER_NODE_BORDER,
  NODE_BACKGROUND,
  NODE_BORDER,
  EDGE_COLOR,
  NODE_FONT,
  EDGE_COLOR_HIGHLIGHTED,
} from '../constants/graph'

/**
 * Get visjs visualisation options
 * @param  {Object}   params
 * @param  {Boolean}  params.physicsHierarchicalView   hierarchical view flag
 * @param  {Boolean}  params.physicsRepulsion          physics repulsion flag
 * @param  {Number}   params.physicsEdgeLength         edge length as integer
 * @param  {Number}   params.physicsEdgeWidth          edge width as integer
 * @param  {Boolean}  params.physicsEdgeLineStyle      physics edge line style as flag
 * @param  {String}   params.physicsEdgeLineColor      edge line colour as string
 * @param  {String}   params.physicsEdgeLineColorHover      edge line colour as string
 * @param  {String}   params.physicsEdgeLineColorHighlight      edge line colour as string
 * @param  {string}   params.physicsNodeShape          node shape as string
 * @param  {Number}   params.physicsNodeSize           node size as integer
 * @param  {Number}   params.physicsNodeBorder         node border width as integer
 * @param  {Number}   params.physicsNodeBorderSelected node border selected width as integer
 * @param  {String}   params.physicsNodeBorderColor node border colour as string
 * @param  {String}   params.physicsNodeBackgroundColor node border colour as string
 * @param  {String}   params.physicsNodeTextColor node text colour as string
 * @param  {String}   params.physicsNodeHighlightBorderColor node border colour as string
 * @param  {String}   params.physicsNodeHighlightBackgroundColor node border colour as string
 * @return {Object}   output                           VisJs visualisation options
 */
const getPhysicsOptions = ({
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  physicsEdgeWidth,
  physicsEdgeLineStyle,
  physicsEdgeLineColor,
  physicsEdgeLineColorHover,
  physicsEdgeLineColorHighlight,
  physicsNodeShape,
  physicsNodeSize,
  physicsNodeBorder,
  physicsNodeBorderSelected,
  physicsNodeBorderColor,
  physicsNodeBackgroundColor,
  physicsNodeTextColor,
  physicsNodeHighlightBorderColor,
  physicsNodeHighlightBackgroundColor
}) => ({
  edges: {
    smooth: {
      type: 'cubicBezier', // 'continuous'
      forceDirection: 'none',
      roundness: 0.45,
    },
    arrows: { to: true },
    color: {
      color: physicsEdgeLineColor,
      highlight: physicsEdgeLineColorHighlight,
      hover: physicsEdgeLineColorHover,
      inherit: 'from',
      opacity: 1.0
    },
    labelHighlightBold: true,
    selectionWidth: 3,
    width: physicsEdgeWidth,
    dashes: physicsEdgeLineStyle
  },
  nodes: {
    borderWidth: physicsNodeBorder,
    borderWidthSelected: physicsNodeBorderSelected,
    font: {
      size: 12,
      color: `#${physicsNodeTextColor}`,
      face: 'Montserrat',
      bold: '700'
    },
    shape: physicsNodeShape, // ellipse, circle, database, box, text, image, circularImage, diamond, dot, star, triangle, triangleDown, hexagon, square, icon
    color: {
      background: `#${physicsNodeBackgroundColor}`,
      border: `#${physicsNodeBorderColor}`,
      highlight: {
        background: `#${physicsNodeHighlightBackgroundColor}`,
        border: `#${physicsNodeHighlightBorderColor}`,
      },
      hover: {
        background: HOVER_NODE_BACKGROUND,
        border: HOVER_NODE_BORDER,
      },
    },
    size: physicsNodeSize
  },
  autoResize: true,
  layout: {
    hierarchical: {
      enabled: physicsHierarchicalView,
      sortMethod: 'hubsize', // 'directed'
      levelSeparation: physicsEdgeLength / 2,
      nodeSpacing: physicsEdgeLength,
      treeSpacing: 115,
    },
    randomSeed: 333,
    improvedLayout: false,
  },
  interaction: {
    navigationButtons: true,
    keyboard: true,
    hideEdgesOnDrag: true,
    hover: true,
    // dragNodes: false, // do not allow dragging nodes
    // zoomView: false, // do not allow zooming
    // dragView: false // do not allow dragging
  },
  physics: {
    enabled: !physicsHierarchicalView,
    hierarchicalRepulsion: {
      centralGravity: 0.5,
      springLength: 120,
      springConstant: 0.1,
      nodeDistance: physicsEdgeLength,
      damping: 0.12,
    },
    barnesHut: {
      gravitationalConstant: -2000,
      centralGravity: 0.5,
      springLength: physicsEdgeLength,
      springConstant: 0.1,
      damping: 0.19,
      avoidOverlap: 0.16,
    },
    minVelocity: 0.75,
    solver: physicsRepulsion ? 'hierarchicalRepulsion' : 'barnesHut',
    stabilization: {
      enabled: true,
      iterations: 2000,
      updateInterval: 25,
    },
  },
})

export default getPhysicsOptions