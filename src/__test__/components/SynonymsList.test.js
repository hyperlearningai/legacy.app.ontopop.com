import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SynonymsList from '../../components/SynonymsList'
import { classesFromApi } from '../fixtures/classesFromApi'

const setup = ({
  nodesSynonyms,
  synonymElementId
}) => {
  const props = {
    addNumber: jest.fn(),
    nodesSynonyms,
    setStoreState: jest.fn(),
    synonymElementId,
    classesFromApi
  }

  const component = shallow(<SynonymsList {...props} />)

  return {
    component,
    props
  }
}

describe('SynonymsList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when synonyms empty', () => {
    const {
      component
    } = setup({
      nodesSynonyms: [],
      synonymElementId: ''
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot with synonym', () => {
    const {
      component
    } = setup({
      nodesSynonyms: [{
        0: {
          dateCreated: '2021-03-22 09:22:43',
          dateLastUpdated: '2021-03-22 09:22:43',
          id: 1,
          nodeId: 12,
          synonym: 'task',
          userId: 'valid@email.com',
        }
      }],
      synonymElementId: ''
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
