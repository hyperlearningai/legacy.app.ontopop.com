const getPhysicsOptions = ({
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength
}) => ({
  edges: {
    smooth: {
      type: 'cubicBezier',
      forceDirection: 'none',
      roundness: 0.45,
    },
    arrows: { to: true },
    color: '#070b11',
    labelHighlightBold: true,
    selectionWidth: 3,
  },
  nodes: {
    color: {
      background: '#03a9f4', // '#2B7CE9',
      border: '#011e41', // '#D2E5FF',
      highlight: {
        background: '#4caf50',
        border: '#009688',
      },
      hover: {
        background: '#f2f2f2',
        border: '#607d8b',
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
