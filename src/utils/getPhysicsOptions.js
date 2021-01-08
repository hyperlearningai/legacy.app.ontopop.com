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
    color: '#070b11'
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
