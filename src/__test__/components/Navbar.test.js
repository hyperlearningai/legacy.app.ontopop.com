import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Navbar from '../../components/Navbar'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../../constants/views'

const setup = ({
  sidebarView
}) => {
  const props = {
    availableEdgesCount: 333,
    availableNodesCount: 200,
    totalSearchCount: 100,
    sidebarView,
    searchPageSelected: 1,
    entrySearchResultsByPage: {
      0: [
        { id: '1' }
      ],
      1: [
        { id: '2' }
      ]
    },
  }

  const component = shallow(<Navbar {...props} />)

  return {
    component,
    props
  }
}

describe('Navbar', () => {
  it('should match snapshot when SIDEBAR_VIEW_ENTRY_SEARCH', () => {
    const {
      component
    } = setup({
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when MAIN_VIEW_GRAPH', () => {
    const {
      component
    } = setup({
      sidebarView: 'any'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
