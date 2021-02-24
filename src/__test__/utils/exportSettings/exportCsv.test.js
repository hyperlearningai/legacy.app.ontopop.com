/* eslint max-len:0 */
/* eslint new-cap:0 */
import JSZip from 'jszip'
import exportCsv from '../../../utils/exportSettings/exportCsv'
import en from '../../../i18n/en'
import showNotification from '../../../utils/notifications/showNotification'

const fileMock = jest.fn()
const generateAsyncMock = jest.fn()

jest.mock('../../../utils/notifications/showNotification')
jest.mock('jszip')

describe('exportCsv', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return right object', async () => {
    JSZip.mockImplementation(() => (
      {
        file: fileMock,
        generateAsync: () => Promise.resolve((blob) => generateAsyncMock(blob))
      }
    ))

    const exportFileName = 'file'
    const t = (id) => en[id]

    await exportCsv({
      exportFileName,
      t
    })

    expect(fileMock).toHaveBeenCalledTimes(2)
    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'File can now be downloaded, check your browser!',
        type: 'success'
      }
    )
  })
})
