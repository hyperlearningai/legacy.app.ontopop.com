/* eslint max-len:0 */
import extractCsvRows from '../../utils/extractCsvRows'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { availableEdgesNormalised } from '../fixtures/availableEdgesNormalised'
import { availableNodesNormalised } from '../fixtures/availableNodesNormalised'
import { extractCsvRowsFixture } from '../fixtures/extractCsvRows'

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
    const objectPropertiesFromApi = OwlObjectProperties

    const result = extractCsvRows({
      nodeKeys,
      edgeKeys,
      availableNodesNormalised,
      availableEdgesNormalised,
      objectPropertiesFromApi
    })

    expect(result).toEqual(
      extractCsvRowsFixture
    )
  })
})
