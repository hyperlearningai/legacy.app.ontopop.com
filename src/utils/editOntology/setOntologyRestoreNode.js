import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import getEdgeObject from '../graphVisualisation/getEdgeObject'
import setElementsStyle from '../networkStyling/setElementsStyle'
import httpCall from '../apiCalls/httpCall'
import { POST_CREATE_NODE } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import countEdges from '../nodesEdgesUtils/countEdges'
import countNodes from '../nodesEdgesUtils/countNodes'

/**
 * Restore ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyRestoreNode = async ({
  selectedElement,
  setStoreState,
  t
}) => {
  const {
    classesFromApiBackup,
    classesFromApi,
    deletedNodes,
    deletedEdges,
    objectPropertiesFromApi,
    objectPropertiesFromApiBackup,
    nodesEdges,
    edgesPerNode,
    edgesPerNodeBackup,
    userDefinedNodeStyling,
    globalEdgeStyling,
    userDefinedEdgeStyling
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

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newDeletedEdges = deletedEdges.slice()
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))
  const newEdgesPerNodeBackup = JSON.parse(JSON.stringify(edgesPerNodeBackup))

  const restoredNodes = []

  if (selectedElement.length > 0) {
    // first add node back
    for (let index = 0; index < selectedElement.length; index++) {
      const oldId = selectedElement[index]

      const body = newClassesFromApiBackup[oldId] ? JSON.parse(JSON.stringify(newClassesFromApiBackup[oldId])) : undefined

      if (!body) return false

      body.label = 'class'

      const response = await httpCall({
        setStoreState,
        withAuth: true,
        route: POST_CREATE_NODE,
        method: 'post',
        body,
        t
      })

      const {
        error, data
      } = response

      const message = `${t('couldNotRestoreNode')}: ${oldId}`
      if (error) {
        showNotification({
          message,
          type: NOTIFY_WARNING
        })
        continue
      }

      if (!data || Object.keys(data).length !== 1) {
        showNotification({
          message,
          type: NOTIFY_WARNING
        })
        continue
      }

      const { id } = data[Object.keys(data)[0]]

      // remove from backup and add new id
      newClassesFromApi[id] = JSON.parse(JSON.stringify(newClassesFromApiBackup[oldId]))
      newClassesFromApiBackup[id] = newClassesFromApi[id]
      delete newClassesFromApiBackup[oldId]

      newClassesFromApi[id].id = id
      newClassesFromApi[id].label = newClassesFromApi[id][stylingNodeCaptionProperty]
        ? newClassesFromApi[id][stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

      addNode({
        ...newClassesFromApi[id],
        ...nodeStyle
      })

      // add connection back
      newNodesEdges[id] = []
      newEdgesPerNode[id] = []

      restoredNodes.push({
        id,
        oldId,
      })
    }
  }

  // Remove nodes from deletedNodes
  const newDeletedNodes = deletedNodes.slice().filter((nodeId) => !restoredNodes.includes(nodeId))

  if (restoredNodes.length > 0) {
    // then add edges
    restoredNodes.map((node) => {
      const {
        id,
        oldId,
      } = node

      const edges = newEdgesPerNodeBackup[oldId]

      if (edges.length > 0) {
        edges.map((edgeId) => {
          if (newObjectPropertiesFromApiBackup[edgeId].from === oldId) {
            newObjectPropertiesFromApiBackup[edgeId].from = id
          }

          if (newObjectPropertiesFromApiBackup[edgeId].to === oldId) {
            newObjectPropertiesFromApiBackup[edgeId].to = id
          }

          const {
            from,
            to,
            userDefined
          } = newObjectPropertiesFromApiBackup[edgeId]

          if (newDeletedNodes.includes(from) || newDeletedNodes.includes(to)) return false

          const {
            stylingEdgeLineColor,
            stylingEdgeLineColorHover,
            stylingEdgeLineColorHighlight,
            stylingEdgeLineStyle,
            stylingEdgeTextColor,
            stylingEdgeTextSize,
            stylingEdgeTextAlign,
            stylingEdgeWidth,
          } = userDefined ? userDefinedEdgeStyling : globalEdgeStyling

          const edgeStyle = {
            smooth: {
              type: 'cubicBezier', // 'continuous'
              forceDirection: 'none',
              roundness: 0.45,
            },
            arrows: { to: true },
            color: {
              color: stylingEdgeLineColor,
              highlight: stylingEdgeLineColorHighlight,
              hover: stylingEdgeLineColorHover,
              inherit: 'from',
              opacity: 1.0
            },
            font: {
              color: stylingEdgeTextColor,
              size: stylingEdgeTextSize,
              align: stylingEdgeTextAlign
            },
            labelHighlightBold: true,
            selectionWidth: 3,
            width: stylingEdgeWidth,
            dashes: stylingEdgeLineStyle
          }

          const edge = getEdgeObject({
            edge: newObjectPropertiesFromApiBackup[edgeId]
          })

          // add edgeId to triple
          if (!newEdgesPerNode[from].includes(edgeId)) {
            newEdgesPerNode[from].push(edgeId)
          }

          if (!newEdgesPerNode[to].includes(edgeId)) {
            newEdgesPerNode[to].push(edgeId)
          }

          const isFromVisible = getNode(from) !== null
          const isToVisible = getNode(to) !== null

          if (isFromVisible && isToVisible) {
            // add to nodes edges
            if (!newNodesEdges[from].includes(edgeId)) {
              newNodesEdges[from].push(edgeId)
            }

            if (!newNodesEdges[to].includes(edgeId)) {
              newNodesEdges[to].push(edgeId)
            }

            const deletedEdgeIndex = newDeletedEdges.indexOf(edgeId)

            if (deletedEdgeIndex > -1) {
              newDeletedEdges.splice(deletedEdgeIndex, 1)
            }

            addEdge({
              ...edge,
              ...edgeStyle
            })
          }

          return true
        })
      }

      return true
    })

    const message = `${t('nodesRestored')}: ${restoredNodes.join(', ')}`
    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })
  }

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('deletedEdges', newDeletedEdges)
  setElementsStyle()
  setStoreState('availableNodesCount', countNodes())
  setStoreState('availableEdgesCount', countEdges())
}

export default setOntologyRestoreNode
