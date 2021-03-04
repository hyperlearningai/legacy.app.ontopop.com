import onMouseDown from '../../../utils/boundingBoxSelection/onMouseDown'
import store from '../../../store'
import getNodesFromBoundingBox from '../../../utils/boundingBoxSelection/getNodesFromBoundingBox'
import resetNodesStyles from '../../../utils/networkStyling/resetNodesStyles'

jest.mock('../../../utils/boundingBoxSelection/getNodesFromBoundingBox')
jest.mock('../../../utils/networkStyling/resetNodesStyles')

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

    expect(setStoreState.mock.calls).toEqual([
      [
        'isBoundingBoxDrawable',
        true,
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

    expect(resetNodesStyles).toHaveBeenCalled()
    expect(setStoreState).toHaveBeenCalledWith('isBoundingBoxDrawable', false)
    expect(getNodesFromBoundingBox).toHaveBeenCalledWith({
      setStoreState
    })
  })
})
