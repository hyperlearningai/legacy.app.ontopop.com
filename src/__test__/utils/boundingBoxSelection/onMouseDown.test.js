import onMouseDown from '../../../utils/boundingBoxSelection/onMouseDown'
import store from '../../../store'
import getNodesFromBoundingBox from '../../../utils/boundingBoxSelection/getNodesFromBoundingBox'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import resetBoundingBoxNodes from '../../../utils/boundingBoxSelection/resetBoundingBoxNodes'

jest.mock('../../../utils/boundingBoxSelection/getNodesFromBoundingBox')
jest.mock('../../../utils/boundingBoxSelection/resetBoundingBoxNodes')

const updateStoreValue = jest.fn()
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
      updateStoreValue
    })

    expect(updateStoreValue).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when isBoundingBoxDrawableNow is false at start', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {},
      isBoundingBoxDrawable: false,
      isBoundingBoxSelectable: true
    }))

    await onMouseDown({
      e,
      updateStoreValue
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['isBoundingBoxDrawable'],
        OPERATION_TYPE_UPDATE,
        true], [
        ['boundingBoxGeometry'],
        OPERATION_TYPE_UPDATE, {
          boundingBoxHeight: 0,
          boundingBoxPosX: 100,
          boundingBoxPosY: 100,
          boundingBoxWidth: 0,
          fixedPointX: 100,
          fixedPointY: 100
        }]]
    )
  })

  it('should work correctly when isBoundingBoxDrawableNow is true at start', async () => {
    store.getState = jest.fn().mockImplementationOnce(() => ({
      boundingBoxGeometry: {},
      isBoundingBoxDrawable: true,
      isBoundingBoxSelectable: true,
      selectedBoundingBoxNodes: ['1']
    }))

    await onMouseDown({
      e,
      updateStoreValue
    })

    expect(resetBoundingBoxNodes).toHaveBeenCalled()
    expect(updateStoreValue).toHaveBeenCalledWith(['isBoundingBoxDrawable'], OPERATION_TYPE_UPDATE, false)
    expect(getNodesFromBoundingBox).toHaveBeenCalledWith({
      updateStoreValue
    })
  })
})
