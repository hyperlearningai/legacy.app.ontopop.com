import startupActions from '../../../utils/graphVisualisation/startupActions'
import store from '../../../store'
import getGraphData from '../../../utils/getGraphData'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import loadGraphVersionFromServer from '../../../utils/versioning/loadGraphVersionFromServer'
import setGraphData from '../../../utils/setGraphData'
import getNodeProperties from '../../../utils/getNodeProperties'
import getEdgeProperties from '../../../utils/getEdgeProperties'

jest.mock('../../../utils/getGraphData')
jest.mock('../../../utils/getNodeProperties')
jest.mock('../../../utils/getEdgeProperties')
jest.mock('../../../utils/versioning/loadGraphVersionFromServer')
jest.mock('../../../utils/setGraphData')

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
        ['edgesProperties', [{ id: 'edge-prop-123' }]]]
    )
    expect(loadGraphVersionFromServer).toHaveBeenCalledWith({
      setStoreState,
      addToObject,
      classes,
      objectProperties
    })

    expect(setGraphData).toHaveBeenCalledWith({ setStoreState })
  })
})
