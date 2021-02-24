import { classesFromApi } from './classesFromApi'
import { nodesConnections } from './nodesConnectionsNew'
import { triplesPerNode } from './triplesPerNodeNew'

const newClassesFromApi = {
  ...classesFromApi,
}

const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))

newTriplesPerNode['1'].splice(0, 1)
newTriplesPerNode['1'].splice(0, 1)
newTriplesPerNode['141'].splice(0, 1)

export const setStoreStateFixture = [
  [
    'nodesConnections', newNodesConnections
  ],

  [
    'triplesPerNode', newTriplesPerNode
  ],
  [
    'classesFromApi',
    newClassesFromApi,
  ],
  [
    'deletedConnections',
    ['11'],
  ]
]
