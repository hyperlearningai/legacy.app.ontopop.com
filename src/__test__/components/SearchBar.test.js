import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SearchBar from '../../components/SearchBar'

const setup = ({
  isSearchLoading
}) => {
  const props = {
    updateStoreValue: jest.fn(),
    entrySearchValue: 'road',
    isSearchLoading
  }

  const component = shallow(<SearchBar {...props} />)

  return {
    component,
    props
  }
}

describe('SearchBar', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when loading', () => {
    const {
      component
    } = setup({
      isSearchLoading: true
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when not loading', () => {
    const {
      component
    } = setup({
      isSearchLoading: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
