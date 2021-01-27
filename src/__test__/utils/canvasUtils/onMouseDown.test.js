import onMouseDown from '../../../utils/canvasUtils/onMouseDown'
import store from '../../../store'
import getNodesFromBoundingBox from '../../../utils/canvasUtils/getNodesFromBoundingBox'
import clearNodesSelection from '../../../utils/canvasUtils/clearNodesSelection'

jest.mock('../../../utils/canvasUtils/getNodesFromBoundingBox')
jest.mock('../../../utils/canvasUtils/clearNodesSelection')

const setStoreState = jest.fn()
const e = {
  offsetX: 100,
  offsetY: 100,
}

describe('onMouseDown', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when isBoundingBoxSelectable is false', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {},
      isBoundingBoxDrawable: false,
      isBoundingBoxSelectable: false
    }))

    await onMouseDown({
      e,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when isBoundingBoxDrawableNow is false at start', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {},
      isBoundingBoxDrawable: false,
      isBoundingBoxSelectable: true
    }))

    await onMouseDown({
      e,
      setStoreState
    })

    expect(clearNodesSelection).toHaveBeenCalled()
    expect(setStoreState.mock.calls).toEqual([
      [
        'isBoundingBoxDrawable',
        true,
      ],
      [
        'selectedBoundingBoxNodes',
        [],
      ],
      [
        'boundingBoxGeometry',
        {
          boundingBoxHeight: 0,
          boundingBoxPosX: 100,
          boundingBoxPosY: 100,
          boundingBoxWidth: 0,
          fixedPointX: 100,
          fixedPointY: 100,
        },
      ],
    ])
  })

  it('should work correctly when isBoundingBoxDrawableNow is true at start', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {},
      isBoundingBoxDrawable: true,
      isBoundingBoxSelectable: true
    }))

    await onMouseDown({
      e,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith('isBoundingBoxDrawable', false)
    expect(getNodesFromBoundingBox).toHaveBeenCalledWith({
      setStoreState
    })
  })
})
