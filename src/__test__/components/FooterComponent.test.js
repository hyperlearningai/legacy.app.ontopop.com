import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FooterComponent from '../../components/FooterComponent'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../../constants/views'

const setup = ({
  sidebarView,
  totalSearchCount
}) => {
  const props = {
    updateStoreValue: jest.fn(),
    totalSearchCount,
    sidebarView,
    searchPageSelected: 1,
    entrySearchResultsByPage: {
      0: [{
        id: '1'
      }],
      1: [{
        id: '2'
      }],
    }
  }

  const component = shallow(<FooterComponent {...props} />)

  return {
    component,
    props
  }
}

describe('FooterComponent', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when SIDEBAR_VIEW_ENTRY_SEARCH and 0 total search count', () => {
    const {
      component
    } = setup({
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
      totalSearchCount: 0,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when SIDEBAR_VIEW_ENTRY_SEARCH', () => {
    const {
      component
    } = setup({
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
      totalSearchCount: 100,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when any  view', () => {
    const {
      component
    } = setup({
      sidebarView: 'any',
      totalSearchCount: 0,
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
