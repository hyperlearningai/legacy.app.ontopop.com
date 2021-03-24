import loadStyling from '../../../utils/networkStyling/loadStyling'
import getNetworkStyling from '../../../utils/networkStyling/getNetworkStyling'
import store from '../../../store'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

jest.mock('../../../utils/networkStyling/getNetworkStyling')

describe('loadStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const updateStoreValue = jest.fn()
    const t = jest.fn()

    const getState = jest.fn().mockImplementation(() => ({
      globalEdgeStyling: {
        stylingEdgeCaptionProperty: 'ABC',
        newproperty: 'CDE'
      }
    }))
    store.getState = getState

    getNetworkStyling.mockImplementationOnce(() => ({
      globalEdgeStyling: {
        stylingEdgeCaptionProperty: 'rdfsLabel',
        stylingEdgeLength: 250,
        stylingEdgeLineColor: '#070b11'
      },
      globalNodeStyling: {
        stylingNodeBorderColor: '#011e41',
        stylingNodeBorderSelected: 2,
        stylingNodeCaptionProperty: 'rdfsLabel'
      }
    }))

    await loadStyling({ updateStoreValue, t })

    expect(updateStoreValue.mock.calls).toEqual([
      [['globalEdgeStyling'], OPERATION_TYPE_UPDATE, {
        newproperty: 'CDE',
        stylingEdgeCaptionProperty: 'rdfsLabel',
        stylingEdgeLength: 250,
        stylingEdgeLineColor: '#070b11',
      }],
      [['globalNodeStyling'], OPERATION_TYPE_UPDATE, {
        stylingNodeBorderColor: '#011e41',
        stylingNodeBorderSelected: 2,
        stylingNodeCaptionProperty: 'rdfsLabel',
      }]
    ])
  })
})
