import { DataSet } from 'vis-data'
import getNodesFromBoundingBox from '../../../utils/canvasUtils/getNodesFromBoundingBox'
import store from '../../../store'
import clearNodesSelection from '../../../utils/canvasUtils/clearNodesSelection'

const setStoreState = jest.fn()
jest.mock('../../../utils/canvasUtils/clearNodesSelection')

describe('getNodesFromBoundingBox', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodes', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {
        fixedPointX: 100,
        fixedPointY: 100,
        boundingBoxPosX: 100,
        boundingBoxPosY: 100,
        boundingBoxWidth: 200,
        boundingBoxHeight: 200
      },
      isBoundingBoxSelectionInternal: false,
      availableNodesNormalised: {},
      network: {
        getPosition: () => ({
          x: 50,
          y: 50
        }),
        canvasToDOM: () => ({
          x: 50,
          y: 50
        }),
        availableNodes: new DataSet()
      }

    }))

    await getNodesFromBoundingBox({
      setStoreState
    })

    expect(clearNodesSelection).toHaveBeenCalled()
    expect(setStoreState).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when nodes inside box', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {
        fixedPointX: 100,
        fixedPointY: 100,
        boundingBoxPosX: 100,
        boundingBoxPosY: 100,
        boundingBoxWidth: 200,
        boundingBoxHeight: 200
      },
      isBoundingBoxSelectionInternal: true,
      availableNodesNormalised: {
        'node-123': {
          id: 'node-123'
        }
      },
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
      availableNodes: new DataSet({
        id: 'node-123'
      })
    }))

    await getNodesFromBoundingBox({
      setStoreState
    })

    expect(clearNodesSelection).toHaveBeenCalled()
    expect(setStoreState).toHaveBeenCalledWith(
      'selectedBoundingBoxNodes',
      ['node-123']
    )
  })

  it('should work correctly when nodes outside box', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {
        fixedPointX: 100,
        fixedPointY: 100,
        boundingBoxPosX: 100,
        boundingBoxPosY: 100,
        boundingBoxWidth: 200,
        boundingBoxHeight: 200
      },
      isBoundingBoxSelectionInternal: false,
      availableNodesNormalised: {
        'node-123': {
          id: 'node-123'
        }
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
      },
      availableNodes: new DataSet({
        id: 'node-123'
      })

    }))

    await getNodesFromBoundingBox({
      setStoreState
    })

    expect(clearNodesSelection).toHaveBeenCalled()
    expect(setStoreState).toHaveBeenCalledWith(
      'selectedBoundingBoxNodes',
      ['node-123']
    )
  })
})
