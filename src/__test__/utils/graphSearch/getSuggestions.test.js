import getSuggestions from '../../../utils/graphSearch/getSuggestions'

const setSuggestions = jest.fn()

describe('getSuggestions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const query = 'road'

    await getSuggestions({
      query,
      suggestions: [],
      setSuggestions
    })

    expect(setSuggestions).toHaveBeenCalledWith(
      [{
        label: 'road',
        value: 'road'
      }]
    )
  })
})
