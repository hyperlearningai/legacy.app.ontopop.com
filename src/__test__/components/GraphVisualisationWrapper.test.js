import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphVisualisationWrapper from '../../components/GraphVisualisationWrapper'
import { ALGO_TYPE_FULL } from '../../constants/algorithms'

const setup = ({
  showContextMenu,
  isBoundingBoxSelectable
}) => {
  const props = {
    currentGraph: 'graph-0',
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true,
        type: ALGO_TYPE_FULL
      }
    },
    setStoreState: jest.fn(),
    addToObject: jest.fn(),
    showContextMenu,
    contextMenuData: {
      top: 0,
      left: 0,
      nodeId: ''
    },
    isBoundingBoxSelectable,
    boundingBoxGeometry: {
      fixedPointX: 100,
      fixedPointY: 100,
      boundingBoxPosX: 100,
      boundingBoxPosY: 100,
      boundingBoxWidth: 200,
      boundingBoxHeight: 200
    }
  }

  const component = shallow(<GraphVisualisationWrapper {...props} />)

  return {
    component,
    props
  }
}

describe('GraphVisualisationWrapper', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no context menu and no bounding box', () => {
    const {
      component
    } = setup({
      showContextMenu: false,
      isBoundingBoxSelectable: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when context menu and bounding box', () => {
    const {
      component
    } = setup({
      showContextMenu: true,
      isBoundingBoxSelectable: true
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
