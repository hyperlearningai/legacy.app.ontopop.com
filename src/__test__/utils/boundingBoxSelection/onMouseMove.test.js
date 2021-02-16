import onMouseMove from '../../../utils/boundingBoxSelection/onMouseMove'
import store from '../../../store'

const setStoreState = jest.fn()

describe('onMouseMove', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when isBoundingBoxDrawable is false', async () => {
    const e = {
      offsetX: 100,
      offsetY: 100,
    }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {},
      isBoundingBoxDrawable: false,
    }))

    await onMouseMove({
      e,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when isBoundingBoxDrawable is true and offset > fixedPoint', async () => {
    const e = {
      offsetX: 100,
      offsetY: 100,
    }
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {
        fixedPointX: 20,
        fixedPointY: 20,
      },
      isBoundingBoxDrawable: true,
    }))

    await onMouseMove({
      e,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith('boundingBoxGeometry',
      {
        boundingBoxHeight: 80, boundingBoxPosX: 20, boundingBoxPosY: 20, boundingBoxWidth: 80, fixedPointX: 20, fixedPointY: 20
      })
  })

  it('should work correctly when isBoundingBoxDrawable is true and offset < fixedPoint', async () => {
    const e = {
      offsetX: 100,
      offsetY: 100,
    }
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {
        fixedPointX: 120,
        fixedPointY: 120,
      },
      isBoundingBoxDrawable: true,
    }))

    await onMouseMove({
      e,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith('boundingBoxGeometry',
      {
        boundingBoxHeight: 20, boundingBoxPosX: 100, boundingBoxPosY: 100, boundingBoxWidth: 20, fixedPointX: 120, fixedPointY: 120
      })
  })
})
