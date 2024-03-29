import store from '../../store'

/**
 * Get visjs visualisation options
 * @return {Object}   output                           VisJs visualisation options
 */
const getPhysicsOptions = () => {
  const {
    isPhysicsOn,
    physicsHierarchicalView,
    physicsRepulsion,
    globalNodeStyling,
    globalEdgeStyling,
  } = store.getState()

  const {
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeTextFontSize,
    stylingNodeTextColor,
    stylingNodeTextFontAlign,
    stylingNodeShape,
    stylingNodeBackgroundColor,
    stylingNodeBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeSize
  } = globalNodeStyling

  const {
    stylingEdgeLineColor,
    stylingEdgeLineColorHover,
    stylingEdgeLineColorHighlight,
    stylingEdgeLineStyle,
    stylingEdgeTextColor,
    stylingEdgeTextSize,
    stylingEdgeTextAlign,
    stylingEdgeWidth,
    stylingEdgeLength,
  } = globalEdgeStyling

  const edges = {
    smooth: {
      type: 'cubicBezier', //'cubicBezier', // 'continuous'
      forceDirection: 'none',
      roundness: 0.45,
      enabled: true //false
    },
    physics: true, //false,
    arrows: { to: true },
    color: {
      color: stylingEdgeLineColor,
      highlight: stylingEdgeLineColorHighlight,
      hover: stylingEdgeLineColorHover,
      inherit: 'from',
      opacity: 1.0
    },
    font: {
      color: stylingEdgeTextColor,
      size: stylingEdgeTextSize,
      align: stylingEdgeTextAlign
    },
    labelHighlightBold: true,
    selectionWidth: 3,
    width: stylingEdgeWidth,
    dashes: stylingEdgeLineStyle
  }

  const nodes = {
    borderWidth: stylingNodeBorder,
    borderWidthSelected: stylingNodeBorderSelected,
    font: {
      size: stylingNodeTextFontSize,
      color: stylingNodeTextColor,
      align: stylingNodeTextFontAlign,
      face: 'Inter',
      bold: '700'
    },
    shape: stylingNodeShape,
    color: {
      background: stylingNodeBackgroundColor,
      border: stylingNodeBorderColor,
      highlight: {
        background: stylingNodeHighlightBackgroundColor,
        border: stylingNodeHighlightBorderColor,
      },
      hover: {
        background: stylingNodeHoverBackgroundColor,
        border: stylingNodeHoverBorderColor,
      },
    },
    size: stylingNodeSize
  }

  return ({
    edges,
    nodes,
    autoResize: true,
    layout: {
      hierarchical: {
        enabled: physicsHierarchicalView,
        sortMethod: 'hubsize', // 'directed'
        levelSeparation: stylingEdgeLength / 2,
        nodeSpacing: stylingEdgeLength,
        treeSpacing: 115,
      },
      randomSeed: 333,
      improvedLayout: false, // true,
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
    physics: isPhysicsOn ? {
      enabled: !physicsHierarchicalView,
      hierarchicalRepulsion: {
        centralGravity: 0.5,
        springLength: 120,
        springConstant: 0.1,
        nodeDistance: stylingEdgeLength,
        damping: 0.12,
      },
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: 230,
        springConstant: 0.18,
        avoidOverlap: 1.5
      },
      barnesHut: {
        gravitationalConstant: -2000,
        centralGravity: 0.5,
        springLength: stylingEdgeLength,
        springConstant: 0.1,
        damping: 0.19,
        avoidOverlap: 0.16,
      },
      minVelocity: 0.75,
      maxVelocity: 146,
      timestep: 0.5,
      solver: physicsRepulsion ? 'hierarchicalRepulsion' : 'barnesHut', //'repulsion', //'forceAtlas2Based', //'barnesHut',
      stabilization: {
        enabled: true,
        iterations: 2000, //1000, //2000,
        updateInterval: 25,
      },
    } : false,
  })
}

export default getPhysicsOptions