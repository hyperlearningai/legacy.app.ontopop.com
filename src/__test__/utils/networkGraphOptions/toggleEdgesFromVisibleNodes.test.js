import toggleEdgesFromVisibleNodes from '../../../utils/networkGraphOptions/toggleEdgesFromVisibleNodes'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import toggleEdge from '../../../utils/networkGraphOptions/toggleEdge'
import updateStyleAndPhysics from '../../../utils/networkGraphOptions/updateStyleAndPhysics'
import setEdgesStyle from '../../../utils/networkStyling/setEdgesStyle'
import { OPERATION_TYPE_ADD } from '../../../constants/store'

const updateStoreValue = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/networkGraphOptions/updateStyleAndPhysics')
jest.mock('../../../utils/networkStyling/setEdgesStyle')
jest.mock('../../../utils/networkGraphOptions/toggleEdge')

store.getState = jest.fn().mockImplementation(() => ({
  graphData: {
    'graph-0': {
      hiddenNodes: ['1', '3']
    }
  },
  currentGraph: 'graph-0',
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  totalEdgesPerNode
}))

getNodeIds.mockImplementation(() => ['7'])

describe('toggleEdgesFromVisibleNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const visibleNodes = ['1', '3', '7', '177']

    await toggleEdgesFromVisibleNodes({
      visibleNodes,
      updateStoreValue,
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [['activeLoaders'], OPERATION_TYPE_ADD, 1],
        [['activeLoaders'], OPERATION_TYPE_ADD, -1],
      ]
    )
    expect(setEdgesStyle).toHaveBeenCalledWith()
    expect(toggleEdge).toHaveBeenLastCalledWith({
      edgeId: '11',
      updateStoreValue,
      isLastEdge: false
    })
    expect(updateStyleAndPhysics).toHaveBeenCalledWith({
      updateStoreValue
    })
  })
})
