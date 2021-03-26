import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkGraphList from '../../components/NetworkGraphList'

const setup = () => {
  const props = {
    currentGraph: 'graph-0',
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true
      },
      'graph-1': {
        label: 'Search',
      }
    },
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<NetworkGraphList {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkGraphList', () => {
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
