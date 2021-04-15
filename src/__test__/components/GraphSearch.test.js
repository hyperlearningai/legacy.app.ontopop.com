import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphSearch from '../../components/GraphSearch'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../../constants/views'

const setup = ({
  isFirstQuery,
  isSearchLoading,
  searchPageSelected,
  sidebarView
}) => {
  const props = {
    entrySearchResultsByPage: {
      0: {
        id: '1'
      },
      1: {
        id: '3'
      }
    },
    isFirstQuery,
    isSearchLoading,
    searchPageSelected,
    entrySearchValue: 'road',
    updateStoreValue: jest.fn(),
    sidebarView: sidebarView || 'any'
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

  it('should match snapshot when isSearchLoading false', () => {
    const {
      component
    } = setup({
      isFirstQuery: false,
      isSearchLoading: true,
      searchPageSelected: 0
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when isFirstQuery false', () => {
    const {
      component
    } = setup({
      isFirstQuery: false,
      isSearchLoading: false,
      searchPageSelected: 0
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when isFirstQuery true and search page selected with values', () => {
    const {
      component
    } = setup({
      isFirstQuery: true,
      isSearchLoading: false,
      searchPageSelected: 0
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when isFirstQuery true and search page selected with no values', () => {
    const {
      component
    } = setup({
      isFirstQuery: true,
      isSearchLoading: false,
      searchPageSelected: 2
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when isFirstQuery true and search page selected with no values and sidebar view', () => {
    const {
      component
    } = setup({
      isFirstQuery: true,
      isSearchLoading: false,
      searchPageSelected: 2,
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
