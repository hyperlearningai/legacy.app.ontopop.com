import { classesFromApi } from './classesFromApi'
import { nodesEdges } from './nodesEdges'
import { totalEdgesPerNode } from './totalEdgesPerNode'

const newClassesFromApi = {
  ...classesFromApi,
}

const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
const newEdgesPerNode = JSON.parse(JSON.stringify(totalEdgesPerNode))

newEdgesPerNode['1'].splice(0, 1)
newEdgesPerNode['1'].splice(0, 1)
newEdgesPerNode['141'].splice(0, 1)

export const updateStoreValueFixture = [
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
