import setDataTableTriplesLabels from '../../../utils/dataTableNetwork/setDataTableTriplesLabels'
import store from '../../../store'
import getElementLabel from '../../../utils/networkStyling/getElementLabel'
import { OPERATION_TYPE_PUSH } from '../../../constants/store'

const updateStoreValue = jest.fn()

jest.mock('../../../utils/networkStyling/getElementLabel')

getElementLabel.mockImplementation(() => 'label')

describe('setDataTableTriplesLabels', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no triples', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      dataTableTriples: [],
    }))

    await setDataTableTriplesLabels({
      updateStoreValue,
    })

    expect(updateStoreValue).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      dataTableTriples: [{
        from: '1',
        edge: '12',
        to: '147'
      },
      {
        from: '3',
        edge: '33',
        to: '333'
      }],
    }))

    await setDataTableTriplesLabels({
      updateStoreValue,
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'dataTableTriplesWithLabels',
          ],
          OPERATION_TYPE_PUSH,
          {
            edgeLabel: 'label',
            fromLabel: 'label',
            toLabel: 'label',
          },
        ],
        [
          [
            'dataTableTriplesWithLabels',
          ],
          OPERATION_TYPE_PUSH,
          {
            edgeLabel: 'label',
            fromLabel: 'label',
            toLabel: 'label',
          },
        ],
      ]
    )
  })
})
