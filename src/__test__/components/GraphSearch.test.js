import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphSearch from '../../components/GraphSearch'

const setup = ({
  isQueried
}) => {
  const props = {
    setStoreState: jest.fn(),
    entrySearchResults: [{ id: '123' }],
    isQueried,
  }

  const component = shallow(<GraphSearch {...props} />)

  return {
    component,
    props
  }
}

describe('GraphSearch', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when isQueried false', () => {
    const {
      component
    } = setup({
      isQueried: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when isQueried true', () => {
    const {
      component
    } = setup({
      isQueried: true
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
