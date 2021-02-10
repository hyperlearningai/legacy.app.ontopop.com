/* eslint max-len:0 */
import { triplesPerNode } from '../fixtures/triplesPerNode'
import highlightSpiderableNodes from '../../utils/highlightSpiderableNodes'
import { SUB_CLASS_OF_ID } from '../../constants/graph'
import getNodeIds from '../../utils/nodesEdgesUtils/getNodeIds'
import getNode from '../../utils/nodesEdgesUtils/getNode'
import updateNodes from '../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../utils/nodesEdgesUtils/getNode')
jest.mock('../../utils/nodesEdgesUtils/updateNodes')

describe('highlightSpiderableNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getNodeIds.mockImplementation(() => [
      'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
      'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n'
    ])

    getNode.mockImplementation(() => (
      {
        rdfAbout: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
        rdfsLabel: 'Requirement',
        skosDefinition: 'One or more clear statements concerning the intended functionality of a System.',
        skosComment: null,
        skosExample: null,
        owlAnnotationProperties: {
          'http://webprotege.stanford.edu/R9S1rcldeHXCMGJUZEkvaWJ': 'Functional rquirement, non-functional requirement',
          'http://www.w3.org/2004/02/skos/core#definition': 'One or more clear statements concerning the intended functionality of a System.',
          'http://webprotege.stanford.edu/R8AWk6f00nQhiAoDl6ujohI': 'Handover',
          'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Design'
        },
        id: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
        label: 'Requirement',
      }
    ))

    const nodesConnections = {
      'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb': [{
        from: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
        to: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
        id: 'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv'
      },
      {
        from: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
        to: 'http://webprotege.stanford.edu/R8Pp0U9lbiy2Wpdm6YzyV5m',
        id: 'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8'
      },
      ],
      'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n': [{
        from: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
        to: 'http://webprotege.stanford.edu/RTyCIe0sZbCvkp6VVWaYGs',
        id: SUB_CLASS_OF_ID
      }]
    }

    await highlightSpiderableNodes({
      nodesConnections,
      triplesPerNode,
    })

    expect(updateNodes.mock.calls).toEqual([
      [
        {
          borderWidth: 2,
          color: {
            border: '#ff6f61',
          },
          id: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
        },
      ],
      [
        {
          borderWidth: 2,
          color: {
            border: '#ff6f61',
          },
          id: 'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
        },
      ],
    ])
  })
})
