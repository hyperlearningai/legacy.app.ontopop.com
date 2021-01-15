import { JSDOM } from 'jsdom'
import { store } from 'react-notifications-component'
import exportAsImage from '../../utils/exportAsImage'
import en from '../../i18n/en'

const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

const addNotification = jest.fn()
store.addNotification = addNotification
const exportFileName = 'filename'
const t = (id) => en[id]
const toDataURL = jest.fn()
const drawImage = jest.fn()
const appendChild = jest.fn()
const remove = jest.fn()
const removeChild = jest.fn()
const click = jest.fn()
const canvasElement = {
  toDataURL,
  width: 100,
  height: 100
}

global.document.createElement = jest.fn().mockImplementation(() => ({
  style: {
    display: 'block'
  },
  toDataURL: () => 'data:image/png;base64',
  remove: () => remove,
  getContext: (value) => ({
    value,
    fillRect: jest.fn(),
    drawImage
  }),
  click
}))

global.document.body.appendChild = jest.fn().mockImplementation(() => appendChild)
global.document.body.removeChild = jest.fn().mockImplementation(() => removeChild)

describe('exportAsImage', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
  })

  it('should work correctly', async () => {
    await exportAsImage({
      exportFileName,
      canvasElement,
      t
    })

    expect(drawImage).toHaveBeenCalled()
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
