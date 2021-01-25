import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphVisualisationWrapper from '../../components/GraphVisualisationWrapper'
import { ALGO_TYPE_FULL } from '../../constants/algorithms'

const setup = ({
  showContextMenu
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
    showContextMenu,
    contextMenuData: {
      top: 0,
      left: 0,
      nodeId: ''
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

  it('should match snapshot when no context menu', () => {
    const {
      component
    } = setup({
      showContextMenu: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when context menu', () => {
    const {
      component
    } = setup({
      showContextMenu: true
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
