import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyRestoreEdge from '../../components/EditOntologyRestoreEdge'
import { classesFromApi } from '../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'

const setup = ({
  deletedEdges
}) => {
  const props = {
    type: 'edge',
    operation: 'restore',
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
    classesFromApiBackup: classesFromApi,
    objectPropertiesFromApiBackup: objectPropertiesFromApi,
    deletedEdges,
    deletedNodes: [],
    userDefinedNodeStyling: {
      stylingNodeCaptionProperty: 'rdfsLabel'
    },
    globalNodeStyling: {
      stylingNodeCaptionProperty: 'rdfsLabel'
    },
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
