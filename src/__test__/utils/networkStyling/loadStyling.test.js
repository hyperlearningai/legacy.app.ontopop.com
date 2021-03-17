import loadStyling from '../../../utils/networkStyling/loadStyling'
import getNetworkStyling from '../../../utils/networkStyling/getNetworkStyling'

jest.mock('../../../utils/networkStyling/getNetworkStyling')

describe('loadStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const setStoreState = jest.fn()
    const addNumber = jest.fn()
    const t = jest.fn()

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

    await loadStyling({ setStoreState, addNumber, t })

    expect(setStoreState.mock.calls).toEqual([
      ['globalEdgeStyling', {
        stylingEdgeCaptionProperty: 'rdfsLabel',
        stylingEdgeLength: 250,
        stylingEdgeLineColor: '#070b11',
      }],
      ['globalNodeStyling', {
        stylingNodeBorderColor: '#011e41',
        stylingNodeBorderSelected: 2,
        stylingNodeCaptionProperty: 'rdfsLabel',
      }]
    ])
  })
})
