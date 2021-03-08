import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Navbar from '../../components/Navbar'
import { MAIN_VIEW_GRAPH, MAIN_VIEW_SEARCH } from '../../constants/views'

const setup = ({
  mainVisualisation
}) => {
  const props = {
    availableEdgesCount: 333,
    availableNodesCount: 200,
    mainVisualisation,
    entrySearchResults: [{ id: '123' }]
  }

  const component = shallow(<Navbar {...props} />)

  return {
    component,
    props
  }
}

describe('Navbar', () => {
  it('should match snapshot when MAIN_VIEW_SEARCH', () => {
    const {
      component
    } = setup({
      mainVisualisation: MAIN_VIEW_SEARCH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when MAIN_VIEW_GRAPH', () => {
    const {
      component
    } = setup({
      mainVisualisation: MAIN_VIEW_GRAPH
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
