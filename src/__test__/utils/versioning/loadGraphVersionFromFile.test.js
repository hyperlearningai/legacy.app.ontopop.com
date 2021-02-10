import loadGraphVersionFromFile from '../../../utils/versioning/loadGraphVersionFromFile'
import en from '../../../i18n/en'

const setLoading = jest.fn()
const addToObject = jest.fn()
const t = (id) => en[id]
const readAsText = jest.fn()

FileReader.prototype.readAsText = readAsText

describe('loadGraphVersionFromFile', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be false if key missing', async () => {
    const files = [{
      name: 'test'
    }]

    await loadGraphVersionFromFile({
      addToObject,
      files,
      setLoading,
      t
    })

    expect(readAsText).toHaveBeenCalledWith(files[0])
  })
})
