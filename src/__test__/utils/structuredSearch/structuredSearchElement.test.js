import structuredSearchElement from '../../../utils/structuredSearch/structuredSearchElement'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'

const setStoreState = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  objectPropertiesFromApi,
}))

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')

getNodeIds.mockImplementation(() => Object.keys(classesFromApi))
getEdgeIds.mockImplementation(() => Object.keys(objectPropertiesFromApi))

describe('structuredSearchElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not call setStoreState when empty filters', async () => {
    const queryLogic = 'and'
    const filters = []

    await structuredSearchElement({
      filters,
      queryLogic,
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)
  })

  it('should not call setStoreState when filters with no value', async () => {
    const queryLogic = 'and'
    const filters = [{
      property: 'rdfAbout',
      value: ''
    }, {
      property: 'rdfsLabel',
      value: ''
    }]

    await structuredSearchElement({
      filters,
      queryLogic,
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledTimes(0)
  })

  it('should return correct results when AND query', async () => {
    const queryLogic = 'and'
    const filters = [{
      property: 'rdfsLabel',
      value: 'ro'
    }, {
      property: 'rdfsLabel',
      value: 'ad'
    }]

    await structuredSearchElement({
      filters,
      queryLogic,
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'structuredSelection',
      {
        1033: 'edge',
        104: 'node',
        1051: 'edge',
        1062: 'edge',
        1087: 'edge',
        110: 'node',
        1141: 'edge',
        12: 'edge',
        122: 'node',
        1221: 'edge',
        1222: 'edge',
        130: 'node',
        1391: 'edge',
        144: 'node',
        1442: 'edge',
        1463: 'edge',
        1472: 'edge',
        1475: 'edge',
        1502: 'edge',
        152: 'edge',
        161: 'node',
        1611: 'edge',
        1612: 'edge',
        1617: 'edge',
        177: 'node',
        1786: 'edge',
        18: 'node',
        180: 'node',
        1822: 'edge',
        184: 'node',
        1842: 'edge',
        1852: 'edge',
        186: 'node',
        1894: 'edge',
        1911: 'edge',
        1915: 'edge',
        1922: 'edge',
        1953: 'edge',
        2: 'node',
        212: 'edge',
        32: 'node',
        386: 'edge',
        452: 'edge',
        466: 'edge',
        492: 'edge',
        53: 'node',
        531: 'edge',
        603: 'edge',
        691: 'edge',
        693: 'edge',
        696: 'edge',
        697: 'edge',
        70: 'node',
        701: 'edge',
        709: 'edge',
        71: 'edge',
        732: 'edge',
        742: 'edge',
        76: 'node',
        81: 'node',
        871: 'edge',
        91: 'node',
        92: 'edge',
        99: 'node'
      }
    )
  })

  it('should return correct results when OR query', async () => {
    const queryLogic = 'or'
    const filters = [{
      property: 'rdfsLabel',
      value: 'ro'
    }, {
      property: 'rdfsLabel',
      value: 'ad'
    }]

    await structuredSearchElement({
      filters,
      queryLogic,
      setStoreState,
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'structuredSelection',
      {
        122: 'node',
        180: 'node',
        70: 'node',
        99: 'node'
      }
    )
  })
})
