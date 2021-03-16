/* eslint max-len:0 */
import getStylingProperty from '../../../utils/networkStyling/getStylingProperty'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { USER_DEFINED_PROPERTY } from '../../../constants/graph'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApiBackup: classesFromApi,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  globalEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel',
    stylingEdgeborderWith: 1
  },
  userDefinedEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfAbout',
    stylingEdgeborderWith: 3
  },
  globalNodeStyling: {
    stylingNodeCaptionProperty: 'rdfsLabel',
    stylingNodeHighlightBackgroundColor: '#fff000'
  },
  userDefinedNodeStyling: {
    stylingNodeCaptionProperty: 'rdfAbout',
    stylingNodeHighlightBackgroundColor: '#f0f0f0'
  },
}))

describe('getStylingProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node and userDefined', () => {
    const element = {
      id: '120',
      [USER_DEFINED_PROPERTY]: true
    }
    const type = 'node'
    const property = 'stylingNodeHighlightBackgroundColor'

    expect(getStylingProperty({
      type,
      property,
      element
    })).toEqual('#f0f0f0')
  })

  it('should work correctly when edge and not userDefined', () => {
    const element = {
      id: '120',
      [USER_DEFINED_PROPERTY]: false
    }
    const type = 'edge'
    const property = 'stylingEdgeborderWith'

    expect(getStylingProperty({
      type,
      property,
      element
    })).toEqual(1)
  })
})
