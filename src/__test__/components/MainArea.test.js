import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainArea from '../../components/MainArea'
import { MAIN_VIEW_GRAPH, MAIN_VIEW_SEARCH } from '../../constants/views'

const setup = ({
  mainVisualisation
}) => {
  const props = {
    setStoreState: jest.fn(),
    addToObject: jest.fn(),
    removeFromObject: jest.fn(),
    addNumber: jest.fn(),
    mainVisualisation
  }

  const component = shallow(<MainArea {...props} />)

  return {
    component,
    props
  }
}

describe('MainArea', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

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
