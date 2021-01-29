import { Network } from 'vis-network'
import onMouseDown from './canvasUtils/onMouseDown'
import onMouseMove from './canvasUtils/onMouseMove'
import getPhysicsOptions from './getPhysicsOptions'

/**
 * Update VisJs network in store
 * @param  {Object}   params
 * @param  {Boolean}  params.physicsHierarchicalView   hierarchical view flag
 * @param  {Boolean}  params.physicsRepulsion          physics repulsion flag
 * @param  {Number}   params.physicsEdgeLength         edge length as integer
 * @param  {Number}   params.physicsEdgeWidth          edge width as integer
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Object}   params.availableNodes            VisJs Dataset of nodes IDs
 * @param  {Object}   params.availableEdges            VisJs Dataset of edges IDs
 * @param  {Node}     params.visJsRef                  reference to network graph DOM element
 * @return
 */
const setNetwork = ({
  setStoreState,
  visJsRef,
  availableNodes,
  availableEdges,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  physicsEdgeWidth
}) => {
  const physicsSettings = getPhysicsOptions({
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength,
    physicsEdgeWidth
  })

  setStoreState('network', visJsRef.current
    && new Network(visJsRef.current, {
      nodes: availableNodes,
      edges: availableEdges
    },
      physicsSettings))

  const canvas = document.getElementById('network-graph').getElementsByTagName('canvas')[0]

  canvas.addEventListener('mousedown', (e) => onMouseDown({
    e,
    setStoreState
  }), false)

  canvas.addEventListener('mousemove', (e) => onMouseMove({
    e,
    setStoreState
  }), false)
}

export default setNetwork
