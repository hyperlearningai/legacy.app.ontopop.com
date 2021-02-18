import setNetworkMethods from '../../../utils/graphVisualisation/setNetworkMethods'

const setStoreState = jest.fn()
const addToArray = jest.fn()

describe('setNetworkMethods', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const fit = jest.fn()
    const stabilize = jest.fn()
    const once = jest.fn()
    const on = jest.fn()
    const click = jest.fn()
    const doubleClick = jest.fn()
    const oncontext = jest.fn()

    const network = {
      fit,
      stabilize,
      once,
      on,
      click,
      doubleClick,
      oncontext
    }

    await setNetworkMethods({
      setStoreState,
      network,
      addToArray,
    })

    expect(on.mock.calls[0][0]).toEqual(
      'selectNode'
    )
    expect(on.mock.calls[1][0]).toEqual(
      'click'
    )
    expect(on.mock.calls[2][0]).toEqual(
      'doubleClick'
    )
    expect(on.mock.calls[3][0]).toEqual(
      'oncontext'
    )
    expect(on.mock.calls[4][0]).toEqual(
      'selectEdge'
    )
    expect(on.mock.calls[5][0]).toEqual(
      'stabilizationProgress'
    )
    expect(once).toHaveBeenCalled()
    expect(stabilize).toHaveBeenCalledWith(2000)
    expect(fit).toHaveBeenCalled()
  })
})
