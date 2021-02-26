/* eslint max-len:0 */
import { JSDOM } from 'jsdom'
import { store } from 'react-notifications-component'
import exportOwl from '../../../utils/exportSettings/exportOwl'
import en from '../../../i18n/en'

const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

const addNotification = jest.fn()
store.addNotification = addNotification
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

describe('exportOwl', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
    URL.createObjectURL = currentCreateObjectURL
  })

  it('should work correctly', async () => {
    await exportOwl({
      exportFileName,
      t
    })

    expect(appendChild).toHaveBeenCalled()
    expect(removeChild).toHaveBeenCalled()
    expect(createObjectURLMock).toHaveBeenCalled()
    expect(addNotification).toHaveBeenCalledWith(
      {
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        container: 'bottom-left',
        dismiss: { duration: 3000, onScreen: true },
        insert: 'top',
        message: 'File can now be downloaded, check your browser!',
        title: '',
        type: 'success'
      }
    )
  })
})
