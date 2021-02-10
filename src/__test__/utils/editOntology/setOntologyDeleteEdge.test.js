/* eslint max-len:0 */
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteEdge'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')

const selectedElement = Object.keys(OwlObjectProperties).slice(0, Object.keys(OwlObjectProperties).length - 2)

const setStoreState = jest.fn()
const addToObject = jest.fn()
const deletedEdges = []

describe('setOntologyDeleteEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      objectPropertiesFromApi: OwlObjectProperties,
      deletedEdges,
      selectedGraphVersion: 'original',
      classesFromApi: OwlClasses,
    }))
    store.getState = getState

    await setOntologyDeleteEdge({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
    )
    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
