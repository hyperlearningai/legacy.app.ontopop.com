import { JSDOM } from 'jsdom'
import showNotification from '../../../utils/notifications/showNotification'
import exportAsImage from '../../../utils/exportSettings/exportAsImage'
import en from '../../../i18n/en'

jest.mock('../../../utils/notifications/showNotification')
const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

const exportFileName = 'filename'
const type = 'png'
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
      type,
      canvasElement,
      t
    })

    expect(drawImage).toHaveBeenCalled()
    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'File can now be downloaded, check your browser!',
        type: 'success'
      }
    )
  })
})
