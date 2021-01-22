import getShortestPath from '../../utils/getShortestPath'
import { nodesConnections } from '../fixtures/nodesConnections'

describe('getShortestPath', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return no paths', async () => {
    const shortestPathSelectedNodes = [
      'http://webprotege.stanford.edu/R8VPKVDGeDVRPQznK4rL0ea',
      'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd'
    ]

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesConnections
    })

    expect(paths).toEqual([])
  })

  it('should return 1 path', async () => {
    const shortestPathSelectedNodes = [
      'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV',
      'http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
    ]

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesConnections
    })

    expect(paths).toEqual([
      'http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV|||http://webprotege.stanford.edu/R8fzvBl85R2Nc2SqsikiKp9___http://webprotege.stanford.edu/R7Ae7UPY2C3UrcNeeLv0gYV___http://webprotege.stanford.edu/RJVpffoomVWohIDaJCykd9'
    ])
  })

  it('should return 2 paths', async () => {
    const shortestPathSelectedNodes = [
      'http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c',
      'http://webprotege.stanford.edu/RBQ9bNT1jSrdUHMAQ1AjJbE'
    ]

    const paths = await getShortestPath({
      shortestPathSelectedNodes,
      nodesConnections
    })

    expect(paths).toEqual([
      'http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c|||http://webprotege.stanford.edu/RDHyoSHFDLL9G8kmD2B11Go___http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R83hFPamR9Qma90o0ltJtC7___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R7f3MFJaUN2W4LPV62BVWCH___http://webprotege.stanford.edu/R38bVK9Zi5QjtDMV6gIvgv___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc|||http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv___http://webprotege.stanford.edu/R88oLttBTPxhZOBkekr7j10___http://webprotege.stanford.edu/R38bVK9Zi5QjtDMV6gIvgv|||http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay___http://webprotege.stanford.edu/R88oLttBTPxhZOBkekr7j10___http://webprotege.stanford.edu/RBQ9bNT1jSrdUHMAQ1AjJbE',
      'http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c|||http://webprotege.stanford.edu/RDHyoSHFDLL9G8kmD2B11Go___http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R83hFPamR9Qma90o0ltJtC7___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R7f3MFJaUN2W4LPV62BVWCH___http://webprotege.stanford.edu/R7QbRSvuFm0H5qc2dZOD3MT___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc|||http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay___http://webprotege.stanford.edu/RCXzH6nTutSI75cTg53tH8q___http://webprotege.stanford.edu/R7QbRSvuFm0H5qc2dZOD3MT|||http://webprotege.stanford.edu/R7V7p8sdl5TpSs0cd7gZvqr___http://webprotege.stanford.edu/RBQ9bNT1jSrdUHMAQ1AjJbE___http://webprotege.stanford.edu/RCXzH6nTutSI75cTg53tH8q'
    ])
  })
})
