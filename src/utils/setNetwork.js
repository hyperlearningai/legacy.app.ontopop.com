import { Network } from 'vis-network'
import getPhysicsOptions from './getPhysicsOptions'

const setNetwork = ({
  setStoreState,
  visJsRef,
  availableNodes,
  availableEdges,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength
}) => {
  setStoreState('isNetworkLoading', true)

  const physicsSettings = getPhysicsOptions({
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  })

  setStoreState('network', visJsRef.current
    && new Network(visJsRef.current, {
      nodes: availableNodes,
      edges: availableEdges
    },
    physicsSettings))
}

export default setNetwork
