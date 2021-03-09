import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotesList from '../../components/NotesList'

const setup = ({
  notes,
  selectedNode,
  selectedEdge,
}) => {
  const props = {
    notes,
    selectedNode,
    selectedEdge,
    addNumber: jest.fn(),
    setStoreState: jest.fn(),
  }

  const component = shallow(<NotesList {...props} />)

  return {
    component,
    props
  }
}

describe('NotesList', () => {
  it('should match snapshot when notes empty', () => {
    const {
      component
    } = setup({
      notes: []
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot with graph note', () => {
    const {
      component
    } = setup({
      notes: [{
        1: {
          id: 1,
          type: 'graph',
          userId: 'username@domain.tld',
          contents: 'My first note',
          dateCreated: 'yyyy-MM-dd HH:mm:ss',
          dateLastUpdated: 'yyyy-MM-dd HH:mm:ss'
        }
      }]
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
