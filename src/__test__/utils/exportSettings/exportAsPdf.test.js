import { JSDOM } from 'jsdom'
import { jsPDF } from 'jspdf'
import showNotification from '../../../utils/showNotification'
import exportAsPdf from '../../../utils/exportSettings/exportAsPdf'
import en from '../../../i18n/en'

jest.mock('jspdf')
jest.mock('../../../utils/showNotification')
const dom = new JSDOM()
const currentDocument = global.document
const currentWindow = global.window

global.document = dom.window.document
global.window = dom.window

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

const addImage = jest.fn()
const save = jest.fn()
jsPDF.mockImplementation(() => ({
  internal: {
    pageSize: {
      width: 200,
      height: 200
    }
  },
  addImage,
  save
}))

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

describe('exportAsPdf', () => {
  afterEach(() => {
    jest.clearAllMocks()
    global.document = currentDocument
    global.window = currentWindow
  })

  it('should work correctly', async () => {
    await exportAsPdf({
      exportFileName,
      canvasElement,
      t
    })

    expect(drawImage).toHaveBeenCalled()

    expect(addImage).toHaveBeenCalledWith(
      'data:image/octet-stream;base64', 'PNG', 10, 10, 180, 180, undefined, 'FAST'
    )

    expect(save).toHaveBeenCalledWith(
      'filename.pdf'
    )

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'File can now be downloaded, check your browser!',
        type: 'success'
      }
    )
  })
})
