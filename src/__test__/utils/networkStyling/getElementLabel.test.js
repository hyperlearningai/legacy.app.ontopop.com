/* eslint max-len:0 */
import getElementLabel from '../../../utils/networkStyling/getElementLabel'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApiBackup: classesFromApi,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  globalEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfsLabel'
  },
  userDefinedEdgeStyling: {
    stylingEdgeCaptionProperty: 'rdfAbout'
  },
  globalNodeStyling: {
    stylingNodeCaptionProperty: 'rdfsLabel'
  },
  userDefinedNodeStyling: {
    stylingNodeCaptionProperty: 'rdfAbout'
  },
}))

describe('getElementLabel', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node', () => {
    const id = '120'
    const type = 'node'

    expect(getElementLabel({
      type,
      id
    })).toEqual('Dispose')
  })

  it('should work correctly when edge and global', () => {
    const id = '12'
    const type = 'edge'

    expect(getElementLabel({
      type,
      id
    })).toEqual('Subclass of')
  })
})
