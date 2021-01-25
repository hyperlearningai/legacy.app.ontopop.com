/* eslint max-len:0 */
/* eslint new-cap:0 */
import JSZip from 'jszip'
import { store } from 'react-notifications-component'
import exportCsv from '../../utils/exportCsv'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { availableEdgesNormalised } from '../fixtures/availableEdgesNormalised'
import { availableNodesNormalised } from '../fixtures/availableNodesNormalised'
import en from '../../i18n/en'

const fileMock = jest.fn()
const generateAsyncMock = jest.fn()

jest.mock('jszip')

describe('exportCsv', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return right object', async () => {
    const addNotificationMock = jest.fn()
    store.addNotification = addNotificationMock

    JSZip.mockImplementation(() => (
      {
        file: fileMock,
        generateAsync: () => Promise.resolve((blob) => generateAsyncMock(blob))
      }
    ))

    const exportFileName = 'file'
    const t = (id) => en[id]

    const objectPropertiesFromApi = OwlObjectProperties

    await exportCsv({
      exportFileName,
      availableNodesNormalised,
      availableEdgesNormalised,
      objectPropertiesFromApi,
      t
    })

    expect(fileMock).toHaveBeenCalledTimes(2)
    expect(addNotificationMock).toHaveBeenCalledWith(
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
