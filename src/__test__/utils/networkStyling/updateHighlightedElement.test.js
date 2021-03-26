import updateHighlightedElement from '../../../utils/networkStyling/updateHighlightedElement'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { classesFromApi } from '../../fixtures/classesFromApi'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'
import highlightSelectedNode from '../../../utils/nodesSelection/highlightSelectedNode'
import highlightSelectedEdge from '../../../utils/edgesSelection/highlightSelectedEdge'

const updateStoreValue = jest.fn()
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/networkStyling/setEdgeStyle')
jest.mock('../../../utils/nodesSelection/highlightSelectedNode')
jest.mock('../../../utils/edgesSelection/highlightSelectedEdge')

const commonState = ({
  classesFromApi,
  objectPropertiesFromApi
})

describe('updateHighlightedElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node', async () => {
    const selectedElement = { 12: 'node' }

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      selectedElement,
    }))

    const id = '30'
    const type = 'node'

    await updateHighlightedElement({
      updateStoreValue,
      id,
      type
    })

    expect(setNodeStyle).toHaveBeenCalledWith(
      {
        node: classesFromApi['12']
      }
    )
    expect(highlightSelectedNode).toHaveBeenCalledWith({
      updateStoreValue,
      selectedNode: id
    })
  })

  it('should work correctly when edge', async () => {
    const selectedElement = { 12: 'edge' }

    store.getState = jest.fn().mockImplementation(() => ({
      ...commonState,
      selectedElement,
    }))

    const id = '30'
    const type = 'edge'

    await updateHighlightedElement({
      updateStoreValue,
      id,
      type
    })

    expect(setEdgeStyle).toHaveBeenCalledWith(
      {
        edge: objectPropertiesFromApi['12']
      }
    )
    expect(highlightSelectedEdge).toHaveBeenCalledWith({
      updateStoreValue,
      selectedEdge: id
    })
  })
})
