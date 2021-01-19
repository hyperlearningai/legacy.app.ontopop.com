import {
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  HOVER_NODE_BORDER,
  NODE_BACKGROUND,
  NODE_BORDER,
  EDGE_COLOR,
  NODE_FONT,
} from '../constants/graph'

/**
 * Get visjs visualisation options
 * @param  {Object}   params
 * @param  {Boolean}  params.physicsHierarchicalView   hierarchical view flag
 * @param  {Boolean}  params.physicsRepulsion          physics repulsion flag
 * @param  {Number}   params.physicsEdgeLength         edge length as integer
 * @return {Object}   output                           VisJs visualisation options
 */
const getPhysicsOptions = ({
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength
}) => ({
  edges: {
    smooth: {
      type: 'cubicBezier', // 'continuous'
      forceDirection: 'none',
      roundness: 0.45,
    },
    arrows: { to: true },
    color: EDGE_COLOR,
    labelHighlightBold: true,
    selectionWidth: 3,
  },
  nodes: {
    font: NODE_FONT,
    shape: 'circle', // ellipse, circle, database, box, text, image, circularImage, diamond, dot, star, triangle, triangleDown, hexagon, square, icon
    color: {
      background: NODE_BACKGROUND,
      border: NODE_BORDER,
      highlight: {
        background: CLICK_NODE_BACKGROUND,
        border: HIGHLIGHT_NODE_BORDER,
      },
      hover: {
        background: HOVER_NODE_BACKGROUND,
        border: HOVER_NODE_BORDER,
      },
    }
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
    hover: true
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
