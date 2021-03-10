import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotesListAddNew from '../../components/NotesListAddNew'

const setup = ({
  selectedNotesType
}) => {
  const props = {
    addNumber: jest.fn(),
    noteElementId: '12',
    setStoreState: jest.fn(),
    selectedNotesType,
  }

  const component = shallow(<NotesListAddNew {...props} />)

  return {
    component,
    props
  }
}

describe('NotesListAddNew', () => {
  it('should match snapshot when graph', () => {
    const {
      component
    } = setup({
      selectedNotesType: 'graph'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when node', () => {
    const {
      component
    } = setup({
      selectedNotesType: 'node'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when edge', () => {
    const {
      component
    } = setup({
      selectedNotesType: 'edge'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
