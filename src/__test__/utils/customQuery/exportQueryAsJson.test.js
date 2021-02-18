/* eslint max-len:0 */
import { JSDOM } from 'jsdom'
import store from '../../../store'
import showNotification from '../../../utils/notifications/showNotification'
import exportQueryAsJson from '../../../utils/customQuery/exportQueryAsJson'
import en from '../../../i18n/en'

jest.mock('../../../utils/notifications/showNotification')
const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

store.getState = () => ({
  customQueryFromLatestOutput: 'g.V()',
  customQueryOutput: {
    items: []
  }
})

const exportFileName = 'filename'
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

describe('exportQueryAsJson', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
    URL.createObjectURL = currentCreateObjectURL
  })

  it('should work correctly', async () => {
    await exportQueryAsJson({
      exportFileName,
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
})
