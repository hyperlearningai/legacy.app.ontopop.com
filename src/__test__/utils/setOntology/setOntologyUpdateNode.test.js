/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyUpdateNode from '../../../utils/setOntology/setOntologyUpdateNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import { availableNodesNormalised } from '../../fixtures/availableNodesNormalised'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyUpdateNodes'

const selectedElementProperties = {
  rdfAbout: 'http://test.com/node',
  rdfsLabel: 'New node',
  'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
}
const selectedElement = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntology', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      selectedGraphVersion: 'original',
      availableNodes: new DataSet({ id: 1, label: 'test' }),
      updatedNodes: [],
      availableNodesNormalised
    }))
    store.getState = getState

    await setOntologyUpdateNode({
      setStoreState,
      selectedElementProperties,
      selectedElement,
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
