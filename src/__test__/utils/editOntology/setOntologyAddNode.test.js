/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyAddNode from '../../../utils/editOntology/setOntologyAddNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import { availableNodesNormalised } from '../../fixtures/availableNodesNormalised'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyAddNode'

const selectedElementProperties = {
  rdfAbout: 'http://test.com/node',
  rdfsLabel: 'New node',
  'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
}

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyAddNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      selectedGraphVersion: 'original',
      availableNodes: new DataSet({ id: 1, label: 'test' }),
      addedNodes: [],
      availableNodesNormalised
    }))
    store.getState = getState

    await setOntologyAddNode({
      setStoreState,
      selectedElementProperties,
      addToObject
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
