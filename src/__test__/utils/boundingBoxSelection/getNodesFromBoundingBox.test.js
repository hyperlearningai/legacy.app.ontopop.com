import getNodesFromBoundingBox from '../../../utils/boundingBoxSelection/getNodesFromBoundingBox'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('getNodesFromBoundingBox', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodes', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      boundingBoxGeometry: {
        fixedPointX: 100,
        fixedPointY: 100,
        boundingBoxPosX: 100,
        boundingBoxPosY: 100,
        boundingBoxWidth: 200,
        boundingBoxHeight: 200
      },
      isBoundingBoxSelectionInternal: false,
      globalNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#ffff00',
      },
      userDefinedNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#ffff00',
      },
      network: {
        getPosition: () => ({
          x: 50,
          y: 50
        }),
        canvasToDOM: () => ({
          x: 50,
          y: 50
        }),
      }
    }))

    getNode.mockImplementationOnce(() => ([]))

    await getNodesFromBoundingBox({
      updateStoreValue
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['selectedBoundingBoxNodes'], OPERATION_TYPE_UPDATE, []], [['selectedBoundingBoxNodes'], OPERATION_TYPE_UPDATE, []]]
    )
  })

  it('should work correctly when nodes', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      boundingBoxGeometry: {
        fixedPointX: 100,
        fixedPointY: 100,
        boundingBoxPosX: 100,
        boundingBoxPosY: 100,
        boundingBoxWidth: 200,
        boundingBoxHeight: 200
      },
      isBoundingBoxSelectionInternal: true,
      network: {
        getPosition: () => ({
          x: 200,
          y: 200
        }),
        canvasToDOM: () => ({
          x: 200,
          y: 200
        }),
      },
      globalNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#ffff00',
      },
      userDefinedNodeStyling: {
        stylingNodeHighlightBackgroundColor: '#ffff00',
      }
    }))

    getNode.mockImplementationOnce(() => ([{
      id: '123'
    }, {
      id: '234'
    }]))

    await getNodesFromBoundingBox({
      updateStoreValue
    })

    expect(updateNodes.mock.calls).toEqual(
      [[{
        color: {
          background: '#ffff00',
        },
        id: '123'
      }], [{
        color: {
          background:
      '#ffff00',
        },
        id: '234'
      }]]
    )
    expect(updateStoreValue).toHaveBeenCalledWith(
      ['selectedBoundingBoxNodes'], OPERATION_TYPE_UPDATE, [{ id: '123' }, { id: '234' }]

    )
  })
})
