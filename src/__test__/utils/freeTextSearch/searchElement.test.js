import searchElement from '../../../utils/freeTextSearch/searchElement'
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

describe('searchElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set freeTextSelection as empty when no seasrch', async () => {
    const search = ''

    await searchElement({
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { }
    )
  })

  it('should set freeTextSelection', async () => {
    const search = 'pro'

    getNodeIds.mockImplementation(() => ([
      '1',
      '2'
    ]))
    getEdgeIds.mockImplementation(() => ([
      '11',
      '12'
    ]))

    await searchElement({
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { 1: 'node', 12: 'edge', 2: 'node' }
    )
  })
})
