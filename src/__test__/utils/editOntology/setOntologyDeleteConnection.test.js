/* eslint max-len:0 */
import setOntologyDeleteConnection from '../../../utils/editOntology/setOntologyDeleteConnection'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteConnection'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import { nodesConnections } from '../../fixtures/nodesConnectionsNew'
import { triplesPerNode } from '../../fixtures/triplesPerNodeNew'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const selectedElement = [
  '11'
]
const setStoreState = jest.fn()

describe('setOntologyDeleteConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getEdge.mockImplementation(() => ({
      from: '1',
      to: '141'
    }))
    getNode.mockImplementation(() => ({
      id: '1',
    }))

    store.getState = jest.fn().mockImplementationOnce(() => ({
      classesFromApi,
      deletedConnections: [],
      nodesConnections,
      triplesPerNode,
    }))

    await setOntologyDeleteConnection({
      setStoreState,
      selectedElement,
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      '11'
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
