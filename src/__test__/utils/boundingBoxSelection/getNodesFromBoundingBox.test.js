import getNodesFromBoundingBox from '../../../utils/boundingBoxSelection/getNodesFromBoundingBox'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

const setStoreState = jest.fn()
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
      stylingNodeHighlightBackgroundColor: '#ffff00',
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
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith('selectedBoundingBoxNodes', [])
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
      stylingNodeHighlightBackgroundColor: '#ffff00',
    }))

    getNode.mockImplementationOnce(() => ([{
      id: 'node-123'
    }, {
      id: 'node-234'
    }]))

    await getNodesFromBoundingBox({
      setStoreState
    })

    expect(updateNodes.mock.calls).toEqual(
      [[{
        color: {
          background: '#ffff00',
          color: {}
        },
        id: 'node-123'
      }], [{
        color: {
          background:
      '#ffff00',
          color: {}
        },
        id: 'node-234'
      }]]
    )
    expect(setStoreState).toHaveBeenCalledWith('selectedBoundingBoxNodes', [
      {
        id: 'node-123',
      },
      {
        id: 'node-234',
      },
    ])
  })
})
