import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SearchBox from '../../components/SearchBox'

const setup = () => {
  const props = {
    searchFilter: 'abc',
    setStoreState: jest.fn()
  }

  const component = shallow(<SearchBox {...props} />)

  return {
    component,
    props
  }
}

describe('SearchBox', () => {
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
