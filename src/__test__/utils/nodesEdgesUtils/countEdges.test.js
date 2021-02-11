import { DataSet } from 'vis-data'
import store from '../../../store'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'

describe('countEdges', () => {
  it('should count all edges', () => {
    const availableEdges = new DataSet([{
      id: 123
    }])
    store.getState = () => ({
      availableEdges
    })

    expect(countEdges()).toEqual(1)
  })
})
