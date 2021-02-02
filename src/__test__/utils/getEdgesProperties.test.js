import getEdgesProperties from '../../utils/getEdgesProperties'
import store from '../../store'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties.json'

const setStoreState = jest.fn()

const getState = jest.fn().mockImplementation(() => ({
  objectPropertiesFromApi: OwlObjectProperties,
}))
store.getState = getState

describe('getEdgesProperties', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await getEdgesProperties({
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'edgesProperties', [{
        label: 'rdfAbout',
        value: 'rdfAbout'
      }, {
        label: 'rdfsLabel',
        value: 'rdfsLabel'
      }, {
        label: 'skosDefinition',
        value: 'skosDefinition'
      }]
    )
  })
})
