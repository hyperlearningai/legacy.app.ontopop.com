import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import setObjectPropertiesFromApi from '../../../utils/apiCalls/setObjectPropertiesFromApi'

const updateStoreValue = jest.fn()

describe('setObjectPropertiesFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return data', async () => {
    const edges = {
      11: {
        edgeId: 11,
        id: 11,
        role: 'Provided to',
        label: 'subclass',
        rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        rdfsLabel: 'Provided to',
        from: 1,
        to: 170
      },
      12: {
        edgeId: 12,
        role: 'Subclass of',
        dfsLabel: 'Subclass of',
        id: 12,
        from: 1,
        to: 141
      }
    }

    await setObjectPropertiesFromApi({
      updateStoreValue,
      edges
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['objectPropertiesFromApi'], OPERATION_TYPE_UPDATE, {
        11:
      {
        edgeId: 11,
        from: '1',
        id: '11',
        label: 'Provided to',
        rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        rdfsLabel: 'Provided to',
        role: 'Provided to',
        to: '170'
      },
        12: {
          dfsLabel: 'Subclass of',
          edgeId: 12,
          from: '1',
          id: '12',
          label: undefined,
          role: 'Subclass of',
          to: '141'
        }
      }], [['objectPropertiesFromApiBackup'], OPERATION_TYPE_UPDATE, {
        11: {
          edgeId: 11,
          from: '1',
          id: '11',
          label: 'Provided to',
          rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          rdfsLabel: 'Provided to',
          role: 'Provided to',
          to: '170'
        },
        12: {
          dfsLabel: 'Subclass of',
          edgeId: 12,
          from: '1',
          id: '12',
          label: undefined,
          role: 'Subclass of',
          to: '141'
        }
      }]]
    )
  })
})
