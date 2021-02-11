import getNodesEdgesFromPaths from '../../../utils/shortestPath/getNodesEdgesFromPaths'
import store from '../../../store'

describe('getNodesEdgesFromPaths', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct list of nodes and edges', async () => {
    const shortestPathResults = [
      'http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c|||http://webprotege.stanford.edu/RDHyoSHFDLL9G8kmD2B11Go___http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R83hFPamR9Qma90o0ltJtC7___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R7f3MFJaUN2W4LPV62BVWCH___http://webprotege.stanford.edu/R38bVK9Zi5QjtDMV6gIvgv___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc|||http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv___http://webprotege.stanford.edu/R88oLttBTPxhZOBkekr7j10___http://webprotege.stanford.edu/R38bVK9Zi5QjtDMV6gIvgv|||http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay___http://webprotege.stanford.edu/R88oLttBTPxhZOBkekr7j10___http://webprotege.stanford.edu/RBQ9bNT1jSrdUHMAQ1AjJbE',
      'http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c|||http://webprotege.stanford.edu/RDHyoSHFDLL9G8kmD2B11Go___http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R83hFPamR9Qma90o0ltJtC7___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc___http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8|||http://webprotege.stanford.edu/R7f3MFJaUN2W4LPV62BVWCH___http://webprotege.stanford.edu/R7QbRSvuFm0H5qc2dZOD3MT___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc|||http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay___http://webprotege.stanford.edu/RCXzH6nTutSI75cTg53tH8q___http://webprotege.stanford.edu/R7QbRSvuFm0H5qc2dZOD3MT|||http://webprotege.stanford.edu/R7V7p8sdl5TpSs0cd7gZvqr___http://webprotege.stanford.edu/RBQ9bNT1jSrdUHMAQ1AjJbE___http://webprotege.stanford.edu/RCXzH6nTutSI75cTg53tH8q'
    ]
    store.getState = () => ({
      shortestPathResults
    })

    const output = await getNodesEdgesFromPaths()

    expect(output).toEqual({
      shortestPathEdges: [
        'http://webprotege.stanford.edu/RDHyoSHFDLL9G8kmD2B11Go',
        'http://webprotege.stanford.edu/R83hFPamR9Qma90o0ltJtC7',
        'http://webprotege.stanford.edu/R7f3MFJaUN2W4LPV62BVWCH',
        'http://webprotege.stanford.edu/RDPf9CwQ3tGAm44VWzOmbHv',
        'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay',
        'http://webprotege.stanford.edu/R7V7p8sdl5TpSs0cd7gZvqr'
      ],
      shortestPathNodes: [
        'http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c',
        'http://webprotege.stanford.edu/R8QQzkUbCD5WRXDQQSl0vX8',
        'http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc',
        'http://webprotege.stanford.edu/R38bVK9Zi5QjtDMV6gIvgv',
        'http://webprotege.stanford.edu/R88oLttBTPxhZOBkekr7j10',
        'http://webprotege.stanford.edu/RBQ9bNT1jSrdUHMAQ1AjJbE',
        'http://webprotege.stanford.edu/Ri0oPM0zRSfP4SuSH0S15c',
        'http://webprotege.stanford.edu/R7QbRSvuFm0H5qc2dZOD3MT',
        'http://webprotege.stanford.edu/RCXzH6nTutSI75cTg53tH8q'
      ]
    })
  })
})
