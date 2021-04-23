/* eslint max-len:0 */
import { JSDOM } from 'jsdom'
import exportOwl from '../../../utils/exportSettings/exportOwl'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'

jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

const updateStoreValue = jest.fn()
const exportFileName = 'filename'
const t = (id) => en[id]
const appendChild = jest.fn()
const remove = jest.fn()
const removeChild = jest.fn()
const click = jest.fn()

global.document.createElement = jest.fn().mockImplementation(() => ({
  style: {
    display: 'block'
  },
  remove: () => remove,
  click
}))

global.document.body.appendChild = jest.fn().mockImplementation(appendChild)
global.document.body.removeChild = jest.fn().mockImplementation(removeChild)

describe('exportOwl', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
  })

  it('should catch error', async () => {
    httpCall.mockImplementation(() => (
      { error: 'apiRequestError' }
    ))

    await exportOwl({
      exportFileName,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not export data as Owl file',
      type: 'warning'
    })
  })

  it('should work correctly', async () => {
    const currentCreateObjectURL = URL.createObjectURL
    const createObjectURLMock = jest.fn()
    URL.createObjectURL = () => createObjectURLMock()

    httpCall.mockImplementation(() => (
      { data: '<?xml version="1.0"?>' }
    ))

    await exportOwl({
      exportFileName,
      updateStoreValue,
      t
    })

    expect(appendChild).toHaveBeenCalled()
    expect(removeChild).toHaveBeenCalled()
    expect(createObjectURLMock).toHaveBeenCalled()
    expect(showNotification).toHaveBeenCalledWith({
      message: 'File can now be downloaded, check your browser!',
      type: 'success'
    })

    URL.createObjectURL = currentCreateObjectURL
  })
})
