/* eslint max-len:0 */
/* eslint new-cap:0 */
import JSZip from 'jszip'
import store from '../../../store'
import exportCsv from '../../../utils/exportSettings/exportCsv'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { availableNodes } from '../../fixtures/availableNodesNormalised'
import { availableEdges } from '../../fixtures/availableEdgesNormalised'
import en from '../../../i18n/en'
import showNotification from '../../../utils/showNotification'

const fileMock = jest.fn()
const generateAsyncMock = jest.fn()

jest.mock('../../../utils/showNotification')
jest.mock('jszip')

const getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  availableEdges,
  objectPropertiesFromApi: OwlObjectProperties
}))
store.getState = getState

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
