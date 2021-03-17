import setUserDefinedNodesStyles from '../../../utils/networkStyling/setUserDefinedNodesStyles'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import {
  CLICK_NODE_BACKGROUND,
  HIGHLIGHT_NODE_BORDER,
  HOVER_NODE_BACKGROUND,
  HOVER_NODE_BORDER,
  LABEL_PROPERTY,
  NODE_BACKGROUND,
  NODE_BORDER,
  NODE_DEFAULT_SHAPE,
  NODE_TEXT_COLOR
} from '../../../constants/graph'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('setUserDefinedNodesStyles', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = '12'

    getNode.mockImplementationOnce(() => ([{
      id: '111',
      rdfsLabel: 'applies to'
    },
    {
      id: '12',
      rdfsLabel: 'linked to'
    }]))

    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi,
      userDefinedNodeStyling: {
        stylingNodeSize: 25,
        stylingNodeBorder: 1,
        stylingNodeTextColor: NODE_TEXT_COLOR,
        stylingNodeBorderSelected: 2,
        stylingNodeBorderColor: NODE_BORDER,
        stylingNodeBackgroundColor: NODE_BACKGROUND,
        stylingNodeHighlightBorderColor: HIGHLIGHT_NODE_BORDER,
        stylingNodeHighlightBackgroundColor: CLICK_NODE_BACKGROUND,
        stylingNodeHoverBackgroundColor: HOVER_NODE_BACKGROUND,
        stylingNodeHoverBorderColor: HOVER_NODE_BORDER,
        stylingNodeShape: NODE_DEFAULT_SHAPE,
        stylingNodeTextFontSize: 12,
        stylingNodeTextFontAlign: 'center',
        stylingNodeCaptionProperty: LABEL_PROPERTY,
        stylingNodeOverlayOpacity: 0.1,
      }
    }))

    await setUserDefinedNodesStyles({
      nodeId
    })

    expect(updateNodes.mock.calls).toEqual(
      [
        [
          {
            borderWidth: 1,
            borderWidthSelected: 2,
            color: {
              background: '#adefd1',
              border: '#011e41',
              highlight: {
                background: '#ffed00',
                border: '#009688',
              },
              hover: {
                background: '#f2f2f2',
                border: '#607d8b',
              },
            },
            font: {
              align: 'center',
              bold: '700',
              color: '#000000',
              face: 'Montserrat',
              size: 12,
            },
            id: '111',
            label: 'Schedule\nof\nRates',
            rdfsLabel: 'applies to',
            shape: 'circle',
            size: 25,
          },
        ],
        [
          {
            borderWidth: 1,
            borderWidthSelected: 2,
            color: {
              background: '#adefd1',
              border: '#011e41',
              highlight: {
                background: '#ffed00',
                border: '#009688',
              },
              hover: {
                background: '#f2f2f2',
                border: '#607d8b',
              },
            },
            font: {
              align: 'center',
              bold: '700',
              color: '#000000',
              face: 'Montserrat',
              size: 12,
            },
            id: '12',
            label: 'Maintenance',
            rdfsLabel: 'linked to',
            shape: 'circle',
            size: 25,
          },
        ],
      ]
    )
  })
})
