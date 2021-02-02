import getNodesProperties from '../../utils/getNodesProperties'
import store from '../../store'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'

const setStoreState = jest.fn()

const getState = jest.fn().mockImplementation(() => ({
  classesFromApi: OwlClasses
}))
store.getState = getState

describe('getNodesProperties', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await getNodesProperties({
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'nodesProperties', [{
        label: 'rdfAbout',
        value: 'rdfAbout'
      }, {
        label: 'rdfsLabel',
        value: 'rdfsLabel'
      }, {
        label: 'skosDefinition',
        value: 'skosDefinition'
      },
      {
        label: 'skosComment',
        value: 'skosComment',
      },
      {
        label: 'skosExample',
        value: 'skosExample',
      }]
    )
  })
})
