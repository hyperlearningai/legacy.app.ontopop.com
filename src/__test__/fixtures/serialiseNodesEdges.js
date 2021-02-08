/* eslint max-len:0 */
import { OwlObjectProperties } from './test-ontology-object-properties'

export const nodeConnections1 = {
  'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M': [
    {
      arrows: {
        to: {
          scaleFactor: 0.2,
        },
      },
      dashes: true,
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      toLabel: 'Principle',
      width: 0.2,
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
    },
    {
      arrows: {
        to: {
          scaleFactor: 0.2,
        },
      },
      dashes: true,
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      toLabel: 'Regulation',
      width: 0.2,
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
    },
  ],
  'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6': [
    {
      arrows: {
        to: {
          scaleFactor: 0.2,
        },
      },
      dashes: true,
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      toLabel: 'Principle',
      width: 0.2,
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
    },
  ],
  'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g': [
    {
      arrows: {
        to: {
          scaleFactor: 0.2,
        },
      },
      dashes: true,
      edgeId: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      from: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      fromLabel: 'Programme',
      id: 'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB___http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M___http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      label: 'Governed by',
      to: 'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      toLabel: 'Regulation',
      width: 0.2,
      ...OwlObjectProperties['http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB']
    },
  ],
}

export const serialiseNodesEdges1 = [
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
    nodeConnections1
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
