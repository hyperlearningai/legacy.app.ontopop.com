import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphContextMenu from '../../components/GraphContextMenu'

const setup = () => {
  const props = {
    contextMenuData: {
      top: 100,
      left: 100,
      nodeId: 'node-123'
    },
    setStoreState: jest.fn(),
    addNumber: jest.fn(),
  }

  const component = shallow(<GraphContextMenu {...props} />)

  return {
    component,
    props
  }
}

describe('GraphContextMenu', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const {
      component
    } = setup({
      customQueryOutput: undefined
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
