import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelectionDetailsNode from '../../components/EdgesSelectionDetailsNode'

const setup = () => {
  const props = {
    node: {
      label: 'Road',
      rdfsLabel: 'Road',
      rdfAbout: 'http://test.com/Road'
    }
  }

  const component = shallow(<EdgesSelectionDetailsNode {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesSelectionDetailsNode', () => {
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
