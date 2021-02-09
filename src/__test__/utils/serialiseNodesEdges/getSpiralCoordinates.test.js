import getSpiralCoordinates from '../../../utils/serialiseNodesEdges/getSpiralCoordinates'

describe('getSpiralCoordinates', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return x-y', async () => {
    const circleMax = 1
    const padding = 1
    const step = 1
    const angle = 1

    expect(getSpiralCoordinates({
      circleMax,
      padding,
      step,
      angle
    })).toEqual({
      x: -0.6023373578795136,
      y: 2.7635465813520725
    })
  })
})
