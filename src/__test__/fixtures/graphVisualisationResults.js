/* eslint max-len:0 */
import { OwlObjectProperties } from './test-ontology-object-properties'

const nodeConnections = {
  'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': [
    {
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      toLabel: 'Principle',
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
    },
    {
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      toLabel: 'Regulation',
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
    },
  ],
  'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': [
    {
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      toLabel: 'Principle',
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
    },
  ],
  'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g': [
    {
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      toLabel: 'Regulation',
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
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
    'nodesConnections',
    nodeConnections
  ],
  [
    'edgesConnections',
    {
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB': [
        {
          from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          fromLabel: 'Programme',
          to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
          toLabel: 'Principle',
        },
        {
          from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          fromLabel: 'Programme',
          to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
          toLabel: 'Regulation',
        },
      ],
    },
  ],
]
