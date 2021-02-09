import { DataSet } from 'vis-data'
import highlightEdge from '../../../utils/freeTextSearch/highlightEdge'
import { availableEdgesNormalised } from '../../fixtures/availableEdgesNormalised'
import store from '../../../store'

const setStoreState = jest.fn()
const setPrevSelectedEdges = jest.fn()
const availableEdges = new DataSet(Object.keys(availableEdgesNormalised).map((elementId) => availableEdgesNormalised[elementId]))
const fit = jest.fn()
const network = {
  fit
}
const getState = jest.fn().mockImplementation(() => ({
  availableEdges,
  network,
}))
store.getState = getState

describe('highlightEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const elementId = 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp'

    await highlightEdge({
      elementId,
      setPrevSelectedEdges,
      setStoreState
    })

    expect(setPrevSelectedEdges).toHaveBeenCalledWith([
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R7RDxuQpthew95SauxL9iOL___http://webprotege.stanford.edu/RDXfAVuWRwr0N4TV6QEbADY',
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/RDZQxNkcGSsNALjBJH6keFD___http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n',
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R9CEIYtS6EVWnP7kLOlZGYO___http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/RBqifrmlk0euN7DLSAdEhDX___http://webprotege.stanford.edu/RtN2Zu9OP2GsaPU9toX3UM',
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/RDwUtfvimhekfSyyuGXj6rw___http://webprotege.stanford.edu/RCnRceKsHZf8Gt9UvDjM6We',
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/RDZQxNkcGSsNALjBJH6keFD___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
    ])
    expect(fit).toHaveBeenCalledWith({ animation: true })
    expect(setStoreState).toHaveBeenCalledWith('freeTextSelectedElement', 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp')
  })
})
