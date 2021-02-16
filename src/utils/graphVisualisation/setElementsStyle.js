import store from '../../store'
import resetEdgesStyles from './resetEdgesStyles'
import resetNodesStyles from './resetNodesStyles'
import setHighlightedNodes from './setHighlightedNodes'
import styleEdgesByProperty from './styleEdgesByProperty'
import styleNodesByProperty from './styleNodesByProperty'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const setElementsStyle = ({
  setStoreState,
}) => {
  const {
    // highlightedNodes,
    // shortestPathNodes,
    // isNodeOverlay,
    isPhysicsOn,
    stylingNodeByProperty,
    stylingEdgeByProperty
  } = store.getState()

  const currentPhysicsOnState = isPhysicsOn

  // reset node styles previously modified
  resetNodesStyles()

  // reset edges styles previously modified
  resetEdgesStyles()

  // update node style
  if (stylingNodeByProperty.length > 0) {
    stylingNodeByProperty.map((property) => {
      const {
        styleValue, filterValue
      } = property
      if (
        styleValue
        && styleValue !== ''
        && styleValue !== 0
        && filterValue
        && filterValue !== ''
      ) {
        styleNodesByProperty({ property })
      }

      return true
    })
  }

  // update edge style
  if (stylingEdgeByProperty.length > 0) {
    stylingEdgeByProperty.map((property) => {
      const {
        styleValue, filterValue
      } = property

      if (
        styleValue
        && styleValue !== ''
        && styleValue !== 0
        && filterValue
        && filterValue !== ''
      ) {
        styleEdgesByProperty({ property })
      }

      return true
    })
  }

  // check if highlighted nodes
  setHighlightedNodes()

  // // node overlay
  // if (isNodeOverlay && !shortestPathNodes.includes(nodeId)) {
  //   extendedNodeObject.opacity = 0.1
  // }

  // check if all connection edges are present, otherwise make a different border to display that it's spidetable
  // highlightSpiderableNodes({
  //   nodesConnections,
  //   triplesPerNode,
  // })

  // turn physics on to scatter nodes around
  if (!currentPhysicsOnState) {
    setStoreState('isPhysicsOn', true)
  } else {
    setStoreState('isPhysicsOn', false)
    setStoreState('isPhysicsOn', true)
  }

  // restore isPhysicsOn state
  setTimeout(() => {
    if (!currentPhysicsOnState) {
      setStoreState('isPhysicsOn', false)
    }
  }, 3000)
}

export default setElementsStyle
