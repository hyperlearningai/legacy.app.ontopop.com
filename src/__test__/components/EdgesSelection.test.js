import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelection from '../../components/EdgesSelection'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    selectedEdge: 'edge-123'
  }

  const component = shallow(<EdgesSelection {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
