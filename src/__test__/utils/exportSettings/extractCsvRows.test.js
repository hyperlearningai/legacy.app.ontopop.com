/* eslint max-len:0 */
import extractCsvRows from '../../../utils/exportSettings/extractCsvRows'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { availableEdges } from '../../fixtures/availableEdges'
import { availableNodes } from '../../fixtures/availableNodes'
import { extractCsvRowsFixture } from '../../fixtures/extractCsvRows'
import store from '../../../store'

const getState = () => ({
  availableNodes,
  availableEdges,
  objectPropertiesFromApi,
})

store.getState = getState

describe('extractCsvRows', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return right object', () => {
    const nodeKeys = [
      'id',
      'label',
      'rdfAbout',
      'rdfsLabel',
      'skosComment',
      'skosDefinition',
      'skosExample'
    ]
    const edgeKeys = [
      'rdfAbout',
      'rdfsLabel',
      'skosComment',
      'skosDefinition'
    ]
    const result = extractCsvRows({
      nodeKeys,
      edgeKeys,
    })

    expect(result).toEqual(
      extractCsvRowsFixture
    )
  })
})
