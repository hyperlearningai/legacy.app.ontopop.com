/* eslint max-len:0 */
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteEdge'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

const selectedElement = [
  '11'
]
const setStoreState = jest.fn()

describe('setOntologyDeleteEdge', () => {
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
      deletedEdges: [],
      nodesEdges,
      edgesPerNode,
    }))

    await setOntologyDeleteEdge({
      setStoreState,
      selectedElement,
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      '11'
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
