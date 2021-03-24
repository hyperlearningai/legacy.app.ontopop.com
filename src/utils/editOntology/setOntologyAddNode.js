import store from '../../store'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import addNode from '../nodesEdgesUtils/addNode'
import setNodeStyle from '../networkStyling/setNodeStyle'
import { API_ENDPOINT_GRAPH_NODES_CREATE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import { NODE_TYPE } from '../../constants/graph'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * ADd ontology nodes
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue           updateStoreValue action
 * @param  {Object}         params.selectedElementProperties  Element properties from form
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyAddNode = async ({
  updateStoreValue,
  selectedElementProperties,
  t
}) => {
  const {
    nodesEdges,
    classesFromApi,
    classesFromApiBackup,
    addedNodes,
    totalEdgesPerNode,
    totalEdgesPerNodeBackup,
    userDefinedNodeStyling,
  } = store.getState()

  const {
    stylingNodeBorder,
    stylingNodeBorderSelected,
    stylingNodeTextFontSize,
    stylingNodeTextColor,
    stylingNodeTextFontAlign,
    stylingNodeShape,
    stylingNodeBackgroundColor,
    stylingNodeBorderColor,
    stylingNodeHighlightBackgroundColor,
    stylingNodeHighlightBorderColor,
    stylingNodeHoverBackgroundColor,
    stylingNodeHoverBorderColor,
    stylingNodeSize,
    stylingNodeCaptionProperty,
  } = userDefinedNodeStyling

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(totalEdgesPerNode))
  const newEdgesPerNodeBackup = JSON.parse(JSON.stringify(totalEdgesPerNodeBackup))

  const body = JSON.parse(JSON.stringify(selectedElementProperties))
  body.label = 'class'

  const response = await httpCall({
    updateStoreValue,
    withAuth: true,
    route: API_ENDPOINT_GRAPH_NODES_CREATE,
    method: 'post',
    body,
    t
  })

  const {
    error, data
  } = response

  let message = t('couldNotAddNode')
  if (error) {
    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  if (!data || Object.keys(data).length !== 1) {
    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  const {
    id, userDefined, label, userId
  } = data[Object.keys(data)[0]]

  // add to classesFromApi
  newClassesFromApi[id] = {
    ...selectedElementProperties,
    [NODE_TYPE]: label,
    userDefined,
    id,
    userId
  }

  // add label
  newClassesFromApi[id].label = selectedElementProperties[stylingNodeCaptionProperty]
    ? selectedElementProperties[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''
  newClassesFromApi[id].title = newClassesFromApi[id].label

  // add array for new node in nodes edges connections
  newNodesEdges[id] = []
  newEdgesPerNode[id] = []
  newEdgesPerNodeBackup[id] = []

  // add as backup
  newClassesFromApiBackup[id] = newClassesFromApi[id]

  // add node style
  const nodeStyle = {
    borderWidth: stylingNodeBorder,
    borderWidthSelected: stylingNodeBorderSelected,
    font: {
      size: stylingNodeTextFontSize,
      color: stylingNodeTextColor,
      align: stylingNodeTextFontAlign,
      face: 'Montserrat',
      bold: '700'
    },
    shape: stylingNodeShape,
    color: {
      background: stylingNodeBackgroundColor,
      border: stylingNodeBorderColor,
      highlight: {
        background: stylingNodeHighlightBackgroundColor,
        border: stylingNodeHighlightBorderColor,
      },
      hover: {
        background: stylingNodeHoverBackgroundColor,
        border: stylingNodeHoverBorderColor,
      },
    },
    size: stylingNodeSize
  }

  const newAddedNodes = [
    ...addedNodes,
    ...[id]
  ]

  updateStoreValue(['classesFromApiBackup'], OPERATION_TYPE_UPDATE, newClassesFromApiBackup)
  updateStoreValue(['classesFromApi'], OPERATION_TYPE_UPDATE, newClassesFromApi)
  updateStoreValue(['nodesEdges'], OPERATION_TYPE_UPDATE, newNodesEdges)
  updateStoreValue(['totalEdgesPerNode'], OPERATION_TYPE_UPDATE, newEdgesPerNode)
  updateStoreValue(['totalEdgesPerNodeBackup'], OPERATION_TYPE_UPDATE, newEdgesPerNodeBackup)
  updateStoreValue(['addedNodes'], OPERATION_TYPE_UPDATE, newAddedNodes)

  const isVisible = checkNodeVisibility({
    nodeId: id,
  })

  if (isVisible) {
    addNode({
      node: {
        ...newClassesFromApi[id],
        ...nodeStyle
      },
      updateStoreValue
    })

    setNodeStyle({
      nodeId: id,
    })
  }

  message = `${t('nodeAdded')}: ${id}`

  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyAddNode
