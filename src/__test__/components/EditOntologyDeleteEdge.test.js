import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyDeleteEdge from '../../components/EditOntologyDeleteEdge'

const setup = () => {
  const props = {
    type: 'edge',
    operation: 'delete',
    setStoreState: jest.fn(),
    addNumber: jest.fn(),
    stylingNodeCaptionProperty: 'rfdsLabel'
  }

  const component = shallow(<EditOntologyDeleteEdge {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyDeleteEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
