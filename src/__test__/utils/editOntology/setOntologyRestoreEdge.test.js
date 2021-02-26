/* eslint max-len:0 */
import setOntologyRestoreEdge from '../../../utils/editOntology/setOntologyRestoreEdge'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreEdge'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setEdgeStylesByProperty from '../../../utils/networkStyling/setEdgeStylesByProperty'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

const selectedElement = [
  '11'
]
const setStoreState = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setEdgeStylesByProperty')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('setOntologyRestoreEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const objectPropertiesFromApiLatest = JSON.parse(JSON.stringify(objectPropertiesFromApi))
    delete objectPropertiesFromApiLatest[selectedElement[0]]

    store.getState = jest.fn().mockImplementation(() => ({
      objectPropertiesFromApi,
      deletedEdges: [selectedElement[0]],
      nodesEdges: {
        1: [],
        141: [],
      },
      edgesPerNode,
      objectPropertiesFromApiBackup: objectPropertiesFromApi,
      stylingEdgeCaptionProperty: 'rdfsLabel',
    }))

    getNode.mockImplementation(() => ({ id: '123' }))

    await setOntologyRestoreEdge({
      selectedElement,
      setStoreState,
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      from: '1',
      id: '11',
      edgeId: 11,
      label: 'Subclass of',
      rdfsLabel: 'Subclass of',
      role: 'Subclass of',
      to: '141',
      userDefined: false
    })

    expect(setEdgeStylesByProperty).toHaveBeenLastCalledWith(
      { edgeId: '11' }
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
