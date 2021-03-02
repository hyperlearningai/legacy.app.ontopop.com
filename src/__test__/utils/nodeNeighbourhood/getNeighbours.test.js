import { DataSet } from 'vis-data'
import store from '../../../store'
import getNeighbours from '../../../utils/nodeNeighbourhood/getNeighbours'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew.js'

const selectedNodeId = '12'
const deletedNodes = []

const edges = Object.keys(objectPropertiesFromApi).map((property) => ({
  ...objectPropertiesFromApi[property],
  predicate: objectPropertiesFromApi[property].id.toString(),
  from: objectPropertiesFromApi[property].from.toString(),
  to: objectPropertiesFromApi[property].to.toString(),
}))

store.getState = jest.fn().mockImplementation(() => ({
  edgesPerNode,
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
      ['12', '51', '53', '70', '105', '191', '127', '44', '140', '182']
    )
  })

  it('should work correctly when separationDegree = 2', () => {
    const separationDegree = 2

    const result = getNeighbours({
      selectedNodeId,
      separationDegree,
    })

    expect(result).toEqual(
      ['12', '51', '53', '70', '105', '191', '127',
        '44', '140', '182', '9', '21', '25', '33', '47',
        '50', '62', '112', '189', '87', '176', '94', '165',
        '101', '149', '178', '60', '92', '115', '2', '146',
        '34', '38', '42', '49', '24', '163', '192', '147',
        '179', '141', '90', '122', '58', '148', '72', '155',
        '85', '188', '67', '131', '144', '126', '158', '171',
        '152', '13', '28', '30', '55', '59', '66', '113', '160',
        '181', '91', '161', '170', '119', '104', '130', '194', '169',
        '99', '114', '184', '7', '15', '46', '63', '71', '79', '81', '83',
        '110', '138', '137']
    )
  })
})
