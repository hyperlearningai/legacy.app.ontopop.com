import resetNodesStyles from '../../../utils/graphVisualisation/resetNodesStyles'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

describe('resetNodesStyles', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeBorder: '#000',
      stylingNodeBorderSelected: '#000',
      stylingNodeTextFontSize: 12,
      stylingNodeTextColor: '#000',
      stylingNodeTextFontAlign: 'center',
      stylingNodeShape: 'circle',
      stylingNodeBackgroundColor: '#000',
      stylingNodeBorderColor: '#000',
      stylingNodeHighlightBackgroundColor: '#000',
      stylingNodeHighlightBorderColor: '#000',
      stylingNodeHoverBackgroundColor: '#000',
      stylingNodeHoverBorderColor: '#000',
      stylingNodeSize: 12
    }))

    getNode.mockImplementationOnce(() => ([{
      id: 'edge-123'
    }]))

    await resetNodesStyles()

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: '#000',
        borderWidthSelected: '#000',
        color: {
          background: '#000',
          border:
          '#000',
          highlight: {
            background: '#000',
            border: '#000'
          },
          hover: {
            background: '#000',
            border: '#000'
          }
        },
        font: {
          align: 'center',
          bold: '700',
          color: '#000',
          face: 'Montserrat',
          size: 12
        },
        id: 'edge-123',
        shape: 'circle',
        size: 12
      }
    )
  })
})
