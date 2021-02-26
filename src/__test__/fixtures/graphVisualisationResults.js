/* eslint max-len:0 */
const nodeConnections = {
  'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': [
    {
      predicate: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
    },
    {
      predicate: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
    },
  ],
  'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': [
    {
      predicate: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
    },
  ],
  'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g': [
    {
      predicate: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
    },
  ],
}

export const graphVisualisationResults = [
  [
    'availableNodesCount',
    4,
  ],
  [
    'availableEdgesCount',
    2
  ],
  [
    'nodesEdges',
    nodeConnections
  ],
  [
    'isPhysicsOn', true
  ]
]
