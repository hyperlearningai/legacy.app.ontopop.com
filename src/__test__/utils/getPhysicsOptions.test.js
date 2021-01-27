import getPhysicsOptions from '../../utils/getPhysicsOptions'

describe('getPhysicsOptions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no physics', () => {
    const physicsHierarchicalView = true
    const physicsRepulsion = false
    const physicsEdgeLength = 10
    const isPhysicsOn = false

    expect(getPhysicsOptions({
      isPhysicsOn,
      physicsHierarchicalView,
      physicsRepulsion,
      physicsEdgeLength
    })).toEqual({
      autoResize: true,
      edges: {
        arrows: {
          to: true
        },
        color: '#070b11',
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier'
        },
        labelHighlightBold: true,
        selectionWidth: 3,
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
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 5,
          nodeSpacing: 10,
          sortMethod: 'hubsize',
          treeSpacing: 115
        },
        improvedLayout: false,
        randomSeed: 333
      },
      interaction: {
        navigationButtons: true,
        keyboard: true,
        hideEdgesOnDrag: true,
        hover: true
      },
      physics: false
    })
  })

  it('should work correctly', () => {
    const physicsHierarchicalView = true
    const physicsRepulsion = false
    const physicsEdgeLength = 10
    const isPhysicsOn = true

    expect(getPhysicsOptions({
      isPhysicsOn,
      physicsHierarchicalView,
      physicsRepulsion,
      physicsEdgeLength
    })).toEqual({
      autoResize: true,
      edges: {
        arrows: {
          to: true
        },
        color: '#070b11',
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier'
        },
        labelHighlightBold: true,
        selectionWidth: 3,
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
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 5,
          nodeSpacing: 10,
          sortMethod: 'hubsize',
          treeSpacing: 115
        },
        improvedLayout: false,
        randomSeed: 333
      },
      interaction: {
        navigationButtons: true,
        keyboard: true,
        hideEdgesOnDrag: true,
        hover: true
      },
      physics: {
        barnesHut: {
          avoidOverlap: 0.16,
          centralGravity: 0.5,
          damping: 0.19,
          gravitationalConstant: -2000,
          springConstant: 0.1,
          springLength: 10
        },
        enabled: false,
        hierarchicalRepulsion: {
          centralGravity: 0.5,
          damping: 0.12,
          nodeDistance: 10,
          springConstant: 0.1,
          springLength: 120
        },
        minVelocity: 0.75,
        solver: 'barnesHut',
        stabilization: {
          enabled: true,
          iterations: 2000,
          updateInterval: 25
        }
      }
    })
  })
})
