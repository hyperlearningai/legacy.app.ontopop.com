import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD,
  ALGO_TYPE_SHORTEST_PATH,
  ALGO_TYPE_BOUNDING_BOX,
  ALGO_TYPE_NODES_FILTER,
  ALGO_TYPE_EDGES_FILTER
} from '../../../constants/algorithms'
import setNodesIdsToDisplay from '../../../utils/graphVisualisation/setNodesIdsToDisplay'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import store from '../../../store'
import getNeighbours from '../../../utils/nodeNeighbourhood/getNeighbours'
import getNodesFromPaths from '../../../utils/shortestPath/getNodesFromPaths'
import getNodesFromNodesFilters from '../../../utils/nodesFilter/getNodesFromNodesFilters'
import getNodesEdgesFromEdgesFilters from '../../../utils/edgesFilter/getNodesEdgesFromEdgesFilters'

const setStoreState = jest.fn()

jest.mock('../../../utils/nodeNeighbourhood/getNeighbours')
jest.mock('../../../utils/shortestPath/getNodesFromPaths')
jest.mock('../../../utils/nodesFilter/getNodesFromNodesFilters')
jest.mock('../../../utils/edgesFilter/getNodesEdgesFromEdgesFilters')

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  objectPropertiesFromApi,
  nodesIdsToDisplay: ['123'],
  deletedNodes: []
}))

describe('setNodesIdsToDisplay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when ALGO_TYPE_FULL', async () => {
    const type = ALGO_TYPE_FULL

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options: {}
    })

    expect(setStoreState.mock.calls).toEqual(
      [
        [
          'highlightedNodes',
          [],
        ],
        [
          'isNodeOverlay',
          false,
        ],
        [
          'shortestPathNodes',
          [],
        ],
        [
          'shortestPathResults',
          [],
        ],
        [
          'nodesIdsToDisplay',
          [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            '32',
            '33',
            '34',
            '35',
            '36',
            '37',
            '38',
            '39',
            '40',
            '41',
            '42',
            '43',
            '44',
            '45',
            '46',
            '47',
            '48',
            '49',
            '50',
            '51',
            '52',
            '53',
            '54',
            '55',
            '56',
            '57',
            '58',
            '59',
            '60',
            '61',
            '62',
            '63',
            '64',
            '65',
            '66',
            '67',
            '68',
            '69',
            '70',
            '71',
            '72',
            '73',
            '74',
            '75',
            '76',
            '77',
            '78',
            '79',
            '80',
            '81',
            '82',
            '83',
            '84',
            '85',
            '86',
            '87',
            '88',
            '89',
            '90',
            '91',
            '92',
            '93',
            '94',
            '95',
            '96',
            '97',
            '98',
            '99',
            '100',
            '101',
            '102',
            '103',
            '104',
            '105',
            '106',
            '107',
            '108',
            '109',
            '110',
            '111',
            '112',
            '113',
            '114',
            '115',
            '116',
            '117',
            '118',
            '119',
            '120',
            '121',
            '122',
            '123',
            '124',
            '125',
            '126',
            '127',
            '128',
            '129',
            '130',
            '131',
            '132',
            '133',
            '134',
            '135',
            '136',
            '137',
            '138',
            '139',
            '140',
            '141',
            '142',
            '143',
            '144',
            '145',
            '146',
            '147',
            '148',
            '149',
            '150',
            '151',
            '152',
            '153',
            '154',
            '155',
            '156',
            '157',
            '158',
            '159',
            '160',
            '161',
            '162',
            '163',
            '164',
            '165',
            '166',
            '167',
            '168',
            '169',
            '170',
            '171',
            '172',
            '173',
            '174',
            '175',
            '176',
            '177',
            '178',
            '179',
            '180',
            '181',
            '182',
            '183',
            '184',
            '185',
            '186',
            '187',
            '188',
            '189',
            '190',
            '191',
            '192',
            '193',
            '194',
            '195',
            '196',
          ],
        ],
      ]
    )
  })

  it('should work correctly when ALGO_TYPE_BOUNDING_BOX', async () => {
    const type = ALGO_TYPE_BOUNDING_BOX

    const options = {
      selectedBoundingBoxNodes: [{ id: '12' }, { id: '24' }],
    }

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'shortestPathNodes',
        [],
      ],
      [
        'shortestPathResults',
        [],
      ],
      [
        'nodesIdsToDisplay',
        [
          '12',
          '24',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_NEIGHBOURHOOD', async () => {
    const type = ALGO_TYPE_NEIGHBOURHOOD

    const options = {
      selectedNodeId: '12',
      separationDegree: 1,
      triplesPerNode
    }

    getNeighbours.mockImplementation(() => ({
      neighbourNodes: ['24', '36'],
      neighbourEdges: ['111']
    }))

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'shortestPathNodes',
        [],
      ],
      [
        'shortestPathResults',
        [],
      ],
      [
        'nodesIdsToDisplay',
        {
          neighbourEdges: [
            '111',
          ],
          neighbourNodes: [
            '24',
            '36',
          ],
        },
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_SHORTEST_PATH', async () => {
    const type = ALGO_TYPE_SHORTEST_PATH

    const options = {
      shortestPathSelectedNodes: [
        '24', '48'
      ],
      shortestPathResults: [
        '111_112'
      ],
      isNodeOverlay: true
    }

    getNodesFromPaths.mockImplementation(() => ({
      shortestPathNodes: ['24', '36', '48'],
      shortestPathEdges: ['111', '112']
    }))

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [
          '24',
          '48',
        ],
      ],
      [
        'isNodeOverlay',
        true,
      ],
      [
        'shortestPathNodes',
        {
          shortestPathEdges: [
            '111',
            '112',
          ],
          shortestPathNodes: [
            '24',
            '36',
            '48',
          ],
        },
      ],
      [
        'shortestPathResults',
        [
          '111_112',
        ],
      ],
      [
        'nodesIdsToDisplay',
        [
          '123',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_SHORTEST_PATH and no overlay', async () => {
    const type = ALGO_TYPE_SHORTEST_PATH

    const options = {
      shortestPathSelectedNodes: [
        '24', '48'
      ],
      shortestPathResults: [
        '111_112'
      ],
      isNodeOverlay: false
    }

    getNodesFromPaths.mockImplementation(() => ({
      shortestPathNodes: ['24', '36', '48'],
      shortestPathEdges: ['111', '112']
    }))

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [
          '24',
          '48',
        ],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'shortestPathNodes',
        [],
      ],
      [
        'shortestPathResults',
        [
          '111_112',
        ],
      ],
      [
        'nodesIdsToDisplay',
        {
          shortestPathEdges: [
            '111',
            '112',
          ],
          shortestPathNodes: [
            '24',
            '36',
            '48',
          ],
        },
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_NODES_FILTER', async () => {
    const type = ALGO_TYPE_NODES_FILTER

    const options = {
      nodesFilters: [{
        property: 'rdfsLabel',
        value: 'road'
      }]
    }

    getNodesFromNodesFilters.mockImplementation(() => ([
      '12',
      '14'
    ]))

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'shortestPathNodes',
        [],
      ],
      [
        'shortestPathResults',
        [],
      ],
      [
        'nodesIdsToDisplay',
        [
          '12',
          '14',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_EDGES_FILTER', async () => {
    const type = ALGO_TYPE_EDGES_FILTER

    const options = {
      edgesFilters: [{
        property: 'rdfsLabel',
        value: 'comp'
      }]
    }

    getNodesEdgesFromEdgesFilters.mockImplementation(() => (['11', '12']))

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'shortestPathNodes',
        [],
      ],
      [
        'shortestPathResults',
        [],
      ],
      [
        'nodesIdsToDisplay',
        [
          '11',
          '12',
        ],
      ],
    ])
  })
})
