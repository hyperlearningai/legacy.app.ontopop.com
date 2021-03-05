import { classesFromApi } from './classesFromApi'
import { nodesEdges } from './nodesEdgesNew'
import { totalEdgesPerNode } from './totalEdgesPerNode'

const newClassesFromApi = {
  ...classesFromApi,
}

const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
const newEdgesPerNode = JSON.parse(JSON.stringify(totalEdgesPerNode))

newEdgesPerNode['1'].splice(0, 1)
newEdgesPerNode['1'].splice(0, 1)
newEdgesPerNode['141'].splice(0, 1)

export const setStoreStateFixture = [
  [
    'nodesEdges', newNodesEdges
  ],

  [
    'totalEdgesPerNode', newEdgesPerNode
  ],
  [
    'classesFromApi',
    newClassesFromApi,
  ],
  [
    'deletedEdges',
    ['11'],
  ]
]
