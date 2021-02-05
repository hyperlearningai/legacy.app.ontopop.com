/* eslint max-len:0 */
import { JSDOM } from 'jsdom'
import { store } from 'react-notifications-component'
import saveGraphVersion from '../../../utils/versioning/saveGraphVersion'
import en from '../../../i18n/en'
import showNotification from '../../../utils/showNotification'

const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

jest.mock('../../../utils/showNotification')
const t = (id) => en[id]
const appendChild = jest.fn()
const remove = jest.fn()
const removeChild = jest.fn()
const click = jest.fn()

const currentCreateObjectURL = URL.createObjectURL
const createObjectURLMock = jest.fn()
URL.createObjectURL = () => createObjectURLMock()

global.document.createElement = jest.fn().mockImplementation(() => ({
  style: {
    display: 'block'
  },
  remove: () => remove,
  click
}))

global.document.body.appendChild = jest.fn().mockImplementation(appendChild)
global.document.body.removeChild = jest.fn().mockImplementation(removeChild)

describe('saveGraphVersion', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
    URL.createObjectURL = currentCreateObjectURL
  })

  it('should work correctly when saving to file', async () => {
    const location = 'file'
    const selectedVersion = 'original'

    await saveGraphVersion({
      location,
      selectedVersion,
      t
    })

    expect(appendChild).toHaveBeenCalled()
    expect(removeChild).toHaveBeenCalled()
    expect(createObjectURLMock).toHaveBeenCalled()
    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'File can now be downloaded, check your browser!',
        type: 'success'
      }
    )
  })

  it('should work correctly when saving to server', async () => {
    const location = 'server'
    const selectedVersion = 'original'

    const getState = jest.fn().mockImplementation(() => ({
      graphVersions: {
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
      }
    }))
    store.getState = getState

    const setItem = jest.fn()

    Storage.prototype.setItem = setItem

    await saveGraphVersion({
      location,
      selectedVersion,
      t
    })

    expect(setItem).toHaveBeenCalledWith(
      'graphVersions', '{"original":{"classesFromApi":{},"objectPropertiesFromApi":{},"classesFromApiBackup":{},"objectPropertiesFromApiBackup":{},"deletedNodes":[],"addedNodes":[],"updatedNodes":[],"deletedEdges":[],"addedEdges":[],"updatedEdges":[]}}'
    )

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Graph version stored to server!',
        type: 'success'
      }
    )
  })

  it('should work correctly when saving to server and with existing storage', async () => {
    const location = 'server'
    const selectedVersion = 'original'

    const getState = jest.fn().mockImplementation(() => ({
      graphVersions: {
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
      }
    }))
    store.getState = getState

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify({
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
    }))

    const setItem = jest.fn()
    Storage.prototype.setItem = setItem
    Storage.prototype.getItem = getItem

    await saveGraphVersion({
      location,
      selectedVersion,
      t
    })

    expect(setItem).toHaveBeenCalledWith(
      'graphVersions', '{"test":{"classesFromApi":{},"objectPropertiesFromApi":{},"classesFromApiBackup":{},"objectPropertiesFromApiBackup":{},"deletedNodes":[],"addedNodes":[],"updatedNodes":[],"deletedEdges":[],"addedEdges":[],"updatedEdges":[]},"original":{"classesFromApi":{},"objectPropertiesFromApi":{},"classesFromApiBackup":{},"objectPropertiesFromApiBackup":{},"deletedNodes":[],"addedNodes":[],"updatedNodes":[],"deletedEdges":[],"addedEdges":[],"updatedEdges":[]}}'
    )

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Graph version stored to server!',
        type: 'success'
      }
    )
  })
})
