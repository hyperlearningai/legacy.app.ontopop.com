import updateStylingByProperties from '../../../utils/networkStyling/updateStylingByProperties'
import store from '../../../store'
import {
  NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT
} from '../../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
describe('updateStylingByProperties', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly if edge to delete', async () => {
    const type = 'edge'
    const operation = 'delete'
    const index = 1
    const stylingPropertyObject = {}

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingEdgeByProperty: [
        NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT,
        NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT
      ],
      stylingNodeByProperty: []
    }))

    await updateStylingByProperties({
      type,
      operation,
      index,
      stylingPropertyObject,
      updateStoreValue
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['stylingEdgeByProperty'],
      OPERATION_TYPE_UPDATE,
      [NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT]
    )
  })

  it('should work correctly if node to save', async () => {
    const type = 'node'
    const operation = 'save'
    const index = 0
    const stylingPropertyObject = NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingEdgeByProperty: [],
      stylingNodeByProperty: []
    }))

    await updateStylingByProperties({
      type,
      operation,
      index,
      stylingPropertyObject,
      updateStoreValue
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['stylingNodeByProperty'],
      OPERATION_TYPE_UPDATE,
      [{
        filterType: 'equal', filterValue: '', property: undefined, styleType: '', styleValue: ''
      },
      NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT]
    )
  })

  it('should work correctly if node to save and replacing existing', async () => {
    const type = 'node'
    const operation = 'save'
    const index = 0
    const stylingPropertyObject = {
      ...NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT,
      filterValue: 'test'
    }

    store.getState = jest.fn().mockImplementationOnce(() => ({
      stylingEdgeByProperty: [],
      stylingNodeByProperty: [
        NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT,
      ]
    }))

    await updateStylingByProperties({
      type,
      operation,
      index,
      stylingPropertyObject,
      updateStoreValue
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['stylingNodeByProperty'],
      OPERATION_TYPE_UPDATE,
      [{
        filterType: 'equal', filterValue: 'test', property: undefined, styleType: '', styleValue: ''
      },
      NODE_EDGE_BY_PROPERTY_STYLING_DEFAULT_OBJECT
      ]
    )
  })
})
