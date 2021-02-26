import { classesFromApi } from './classesFromApi'
import { nodesEdges } from './nodesEdgesNew'
import { edgesPerNode } from './edgesPerNodeNew'

const newClassesFromApi = {
  ...classesFromApi,
}

const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))

newEdgesPerNode['1'].splice(0, 1)
newEdgesPerNode['1'].splice(0, 1)
newEdgesPerNode['141'].splice(0, 1)

export const setStoreStateFixture = [
  [
    'nodesEdges', newNodesEdges
  ],

  [
    'edgesPerNode', newEdgesPerNode
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
