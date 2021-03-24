import highlightStructuredSearchElement from '../../../utils/structuredSearch/highlightStructuredSearchElement'
import store from '../../../store'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

const updateStoreValue = jest.fn()

const fit = jest.fn()
const focus = jest.fn()
const network = {
  fit,
  focus
}

describe('highlightStructuredSearchElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update node', async () => {
    getNode.mockImplementationOnce(() => ({
      color: {}
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      structuredSelection: {
        12: {
          type: 'node'
        },
        111: {
          type: 'edge'
        },
      },
      structuredSelectedElement: '12',
      network,
      globalEdgeStyling: {
        stylingEdgeLineColorHighlight: '#000',
      },
      globalNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#000',
      },
      userDefinedEdgeStyling: {
        stylingEdgeLineColorHighlight: '#000',
      },
      userDefinedNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#000',
      },
    }))

    await highlightStructuredSearchElement({
      updateStoreValue
    })

    expect(updateNodes).toHaveBeenCalledWith(
      { color: { background: '#000' }, id: '12' }
    )
    expect(updateStoreValue).toHaveBeenCalledWith(['structuredPrevSelectedElement'], OPERATION_TYPE_UPDATE, {
      color: {
        background: '#000',
      },
    })
    expect(focus).toHaveBeenCalledWith('12', { animation: true, scale: 2 })
  })

  it('should update edge', async () => {
    getEdge.mockImplementationOnce(() => ({
      color: {},
      id: '111',
      from: '1'
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      structuredSelection: {
        12: {
          type: 'node'
        },
        111: {
          type: 'edge'
        },
      },
      structuredSelectedElement: '111',
      globalEdgeStyling: {
        stylingEdgeLineColorHighlight: '#000',
      },
      globalNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#000',
      },
      userDefinedEdgeStyling: {
        stylingEdgeLineColorHighlight: '#000',
      },
      userDefinedNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#000',
      },
      objectPropertiesFromApi,
      network
    }))

    await highlightStructuredSearchElement({
      updateStoreValue
    })

    expect(updateEdges).toHaveBeenCalledWith(
      {
        color: { color: '#000' }, id: '111', width: 3,
      }
    )
    expect(updateStoreValue).toHaveBeenCalledWith(['structuredPrevSelectedElement'], OPERATION_TYPE_UPDATE,
      { color: { color: '#000' }, id: '111', from: '1' })
    expect(focus).toHaveBeenCalledWith(
      '1', { animation: true, scale: 1 }
    )
  })
})
