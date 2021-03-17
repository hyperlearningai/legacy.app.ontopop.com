import getNodesFromPaths from '../../../utils/shortestPath/getNodesFromPaths'
import store from '../../../store'
import { availableEdges } from '../../fixtures/availableEdges'

describe('getNodesFromPaths', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct list of nodes and edges', async () => {
    const shortestPathResults = [
      '1|||11|||12',
    ]

    store.getState = jest.fn().mockImplementation(() => ({
      availableEdges
    }))

    expect(getNodesFromPaths({
      shortestPathResults
    })).toEqual([
      '1',
      '177',
      '147',
    ])
  })
})
