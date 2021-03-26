import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotesList from '../../components/NotesList'
import { classesFromApi } from '../fixtures/classesFromApi'

const setup = ({
  notes,
  selectedNotesType,
  noteElementId
}) => {
  const props = {
    notes,
    nodesNotes: [{
      id: 1,
      type: 'node',
      nodeId: 123,
      userId: 'username@domain.tld',
      contents: 'My first note',
      dateCreated: 'yyyy-MM-dd HH:mm:ss',
      dateLastUpdated: 'yyyy-MM-dd HH:mm:ss'
    }],
    edgesNotes: [{
      id: 1,
      type: 'edge',
      edgeId: 123,
      userId: 'username@domain.tld',
      contents: 'My first note',
      dateCreated: 'yyyy-MM-dd HH:mm:ss',
      dateLastUpdated: 'yyyy-MM-dd HH:mm:ss'
    }],
    updateStoreValue: jest.fn(),
    selectedNotesType,
    noteElementId,
    classesFromApi,
    nodesDropdownLabels: [{
      id: '1',
      value: 'node'
    }]
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
      notes: [],
      selectedNotesType: 'graph',
      noteElementId: ''
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
      }],
      selectedNotesType: 'graph',
      noteElementId: ''
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot with node note and noteElementId', () => {
    const {
      component
    } = setup({
      notes: [],
      selectedNotesType: 'node',
      noteElementId: '123'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot with edge note and noteElementId', () => {
    const {
      component
    } = setup({
      notes: [],
      selectedNotesType: 'edge',
      noteElementId: '123'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
