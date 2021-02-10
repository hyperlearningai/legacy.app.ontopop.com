/* eslint max-len:0 */
import setGraphVersion from '../../../utils/versioning/setGraphVersion'
import store from '../../../store'
import { GRAPH_VERSION_STRUCTURE } from '../../../constants/graph'

const setStoreState = jest.fn()
const addToObject = jest.fn()
const selectedVersion = 'original'
const versionName = 'test'
const getState = jest.fn().mockImplementation(() => ({
  graphVersions: {
    original: {
      classesFromApi: {

      },
      objectPropertiesFromApi: {

      },
    }
  }
}))
store.getState = getState

describe('setGraphVersion', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when search mode', async () => {
    const mode = 'search'

    await setGraphVersion({
      mode,
      selectedVersion,
      versionName,
      setStoreState,
      addToObject
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'selectedGraphVersion', 'original'
    )
  })

  it('should work correctly when new mode', async () => {
    const mode = 'new'

    await setGraphVersion({
      mode,
      selectedVersion,
      versionName,
      setStoreState,
      addToObject
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'selectedGraphVersion', 'test'
    )

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions', 'test', {
        ...GRAPH_VERSION_STRUCTURE,
        classesFromApi: {},
        objectPropertiesFromApi: {},
        classesFromApiBackup: {},
        objectPropertiesFromApiBackup: {},
      }
    )
  })
})