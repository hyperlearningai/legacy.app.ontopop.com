import { getElementIdAndType } from '../../constants/functions'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import highlightSelectedEdge from '../edgesSelection/highlightSelectedEdge'
import highlightSelectedNode from '../nodesSelection/highlightSelectedNode'
import setEdgeStyle from './setEdgeStyle'
import setNodeStyle from './setNodeStyle'

/**
 * Highlight spiderable node borders
 * @param  {Object}     params
 * @param  {Function}   params.updateStoreValue           updateStoreValue action
 * @param  {String}     params.id                         Element ID
 * @param  {String}     params.type                       Element type (node|edge)
 * @return { undefined }
 */
const updateHighlightedElement = ({
  updateStoreValue,
  id,
  type,
}) => {
  const {
    selectedElement,
    classesFromApi,
    objectPropertiesFromApi
  } = store.getState()

  const [oldId, oldType] = getElementIdAndType(selectedElement)

  if (oldId) {
    if (oldType === 'node') {
      setNodeStyle({
        node: classesFromApi[oldId],
      })
    } else {
      setEdgeStyle({
        edge: objectPropertiesFromApi[oldId]
      })
    }
  }

  if (type === 'node') {
    highlightSelectedNode({
      updateStoreValue,
      selectedNode: id
    })
  } else {
    highlightSelectedEdge({
      updateStoreValue,
      selectedEdge: id
    })
  }

  updateStoreValue(['selectedElement'], OPERATION_TYPE_UPDATE, { [id]: type })
  updateStoreValue(['selectedNotesType'], OPERATION_TYPE_UPDATE, type)
  updateStoreValue(['noteElementId'], OPERATION_TYPE_UPDATE, id)
}

export default updateHighlightedElement
