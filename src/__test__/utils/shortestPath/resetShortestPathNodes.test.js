import resetShortestPathNodes from '../../../utils/shortestPath/resetShortestPathNodes'
import store from '../../../store'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import { classesFromApi } from '../../fixtures/classesFromApi'

const updateStoreValue = jest.fn()

const shortestPathNode1 = '12'
const shortestPathNode2 = '30'

jest.mock('../../../utils/networkStyling/setNodeStyle')

store.getState = jest.fn().mockImplementation(() => ({
  shortestPathNode1,
  shortestPathNode2,
  classesFromApi
}))

describe('resetShortestPathNodes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await resetShortestPathNodes({
      updateStoreValue,
    })

    expect(setNodeStyle.mock.calls).toEqual(
      [[{
        node: {
          'Business Area': 'Maintain Plan Operate',
          'Data Source': 'Confirm',
          Subdomain: 'Confirm',
          id: '12',
          label: 'Maintenance',
          name: 'Maintenance',
          nodeId: 12,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R734t4iI6j8MPmpJsIqO2v4',
          rdfsLabel: 'Maintenance',
          skosDefinition: 'The action taken by an Entity to improve the Condition of, and remedy Defects present on, an Asset.',
          skosExample: 'Road Works',
          upperOntology: false,
          userDefined: false
        }
      }], [{
        node: {
          'Business Area': 'Maintain Construct Plan',
          'Data Source': 'DDMS Confirm',
          Subdomain: 'DDMS',
          id: '30',
          label: 'Drainage',
          name: 'Drainage',
          nodeId: 30,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R7hlktFumJq5RpggEzEv2xi',
          rdfsLabel: 'Drainage',
          skosDefinition: 'Assets designed to channel water around or away from other assets.',
          skosExample: 'Soakaway, Outfall, Culvert',
          upperOntology: false,
          userDefined: false
        }
      }]]
    )
    expect(updateStoreValue.mock.calls).toEqual([
      [
        ['isShortestPathNode1Selectable'],
        OPERATION_TYPE_UPDATE,
        false,
      ],
      [
        ['isShortestPathNode2Selectable'],
        OPERATION_TYPE_UPDATE,
        false,
      ],
      [
        ['shortestPathNode1'],
        OPERATION_TYPE_UPDATE,
        '',
      ],
      [
        ['shortestPathNode2'],
        OPERATION_TYPE_UPDATE,
        '',
      ],
      [
        ['shortestPathNode1Object'],
        OPERATION_TYPE_UPDATE,
        undefined,
      ],
      [
        ['shortestPathNode2Object'],
        OPERATION_TYPE_UPDATE,
        undefined,
      ],

    ])
  })
})
