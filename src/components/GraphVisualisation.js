import React, { useRef, useEffect } from 'react';
import { Network } from 'vis-network';
import { connect } from 'redux-zero/react'
// import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
// import VisNetworkReactComponent from '../libs/VisNetworkReactComponent'
import actions from '../store/actions'
import serialiseNodesEdges from '../utils/serialiseNodesEdges'
import filterNodesToDisplay from '../utils/filterNodesToDisplay'
import jsonClasses from '../assets/json/test-ontology-classes.json'
import jsonObjectProperties from '../assets/json/test-ontology-object-properties.json'
import getPhysicsOptions from '../utils/getPhysicsOptions'

// const defaultdata = {
//   nodes: [
//     { id: 1, label: 'Node 1' },
//     { id: 2, label: 'Node 2' },
//     { id: 3, label: 'Node 3' },
//     { id: 4, label: 'Node 4' },
//     { id: 5, label: 'Node 5' },
//   ],
//   edges: [
//     { from: 1, to: 3 },
//     { from: 1, to: 2 },
//     { from: 2, to: 4 },
//     { from: 2, to: 5 },
//     { from: 3, to: 3 },
//   ],
// };

// {
//   autoResize: true,
//   edges: {
//     color: '#411811'
//   }
// }

// let events = {
//   click: function (params) {
//     params.event = "[original event]";
//     console.log(
//       "click event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
//     );
//   },
//   doubleClick: function (params) {
//     console.log("doubleClick Event:", params);
//     params.event = "[original event]";
//   },
//   oncontext: function (params) {
//     console.log("oncontext Event:", params);

//     params.event = "[original event]";
//   },
//   dragStart: function (params) {
//     // There's no point in displaying this event on screen, it gets immediately overwritten
//     params.event = "[original event]";
//     console.log("dragStart Event:", params);
//     console.log(
//       "dragStart event, getNodeAt returns: " +
//         this.getNodeAt(params.pointer.DOM)
//     );
//   },
//   dragging: function (params) {
//     params.event = "[original event]";
//   },
//   dragEnd: function (params) {
//     params.event = "[original event]";
//     console.log("dragEnd Event:", params);
//     console.log(
//       "dragEnd event, getNodeAt returns: " + this.getNodeAt(params.pointer.DOM)
//     );
//   },
//   controlNodeDragging: function (params) {
//     params.event = "[original event]";
//   },
//   controlNodeDragEnd: function (params) {
//     params.event = "[original event]";
//     console.log("controlNodeDragEnd Event:", params);
//   },
//   zoom: function (params) {},
//   showPopup: function (params) {},
//   hidePopup: function () {
//     console.log("hidePopup Event");
//   },
//   select: function (params) {
//     console.log("select Event:", params);
//   },
//   selectNode: function (params) {
//     console.log("selectNode Event:", params);
//   },
//   selectEdge: function (params) {
//     console.log("selectEdge Event:", params);
//   },
//   deselectNode: function (params) {
//     console.log("deselectNode Event:", params);
//   },
//   deselectEdge: function (params) {
//     console.log("deselectEdge Event:", params);
//   },
//   hoverNode: function (params) {
//     console.log("hoverNode Event:", params);
//   },
//   hoverEdge: function (params) {
//     console.log("hoverEdge Event:", params);
//   },
//   blurNode: function (params) {
//     console.log("blurNode Event:", params);
//   },
//   blurEdge: function (params) {
//     console.log("blurEdge Event:", params);
//   },
// };

let network = undefined

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
  fitNetwork
}) => {
  const visJsRef = useRef(null);

  useEffect(() => {
    // Set data from api
    setStoreState('classesFromApi', jsonClasses)
    setStoreState('objectPropertiesFromApi', jsonObjectProperties)
    setStoreState('nodesIdsToDisplay', Object.keys(jsonClasses.OwlClasses))
  }, []); 
  
  useEffect(() => {
    filterNodesToDisplay({
      classesFromApi,
      setStoreState,
      searchFilter
    })
  }, [searchFilter]); 

  useEffect(() => {
    serialiseNodesEdges({
      nodesIdsToDisplay,
      classesFromApi,
      objectPropertiesFromApi,
      setStoreState,
      edgesToIgnore
    })
  }, [nodesIdsToDisplay, selectedNode, edgesToIgnore]); 

  useEffect(async () => {
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
      physicsSettings
    );

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
      }
    });

    // console.log(network)
    // Use `network` here to configure events, etc
    await network.stabilize(2000)

    network.fit()

    setStoreState('fitNetwork', false)
  }, [
    visJsRef,
    availableNodes,
    availableEdges,
    physicsHierarchicalView,
    physicsRepulsion,
    physicsEdgeLength
  ]);

  useEffect(() => {
    if (network && fitNetwork) {
      network.fit()
    }

    setStoreState('fitNetwork', false)
  }, [fitNetwork])

  return (
    <div 
      ref={visJsRef} 
      style={{
        height: `100%`,
        width: `100%`
      }}
    />
  )
};

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
  fitNetwork
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
  fitNetwork
})

export default connect(
  mapToProps,
  actions
)(GraphVisualisation)
