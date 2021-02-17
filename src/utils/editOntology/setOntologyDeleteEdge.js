import flatten from 'flat'
import store from '../../store'
import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { generatePredicateId } from '../../constants/functions'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import setElementsStyle from '../networkStyling/setElementsStyle'

/**
 * Delete ontology edges
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @return {undefined}
 */
const setOntologyDeleteEdge = ({
  selectedElement,
  setStoreState,
}) => {
  const {
    objectPropertiesFromApi,
    deletedEdges,
    classesFromApi,
    nodesConnections,
    triplesPerNode,
    edgesConnections
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newDeletedEdges = deletedEdges.slice()
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))

  if (selectedElement.length > 0) {
    // delete edges from object properties
    selectedElement.map((edgeId) => {
      if (!newDeletedEdges.includes(edgeId)) {
        newDeletedEdges.push(edgeId)
      }

      // remove connection with edge
      if (newEdgesConnections[edgeId]) {
        const connections = newEdgesConnections[edgeId]

        connections.map((connection) => {
          const {
            from,
            predicate,
            to
          } = connection

          if (newNodesConnections[from]) {
            const updatedConnections = newNodesConnections[from].filter((triple) => (triple.predicate !== predicate))

            newNodesConnections[from] = updatedConnections
          }

          if (newTriplesPerNode[from]) {
            const updatedConnections = newTriplesPerNode[from].filter((triple) => (triple.predicate !== predicate))

            newTriplesPerNode[from] = updatedConnections
          }

          if (newNodesConnections[to]) {
            const updatedConnections = newNodesConnections[to].filter((triple) => (triple.predicate !== predicate))

            newNodesConnections[to] = updatedConnections
          }

          if (newTriplesPerNode[to]) {
            const updatedConnections = newTriplesPerNode[to].filter((triple) => (triple.predicate !== predicate))

            newTriplesPerNode[to] = updatedConnections
          }

          return true
        })

        delete newEdgesConnections[edgeId]
      }

      delete newObjectPropertiesFromApi[edgeId]
      return true
    })

    const flatClassesFromApi = flatten(newClassesFromApi)
    const flatPropertyKeys = Object.keys(flatClassesFromApi).filter((flatKey) => flatKey.includes('objectPropertyRdfAbout'))

    // remove all edges connection in nodes
    flatPropertyKeys.reverse().map((flatPropertyKey) => {
      if (selectedElement.includes(flatClassesFromApi[flatPropertyKey])) {
        const [from, subKeys] = flatPropertyKey.split('.rdfsSubClassOf.')
        const predicate = flatClassesFromApi[flatPropertyKey]
        const to = flatClassesFromApi[flatPropertyKey.replace('objectPropertyRdfAbout', 'classRdfAbout')]

        const predicateArrayIndex = subKeys.split('.owlRestriction')[0]

        // remove from node subclass
        newClassesFromApi[from][SUBCLASSOF_PROPERTY].splice(predicateArrayIndex, 1)

        // remove from graph
        const edgeId = generatePredicateId({
          from, predicate, to
        })

        removeEdge(edgeId)
      }
      return true
    })
  }

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('edgesConnections', newEdgesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('deletedEdges', newDeletedEdges)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setElementsStyle()
}

export default setOntologyDeleteEdge
