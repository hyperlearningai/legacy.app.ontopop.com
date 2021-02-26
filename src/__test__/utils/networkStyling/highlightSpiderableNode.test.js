/* eslint max-len:0 */
import { edgesPerNode } from '../../fixtures/edgesPerNode'
import highlightSpiderableNode from '../../../utils/networkStyling/highlightSpiderableNode'
import { SUB_CLASS_OF_ID } from '../../../constants/graph'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import store from '../../../store'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

describe('highlightSpiderableNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb'

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

    const nodesEdges = {
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

    store.getState = jest.fn().mockImplementationOnce(() => ({
      nodesEdges,
      edgesPerNode,
    }))

    await highlightSpiderableNode({
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledWith(
      {
        borderWidth: 2,
        color: {
          border: '#ff6f61',
        },
        id: 'http://webprotege.stanford.edu/RDzcOYLZOUKQWbhik8oL6wb',
      }
    )
  })
})
