import clearStructuredSearchElement from '../../../utils/structuredSearch/clearStructuredSearchElement'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

describe('clearStructuredSearchElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return if no previous selection', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      userDefinedNodeStyling: {
        stylingNodeBackgroundColor: '#000',
      },
      globalNodeStyling: {
        stylingNodeBackgroundColor: '#000',
      },
      userDefinedEdgeStyling: {
        stylingEdgeLineColor: '#000',
      },
      globalEdgeStyling: {
        stylingEdgeLineColor: '#000',
      },
      structuredPrevSelectedElement: undefined,
      structuredSelection: {}
    }))

    await clearStructuredSearchElement()

    expect(updateEdges).toHaveBeenCalledTimes(0)
    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should updateNodes', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      userDefinedNodeStyling: {
        stylingNodeBackgroundColor: '#000',
      },
      globalNodeStyling: {
        stylingNodeBackgroundColor: '#000',
      },
      userDefinedEdgeStyling: {
        stylingEdgeLineColor: '#000',
      },
      globalEdgeStyling: {
        stylingEdgeLineColor: '#000',
      },
      structuredPrevSelectedElement: {
        id: '12'
      },
      structuredSelection: {
        12: { type: 'node' }
      }
    }))

    await clearStructuredSearchElement()

    expect(updateEdges).toHaveBeenCalledTimes(0)
    expect(updateNodes).toHaveBeenCalledWith(
      { color: { background: '#000' }, id: '12' }
    )
  })

  it('should updateEdges', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      userDefinedNodeStyling: {
        stylingNodeBackgroundColor: '#000',
      },
      globalNodeStyling: {
        stylingNodeBackgroundColor: '#000',
      },
      userDefinedEdgeStyling: {
        stylingEdgeLineColor: '#000',
      },
      globalEdgeStyling: {
        stylingEdgeLineColor: '#000',
      },
      structuredPrevSelectedElement: {
        id: '111'
      },
      structuredSelection: {
        111: { type: 'edge' }
      }
    }))

    await clearStructuredSearchElement()

    expect(updateEdges).toHaveBeenCalledWith(
      { color: { color: '#000' }, id: '111', width: 1 }
    )
    expect(updateNodes).toHaveBeenCalledTimes(0)
  })
})
