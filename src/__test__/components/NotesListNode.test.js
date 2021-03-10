import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotesListNote from '../../components/NotesListNote'
import { classesFromApi } from '../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'

const setup = ({
  email
}) => {
  const props = {
    classesFromApi,
    objectPropertiesFromApi,
    note: {
      id: 1,
      type: 'graph',
      nodeId: 0,
      edgeId: 0,
      userId: 'test@test.test',
      contents: 'test',
      dateCreated: '2021-03-09 17:03:51',
      dateLastUpdated: '2021-03-09 17:03:51',
    },
    addNumber: jest.fn(),
    setStoreState: jest.fn(),
    selectedNotesType: '',
    user: {
      email
    }
  }

  const component = shallow(<NotesListNote {...props} />)

  return {
    component,
    props
  }
}

describe('NotesListNote', () => {
  it('should match snapshot when no user', () => {
    const {
      component
    } = setup({
      email: ''
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when same user', () => {
    const {
      component
    } = setup({
      email: 'test@test.test'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
