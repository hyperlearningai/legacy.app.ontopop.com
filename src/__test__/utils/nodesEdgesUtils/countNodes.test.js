import { DataSet } from 'vis-data'
import store from '../../../store'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'

describe('countNodes', () => {
  it('should count all nodes', () => {
    const availableNodes = new DataSet([{
      id: 123
    }])
    store.getState = () => ({
      availableNodes
    })

    expect(countNodes()).toEqual(1)
  })
})
