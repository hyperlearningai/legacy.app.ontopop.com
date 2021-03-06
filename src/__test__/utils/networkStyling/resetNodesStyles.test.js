import resetNodesStyles from '../../../utils/networkStyling/resetNodesStyles'
import store from '../../../store'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import { classesFromApi } from '../../fixtures/classesFromApi'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

describe('resetNodesStyles', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      globalNodeStyling: {
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
        stylingNodeSize: 12,
        stylingNodeCaptionProperty: 'rdfsLabel'
      },
      classesFromApi
    }))

    getNode.mockImplementationOnce(() => ([{
      id: '12'
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
        id: '12',
        label: 'Maintenance',
        shape: 'circle',
        size: 12
      }
    )
  })
})
