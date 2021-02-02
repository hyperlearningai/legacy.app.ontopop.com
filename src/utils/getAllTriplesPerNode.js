import { SUB_CLASS_OF_ID } from '../constants/graph'

/**
 * Update triplesPerNode (normalised list of nodes with related values) in store
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi   Nodes from initial OwlClasses
 * @param  {Array}    params.classesIds       Array of node IDs
 * @param  {Function} params.setStoreState    setStoreState action
 * @return { undefined }
 */
const getAllTriplesPerNode = async ({
  classesIds,
  setStoreState,
  classesFromApi
}) => {
  const triples = {}

  for (let i = 0; i < classesIds.length; i++) {
    const classId = classesIds[i]

    const { rdfsSubClassOf } = classesFromApi[classId]

    if (rdfsSubClassOf && rdfsSubClassOf.length > 0) {
      for (let j = 0; j < rdfsSubClassOf.length; j++) {
        const subClassOf = await rdfsSubClassOf[j]
        const { owlRestriction, classRdfAbout } = subClassOf

        const predicate = owlRestriction?.objectPropertyRdfAbout || SUB_CLASS_OF_ID

        if (predicate && classRdfAbout) {
          const triple = {
            from: classId,
            predicate,
            to: classRdfAbout
          }

          if (triples[classId]) {
            triples[classId].push(triple)
          } else {
            triples[classId] = [triple]
          }

          if (triples[classRdfAbout]) {
            triples[classRdfAbout].push(triple)
          } else {
            triples[classRdfAbout] = [triple]
          }
        }
      }
    }
  }

  setStoreState('triplesPerNode', JSON.parse(JSON.stringify(triples)))
}

export default getAllTriplesPerNode
