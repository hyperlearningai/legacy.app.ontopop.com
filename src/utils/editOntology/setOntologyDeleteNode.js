import flatten from 'flat'
import { generatePredicateId } from '../../constants/functions'
import { SUBCLASSOF_PROPERTY, SUB_CLASS_OF_ID } from '../../constants/graph'
import store from '../../store'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import removeNode from '../nodesEdgesUtils/removeNode'

/**
 * Delete ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyDeleteNode = ({
  selectedElement,
  setStoreState,
  addToObject
}) => {
  const {
    graphVersions,
    classesFromApi,
    deletedNodes,
    selectedGraphVersion,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))
  const newDeletedNodes = deletedNodes.slice()

  if (selectedElement.length > 0) {
    const flatClassesFromApi = flatten(newClassesFromApi)
    const flatClassKeys = Object.keys(flatClassesFromApi).filter((flatKey) => flatKey.includes('classRdfAbout')
      && !flatKey.includes('owlRestriction'))

    // remove all edges connection in nodes
    flatClassKeys.reverse().map((flatClassKey) => {
      if (selectedElement.includes(flatClassesFromApi[flatClassKey])) {
        const [from, subKeys] = flatClassKey.split('.rdfsSubClassOf.')
        const to = flatClassesFromApi[flatClassKey]

        const owlRestriction = flatClassesFromApi[flatClassKey.replace('classRdfAbout', 'owlRestriction')]
        const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

        const predicateArrayIndex = subKeys.split('.classRdfAbout')[0]

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

    // on each selected node, first remove connection then remove node
    selectedElement.map((nodeId) => {
      if (!newDeletedNodes.includes(nodeId)) {
        newDeletedNodes.push(nodeId)
      }

      if (newClassesFromApi[selectedElement]) {
        const { rdfsSubClassOf } = newClassesFromApi[selectedElement]

        if (rdfsSubClassOf && rdfsSubClassOf.length > 0) {
          rdfsSubClassOf.map((subClassOf) => {
            const to = subClassOf.classRdfAbout
            const { owlRestriction } = subClassOf
            const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

            // remove from graph
            const edgeId = generatePredicateId({
              from: nodeId, predicate, to
            })

            removeEdge(edgeId)

            return true
          })
        }

        removeNode(nodeId)
      }

      return true
    })
  }

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.deletedNodes = newDeletedNodes

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('classesFromApi', newClassesFromApi)
}

export default setOntologyDeleteNode
