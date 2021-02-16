import setElementsStyle from '../../../utils/graphVisualisation/setElementsStyle'
import store from '../../../store'
import resetNodesStyles from '../../../utils/graphVisualisation/resetNodesStyles'
import resetEdgesStyles from '../../../utils/graphVisualisation/resetEdgesStyles'
import setHighlightedNodes from '../../../utils/graphVisualisation/setHighlightedNodes'
import styleNodesByProperty from '../../../utils/graphVisualisation/styleNodesByProperty'
import styleEdgesByProperty from '../../../utils/graphVisualisation/styleEdgesByProperty'
import setNodeOverlay from '../../../utils/graphVisualisation/setNodeOverlay'

jest.mock('../../../utils/graphVisualisation/resetNodesStyles')
jest.mock('../../../utils/graphVisualisation/resetEdgesStyles')
jest.mock('../../../utils/graphVisualisation/setHighlightedNodes')
jest.mock('../../../utils/graphVisualisation/setNodeOverlay')
jest.mock('../../../utils/graphVisualisation/styleNodesByProperty')
jest.mock('../../../utils/graphVisualisation/styleEdgesByProperty')

jest.useFakeTimers()

const setStoreState = jest.fn()

describe('setElementsStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      isPhysicsOn: false,
      stylingNodeByProperty: [{
        styleValue: '#000',
        filterValue: 'road',
      }],
      stylingEdgeByProperty: [{
        styleValue: '#000',
        filterValue: 'road',
      }],
    }))

    await setElementsStyle({
      setStoreState
    })

    expect(resetNodesStyles).toHaveBeenCalledWith()
    expect(resetEdgesStyles).toHaveBeenCalledWith()
    expect(setStoreState).toHaveBeenCalledWith(
      'isPhysicsOn', true
    )
    expect(styleNodesByProperty).toHaveBeenCalledWith(
      { property: { filterValue: 'road', styleValue: '#000' } }
    )
    expect(styleEdgesByProperty).toHaveBeenCalledWith(
      { property: { filterValue: 'road', styleValue: '#000' } }
    )
    expect(setHighlightedNodes).toHaveBeenCalledWith()
    expect(setNodeOverlay).toHaveBeenCalledWith()
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 3000
    )
  })
})
