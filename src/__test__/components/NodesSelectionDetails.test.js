import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodesSelectionDetails from '../../components/NodesSelectionDetails'
import getEdge from '../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../utils/nodesEdgesUtils/getEdge')

const setup = () => {
  const props = {
    nodeId: '3',
    nodesEdges: ['12'],
  }

  const component = shallow(<NodesSelectionDetails {...props} />)

  return {
    component,
    props
  }
}

describe('NodesSelectionDetails', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    getEdge.mockImplementation(() => (({
      from: '1',
      to: '33',
      label: 'Provided to'
    })))

    getEdge.mockImplementation(() => (({
      from: '1',
      to: '3',
      label: 'Road'
    })))

    expect(toJson(component)).toMatchSnapshot()
  })
})
