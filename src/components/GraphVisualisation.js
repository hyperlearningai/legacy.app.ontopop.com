import React, { useRef, useEffect } from 'react'
import { Network } from 'vis-network'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import actions from '../store/actions'
import serialiseNodesEdges from '../utils/serialiseNodesEdges'
import filterNodesToDisplay from '../utils/filterNodesToDisplay'
import jsonClasses from '../assets/json/test-ontology-classes.json'
import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import getPhysicsOptions from '../utils/getPhysicsOptions'

let network

const GraphVisualisation = ({
  availableNodes,
  availableEdges,
  searchFilter,
  setStoreState,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  selectedNode,
  edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  fitNetwork,
  deletedNodes
}) => {
  const visJsRef = useRef(null)

  useEffect(() => {
    // Set data from api
    setStoreState('classesFromApi', jsonClasses)
    setStoreState('objectPropertiesFromApi', jsonObjectProperties)
    setStoreState('nodesIdsToDisplay', Object.keys(jsonClasses.OwlClasses))
  }, [])

  useEffect(() => {
    filterNodesToDisplay({
      classesFromApi,
      setStoreState,
      searchFilter
    })
  }, [searchFilter])

  useEffect(() => {
    serialiseNodesEdges({
      nodesIdsToDisplay,
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState,
      edgesToIgnore,
      deletedNodes
    })
  }, [nodesIdsToDisplay, selectedNode, edgesToIgnore, deletedNodes])

  useEffect(async () => {
    setStoreState('isNetworkLoading', true)

    const physicsSettings = getPhysicsOptions({
      physicsHierarchicalView,
      physicsRepulsion,
      physicsEdgeLength
    })

    network = visJsRef.current
      && new Network(visJsRef.current, {
        nodes: availableNodes,
        edges: availableEdges
      },
      physicsSettings)

    network?.on('selectNode', (event) => {
      if (event.nodes?.length === 1) {
        // eslint-disable-next-line
        setStoreState('selectedNode', event.nodes[0])

        if (!nodesIdsToDisplay.includes(event.nodes[0])) {
          const newNodesIdsToDisplay = [
            ...nodesIdsToDisplay,
            event.nodes[0]
          ]

          setStoreState('nodesIdsToDisplay', newNodesIdsToDisplay)
        }
      } else {
        setStoreState('selectedNode', undefined)
      }
    })

    network?.on('stabilizationProgress', (params) => {
      const percentage = parseFloat(params.iterations / params.total).toFixed(2)

      setStoreState('networkLoadingProgress', percentage * 100)
    })

    network?.once('stabilizationIterationsDone', () => {
      setStoreState('networkLoadingProgress', false)
      setStoreState('isNetworkLoading', 0)
    })

    await network?.stabilize(2000)

    network?.fit()

    setStoreState('fitNetwork', false)
  }, [
    visJsRef,
    availableNodes,
    availableEdges,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  ])

  useEffect(() => {
    if (network && fitNetwork) {
      network.fit()
    }

    setStoreState('fitNetwork', false)
  }, [fitNetwork])

  return (
    <div
      id="network-graph"
      ref={visJsRef}
      style={{
        height: '100%',
        width: '100%'
      }}
    />
  )
}

GraphVisualisation.propTypes = {
  availableNodes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  availableEdges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  edgesToIgnore: PropTypes.arrayOf(PropTypes.string).isRequired,
  setStoreState: PropTypes.func.isRequired,
  searchFilter: PropTypes.string.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedNode: PropTypes.shape(),
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  fitNetwork: PropTypes.bool.isRequired,
  deletedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

GraphVisualisation.defaultProps = {
  selectedNode: undefined
}

const mapToProps = ({
  availableNodes,
  availableEdges,
  searchFilter,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  fitNetwork,
  deletedNodes
}) => ({
  availableNodes,
  availableEdges,
  searchFilter,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  fitNetwork,
  deletedNodes
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
