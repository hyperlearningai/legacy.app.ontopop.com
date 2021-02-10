/* eslint max-len:0 */
import setOntologyUpdateNode from '../../../utils/editOntology/setOntologyUpdateNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyUpdateNode'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')

const selectedElementProperties = {
  rdfAbout: 'http://test.com/node',
  rdfsLabel: 'New node',
  'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
}
const selectedElement = 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'
const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyUpdateNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      selectedGraphVersion: 'original',
      updatedNodes: [],
    }))
    store.getState = getState

    await setOntologyUpdateNode({
      setStoreState,
      selectedElementProperties,
      selectedElement,
      addToObject
    })

    expect(updateNodes).toHaveBeenLastCalledWith(
      { id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY', label: 'New node' }
    )

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})