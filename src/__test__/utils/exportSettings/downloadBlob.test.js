import downloadBlob from '../../../utils/exportSettings/downloadBlob'

describe('downloadBlob', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the right functions when csv', async () => {
    const createObjectURLStub = jest.fn()

    window.URL = {
      createObjectURL: createObjectURLStub
    }

    const blob = []
    const fileName = 'test'

    await downloadBlob({
      blob,
      fileName
    })

    expect(createObjectURLStub).toHaveBeenCalledWith(blob)
  })
})
