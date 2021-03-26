import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SynonymsListNode from '../../components/SynonymsListNode'
import { classesFromApi } from '../fixtures/classesFromApi'

const setup = ({
  email
}) => {
  const props = {
    classesFromApi,
    synonymObject: {
      id: 1,
      nodeId: 12,
      userId: 'test@test.test',
      synonym: 'test',
      dateCreated: '2021-03-09 17:03:51',
      dateLastUpdated: '2021-03-09 17:03:51',
    },
    updateStoreValue: jest.fn(),
    selectedNotesType: '',
    user: {
      email
    }
  }

  const component = shallow(<SynonymsListNode {...props} />)

  return {
    component,
    props
  }
}

describe('SynonymsListNode', () => {
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
