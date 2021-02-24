import { DataSet } from 'vis-data'
import store from '../../../store'
import getNeighbours from '../../../utils/nodeNeighbourhood/getNeighbours'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { triplesPerNode } from '../../fixtures/triplesPerNodeNew.js'

const selectedNodeId = '12'
const deletedNodes = []

const edges = Object.keys(objectPropertiesFromApi).map((property) => ({
  ...objectPropertiesFromApi[property],
  predicate: objectPropertiesFromApi[property].id.toString(),
  from: objectPropertiesFromApi[property].sourceNodeId.toString(),
  to: objectPropertiesFromApi[property].targetNodeId.toString(),
}))

store.getState = jest.fn().mockImplementation(() => ({
  triplesPerNode,
  availableEdges: new DataSet(edges),
  deletedNodes
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
      ['12', '105', '51', '70', '53', '191', '127', '44', '140', '182']
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
        '12', '105', '51', '70', '53', '191', '127',
        '44', '140', '182', '114', '194', '160', '149', '184',
        '9', '21', '25', '33', '47', '50', '62', '112', '189', '87',
        '176', '94', '165', '101', '178', '60', '92', '115', '13', '28',
        '30', '55', '59', '66', '161', '113', '181', '91', '155', '148',
        '144', '170', '122', '119', '104', '130', '169', '99', '2', '24',
        '34', '38', '42', '49', '146', '163', '192', '147', '179', '141',
        '90', '58', '72', '85', '188', '67', '131', '126', '158', '171', '152',
        '7', '15', '46', '63', '71', '79', '81', '83', '110', '138', '137'
      ]
    )
  })
})
