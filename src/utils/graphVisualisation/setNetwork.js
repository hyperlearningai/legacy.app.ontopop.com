import { Network } from 'vis-network'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import onMouseDown from '../boundingBoxSelection/onMouseDown'
import onMouseMove from '../boundingBoxSelection/onMouseMove'
import getPhysicsOptions from './getPhysicsOptions'

/**
 * Update VisJs network in store
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @param  {Object}   params.availableNodes            VisJs Dataset of nodes IDs
 * @param  {Object}   params.availableEdges            VisJs Dataset of edges IDs
 * @param  {Node}     params.visJsRef                  reference to network graph DOM element
 * @return { undefined }
 */
const setNetwork = ({
  updateStoreValue,
  visJsRef,
  availableNodes,
  availableEdges,
}) => {
  const physicsSettings = getPhysicsOptions()

  updateStoreValue(['network'], OPERATION_TYPE_UPDATE, visJsRef.current
    && new Network(visJsRef.current, {
      nodes: availableNodes,
      edges: availableEdges
    }, physicsSettings))

  const canvas = document.getElementById('network-graph').getElementsByTagName('canvas')[0]

  canvas.addEventListener('mousedown', (e) => onMouseDown({
    e,
    updateStoreValue
  }), false)

  canvas.addEventListener('mousemove', (e) => onMouseMove({
    e,
    updateStoreValue
  }), false)
}

export default setNetwork
