import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FreeTextSearch from '../../components/FreeTextSearch'

const setup = ({
  selectedElement
}) => {
  const props = {
    freeTextSelection: {
      'http://webprotege.stanford.edu/R93SkoUnFXM1KEjUDb2Ij3n': 'node',
      'http://webprotege.stanford.edu/RBfzJ6HkijEIMSY3oKjcLay': 'edge',
      'http://webprotege.stanford.edu/Rr60siMdu9IEvdag4DhF7M': 'node',
    },
    selectedElement,
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<FreeTextSearch {...props} />)

  return {
    component,
    props
  }
}

describe('FreeTextSearch', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no selected node', () => {
    const {
      component
    } = setup({
      selectedElement: undefined
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when selected node', () => {
    const {
      component
    } = setup({
      selectedElement: { 1: 'node' }
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
