import { DataSet } from 'vis-data'
import store from '../../../store'
import getNeighbours from '../../../utils/nodeNeighbourhood/getNeighbours'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode.js'

const selectedNodeId = '12'
const deletedNodes = []

const edges = Object.keys(objectPropertiesFromApi).map((property) => ({
  ...objectPropertiesFromApi[property],
  predicate: objectPropertiesFromApi[property].id.toString(),
  from: objectPropertiesFromApi[property].from.toString(),
  to: objectPropertiesFromApi[property].to.toString(),
}))

store.getState = jest.fn().mockImplementation(() => ({
  totalEdgesPerNode,
  availableEdges: new DataSet(edges),
  deletedNodes,
  objectPropertiesFromApi
}))

describe('getNeighbours', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when separationDegree = 0', async () => {
    const separationDegree = 0

    const result = getNeighbours({
      selectedNodeId,
      separationDegree,
    })

    expect(result).toEqual(['12'])
  })

  it('should work correctly when separationDegree = 1', async () => {
    const separationDegree = 1

    const result = getNeighbours({
      selectedNodeId,
      separationDegree,
    })

    expect(result).toEqual(
      [
        '12',
        '73',
        '19',
        '54',
        '109',
        '56',
        '47',
        '133',
        '146',
        '189',
        '198',
        '2496',
        '4000',
      ]
    )
  })

  it('should work correctly when separationDegree = 2', () => {
    const separationDegree = 2

    const result = getNeighbours({
      selectedNodeId,
      separationDegree,
    })

    expect(result).toEqual(
      [
        '12',
        '73',
        '19',
        '54',
        '109',
        '56',
        '47',
        '133',
        '146',
        '189',
        '198',
        '2496',
        '4000',
        '13',
        '30',
        '32',
        '53',
        '58',
        '62',
        '63',
        '69',
        '150',
        '167',
        '118',
        '162',
        '168',
        '9',
        '188',
        '177',
        '94',
        '103',
        '108',
        '124',
        '128',
        '136',
        '156',
        '176',
        '196',
        '201',
        '2420',
        '2459',
        '2517',
        '2590',
        '2609',
        '2700',
        '2772',
        '2793',
        '3352',
        '3573',
        '3631',
        '3689',
        '3868',
        '154',
        '183',
        '170',
        '23',
        '27',
        '36',
        '50',
        '65',
        '90',
        '95',
        '97',
        '99',
        '105',
        '117',
        '120',
        '155',
        '172',
        '185',
        '119',
        '191',
        '2181',
        '2',
        '37',
        '41',
        '45',
        '52',
        '152',
        '26',
        '199',
        '61',
        '70',
        '75',
        '88',
        '93',
        '127',
        '132',
        '137',
        '147',
        '153',
        '159',
        '165',
        '178',
        '186',
        '195',
        '3178',
        '4008',
        '2964',
        '143',
        '4004',
        '7',
        '16',
        '49',
        '66',
        '74',
        '82',
        '84',
        '86',
        '115',
        '144',
        '35',
        '80',
        '134',
        '111',
        '106',
        '169',
        '14',
      ]
    )
  })
})
