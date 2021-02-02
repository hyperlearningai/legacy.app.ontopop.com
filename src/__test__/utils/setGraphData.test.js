/* eslint max-len:0 */
import setGraphData from '../../utils/setGraphData'
import getAllTriplesPerNode from '../../utils/getAllTriplesPerNode'
import setNodesIdsToDisplay from '../../utils/setNodesIdsToDisplay'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { ALGO_TYPE_FULL } from '../../constants/algorithms'

jest.mock('../../utils/getAllTriplesPerNode')
jest.mock('../../utils/setNodesIdsToDisplay')
const setStoreState = jest.fn()
const addToObject = jest.fn()
const classes = OwlClasses
const objectProperties = OwlObjectProperties
const graphName = 'test'

describe('setGraphData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setGraphData({
      setStoreState,
      addToObject,
      classes,
      objectProperties,
      graphName
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'classesFromApi', classes
      ],
      [
        'objectPropertiesFromApi', objectProperties
      ]
    ])
    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions', 'test', {
        classesFromApi: classes,
        objectPropertiesFromApi: objectProperties,
        classesFromApiBackup: classes,
        objectPropertiesFromApiBackup: objectProperties,
        deletedNodes: [],
        addedNodes: [],
        udpatedNodes: []
      }
    )
    expect(getAllTriplesPerNode).toHaveBeenCalledWith({
      classesIds: Object.keys(classes),
      predicatesIds: Object.keys(objectProperties),
      setStoreState,
      classesFromApi: classes
    })
    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      type: ALGO_TYPE_FULL,
      classesFromApi: classes,
      objectPropertiesFromApi: objectProperties,
      setStoreState
    })
  })
})
