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

const GraphVisualisation = ({
  availableNodes,
  availableEdges,
  searchFilter,
  setStoreState,
  addToArray,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  // edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  deletedNodes,
  isNodeSelectable,
  network,
  selectedNodes,
  selectedEdges,
  isEdgeSelectable
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
      // edgesToIgnore,
      deletedNodes
    })
  }, [
    nodesIdsToDisplay,
    // edgesToIgnore,
    deletedNodes
  ])

  useEffect(async () => {
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
  }, [
    visJsRef,
    availableNodes,
    availableEdges,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  ])

  useEffect(async () => {
    network?.on('selectNode', (event) => {
      if (event.nodes?.length === 1) {
        if (isNodeSelectable) {
          addToArray('selectedNodes', event.nodes[0])
        }

        if (!nodesIdsToDisplay.includes(event.nodes[0])) {
          const newNodesIdsToDisplay = [
            ...nodesIdsToDisplay,
            event.nodes[0]
          ]

          setStoreState('nodesIdsToDisplay', newNodesIdsToDisplay)
        }
      }
    })

    network?.on('selectEdge', (event) => {
      if (event.edges?.length === 1) {
        if (isEdgeSelectable) {
          addToArray('selectedEdges', event.edges[0])
        }
      }
    })

    network?.on('stabilizationProgress', (params) => {
      const percentage = parseFloat(params.iterations / params.total).toFixed(2)

      setStoreState('networkLoadingProgress', percentage * 100)
    })

    network?.once('stabilizationIterationsDone', () => {
      setStoreState('networkLoadingProgress', 0)
      setStoreState('isNetworkLoading', false)
    })

    await network?.stabilize(2000)

    network?.fit()
  }, [
    network,
    isNodeSelectable,
    isEdgeSelectable
  ])

  useEffect(() => {
    const availableNodesIds = availableNodes.map((node) => node.id)

    const nodesToAdd = selectedNodes.filter((node) => availableNodesIds.includes(node))

    network?.selectNodes(nodesToAdd)
  }, [
    selectedNodes
  ])

  useEffect(() => {
    const availableEdgesIds = availableEdges.map((edge) => edge.id)

    const edgesToAdd = selectedEdges.filter((edge) => availableEdgesIds.includes(edge))

    network?.selectEdges(edgesToAdd)
  }, [
    selectedEdges
  ])

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
  // edgesToIgnore: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedEdges: PropTypes.arrayOf(PropTypes.string).isRequired,
  setStoreState: PropTypes.func.isRequired,
  addToArray: PropTypes.func.isRequired,
  searchFilter: PropTypes.string.isRequired,
  classesFromApi: PropTypes.shape().isRequired,
  objectPropertiesFromApi: PropTypes.shape().isRequired,
  nodesIdsToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
  physicsHierarchicalView: PropTypes.bool.isRequired,
  physicsRepulsion: PropTypes.bool.isRequired,
  physicsEdgeLength: PropTypes.number.isRequired,
  deletedNodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isNodeSelectable: PropTypes.bool.isRequired,
  network: PropTypes.shape(),
  isEdgeSelectable: PropTypes.bool.isRequired,
}

GraphVisualisation.defaultProps = {
  network: undefined,
}

const mapToProps = ({
  availableNodes,
  availableEdges,
  searchFilter,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  // edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  deletedNodes,
  isNodeSelectable,
  network,
  selectedNodes,
  isEdgeSelectable,
  selectedEdges
}) => ({
  availableNodes,
  availableEdges,
  searchFilter,
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay,
  // edgesToIgnore,
  physicsHierarchicalView,
  physicsRepulsion,
  physicsEdgeLength,
  deletedNodes,
  isNodeSelectable,
  network,
  selectedNodes,
  isEdgeSelectable,
  selectedEdges
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
