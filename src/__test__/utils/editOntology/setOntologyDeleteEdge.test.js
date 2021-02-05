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

const selectedElement = Object.keys(OwlObjectProperties).slice(0, Object.keys(OwlObjectProperties).length - 2)

const setStoreState = jest.fn()
const addToObject = jest.fn()
const deletedEdges = []

describe('setOntologyDeleteEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when current graph is graph-0', async () => {
    const currentGraph = 'graph-0'
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApi: OwlClasses,
      deletedEdges,
      selectedGraphVersion: 'original',
      currentGraph
    }))
    store.getState = getState

    await setOntologyDeleteEdge({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })

  it('should work correctly when current graph is not graph-0', async () => {
    const currentGraph = 'graph-1'
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      objectPropertiesFromApi: OwlObjectProperties,
      classesFromApi: OwlClasses,
      deletedEdges,
      selectedGraphVersion: 'original',
      currentGraph
    }))
    store.getState = getState

    await setOntologyDeleteEdge({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    setStoreStateFixture.splice(-1, 1)

    const setStoreStateOutput = [
      ...setStoreStateFixture,
      ...[
        [
          'currentGraph',
          'graph-0']
      ]
    ]
    expect(setStoreState.mock.calls).toEqual(setStoreStateOutput)
  })
})
