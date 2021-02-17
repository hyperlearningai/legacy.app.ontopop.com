import startupActions from '../../../utils/graphVisualisation/startupActions'
import store from '../../../store'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import setGraphData from '../../../utils/graphVisualisation/setGraphData'
import getNodeProperties from '../../../utils/apiCalls/getNodeProperties'
import getEdgeProperties from '../../../utils/apiCalls/getEdgeProperties'

jest.mock('../../../utils/apiCalls/getGraphData')
jest.mock('../../../utils/apiCalls/getNodeProperties')
jest.mock('../../../utils/apiCalls/getEdgeProperties')
jest.mock('../../../utils/graphVisualisation/setGraphData')

const setStoreState = jest.fn()
const addToObject = jest.fn()
const t = jest.fn()

describe('startupActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const classes = OwlClasses
    const objectProperties = OwlObjectProperties

    getGraphData.mockImplementationOnce(() => Promise.resolve({
      classes,
      objectProperties
    }))

    store.getState = jest.fn().mockImplementation(() => Promise.resolve({
      stylingNodeBorder: '#000',
      stylingNodeBorderSelected: '#000',
      stylingNodeTextFontSize: 12,
      stylingNodeTextColor: '#000',
      stylingNodeTextFontAlign: 'center',
      stylingNodeShape: 'circle',
      stylingNodeBackgroundColor: '#000',
      stylingNodeBorderColor: '#000',
      stylingNodeHighlightBackgroundColor: '#000',
      stylingNodeHighlightBorderColor: '#000',
      stylingNodeHoverBackgroundColor: '#000',
      stylingNodeHoverBorderColor: '#000',
      stylingNodeSize: 12
    }))

    getNodeProperties.mockImplementationOnce(() => Promise.resolve([{
      id: 'annotation-123'
    }]))

    getEdgeProperties.mockImplementationOnce(() => Promise.resolve([{
      id: 'edge-prop-123'
    }]))

    await startupActions({
      setStoreState,
      addToObject,
      t
    })

    expect(setStoreState.mock.calls).toEqual(
      [['annotationProperties', [{ id: 'annotation-123' }]],
        ['edgesProperties', [{ id: 'edge-prop-123' }]],
        ['classesFromApi', classes],
        ['objectPropertiesFromApi', objectProperties],
        ['classesFromApiBackup', classes],
        ['objectPropertiesFromApiBackup', objectProperties],
      ],

    )

    expect(setGraphData).toHaveBeenCalledWith({ setStoreState })
  })
})
