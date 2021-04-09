import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SynonymsListAddNew from '../../components/SynonymsListAddNew'
import { classesFromApi } from '../fixtures/classesFromApi'

const setup = ({
  selectedElement
}) => {
  const props = {
    selectedElement,
    updateStoreValue: jest.fn(),
    classesFromApi
  }

  const component = shallow(<SynonymsListAddNew {...props} />)

  return {
    component,
    props
  }
}

describe('SynonymsListAddNew', () => {
  it('should match snapshot when node selected', () => {
    const {
      component
    } = setup({
      selectedElement: { 12: 'node' }
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when edge selected', () => {
    const {
      component
    } = setup({
      selectedElement: { 12: 'edge' }
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
