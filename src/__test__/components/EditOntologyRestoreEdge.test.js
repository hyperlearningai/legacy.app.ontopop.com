import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyRestoreEdge from '../../components/EditOntologyRestoreEdge'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'

const setup = ({
  deletedEdges
}) => {
  const props = {
    type: 'edge',
    operation: 'restore',
    updateStoreValue: jest.fn(),
    objectPropertiesFromApiBackup: objectPropertiesFromApi,
    deletedEdges,
    deletedNodes: [],
  }

  const component = shallow(<EditOntologyRestoreEdge {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyRestoreEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no deleted edges', () => {
    const {
      component
    } = setup({
      deletedEdges: [],
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when deleted edges', () => {
    const {
      component
    } = setup({
      deletedEdges: [
        '12'
      ],
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
