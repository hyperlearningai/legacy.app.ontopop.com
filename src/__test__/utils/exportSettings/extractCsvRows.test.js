/* eslint max-len:0 */
import extractCsvRows from '../../../utils/exportSettings/extractCsvRows'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { availableEdges } from '../../fixtures/availableEdgesNormalised'
import { availableNodes } from '../../fixtures/availableNodesNormalised'
import { extractCsvRowsFixture } from '../../fixtures/extractCsvRows'
import store from '../../../store'

const getState = () => ({
  availableNodes,
  availableEdges,
  objectPropertiesFromApi: OwlObjectProperties,
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
