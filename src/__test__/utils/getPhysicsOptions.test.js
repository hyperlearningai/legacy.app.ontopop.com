import getPhysicsOptions from '../../utils/getPhysicsOptions'

describe('getPhysicsOptions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // TODO: Improve test once nodes/edges passed as parameters
  it('should work correctly', () => {
    const physicsHierarchicalView = true
    const physicsRepulsion = false
    const physicsEdgeLength = 10
    const physicsEdgeWidth = 2
    const physicsEdgeLineStyle = false
    const physicsEdgeLineColor = '#070b11'
    const physicsEdgeLineColorHover = '#070b11'
    const physicsEdgeLineColorHighlight = '#ffcc00'
    const physicsNodeShape = 'circle'
    const physicsNodeSize = 25
    const physicsNodeBorder = 1
    const physicsNodeBorderSelected = 2
    const physicsNodeBorderColor = '011e41'
    const physicsNodeBackgroundColor = 'adefd1'
    const physicsNodeTextColor = '000000'
    const physicsNodeHighlightBorderColor = '009688'
    const physicsNodeHighlightBackgroundColor = 'abd6df'

    expect(getPhysicsOptions({
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
    })).toEqual({
      autoResize: true,
      edges: {
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier'
        },
        arrows: {
          to: true
        },
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
        size: physicsNodeSize,
        shape: physicsNodeShape, // ellipse, circle, database, box, text, image, circularImage, diamond, dot, star, triangle, triangleDown, hexagon, square, icon
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
