/* eslint max-len:0 */
import loadGraphVersionFromServer from '../../../utils/versioning/loadGraphVersionFromServer'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { GRAPH_VERSION_STRUCTURE } from '../../../constants/graph'

const setStoreState = jest.fn()
const addToObject = jest.fn()
const classes = OwlClasses
const objectProperties = OwlObjectProperties

describe('loadGraphVersionFromServer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no storage item', async () => {
    await loadGraphVersionFromServer({
      setStoreState,
      addToObject,
      classes,
      objectProperties
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      {
        ...GRAPH_VERSION_STRUCTURE,
        classesFromApi: classes,
        objectPropertiesFromApi: objectProperties,
        classesFromApiBackup: classes,
        objectPropertiesFromApiBackup: objectProperties,
      }
    )
  })

  it('should work correctly when storage exists', async () => {
    const graphVersions = {
      original: {
        classesFromApi: {},
        objectPropertiesFromApi: {},
        classesFromApiBackup: {},
        objectPropertiesFromApiBackup: {},
        deletedNodes: [],
        addedNodes: [],
        updatedNodes: [],
        deletedEdges: [],
        addedEdges: [],
        updatedEdges: [],
      },
      test: {
        classesFromApi: {},
        objectPropertiesFromApi: {},
        classesFromApiBackup: {},
        objectPropertiesFromApiBackup: {},
        deletedNodes: [],
        addedNodes: [],
        updatedNodes: [],
        deletedEdges: [],
        addedEdges: [],
        updatedEdges: [],
      },
    }

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify(graphVersions))

    Storage.prototype.getItem = getItem

    await loadGraphVersionFromServer({
      setStoreState,
      addToObject,
      classes,
      objectProperties
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'graphVersions',
      graphVersions
    )
  })
})
