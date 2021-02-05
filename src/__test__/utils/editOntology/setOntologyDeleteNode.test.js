/* eslint max-len:0 */
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteNodes'

const selectedElement = Object.keys(OwlClasses).slice(0, Object.keys(OwlClasses).length - 2)

const setStoreState = jest.fn()
const addToObject = jest.fn()
const deletedNodes = []
describe('setOntologyDeleteNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when current graph is graph-0', async () => {
    const currentGraph = 'graph-0'
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      deletedNodes,
      selectedGraphVersion: 'original',
      currentGraph
    }))
    store.getState = getState

    await setOntologyDeleteNode({
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
      classesFromApi: OwlClasses,
      deletedNodes,
      selectedGraphVersion: 'original',
      currentGraph
    }))
    store.getState = getState

    await setOntologyDeleteNode({
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
