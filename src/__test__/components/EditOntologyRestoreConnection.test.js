import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntologyRestoreEdgeNode from '../../components/EditOntologyRestoreEdgeNode'
import { OwlClasses } from '../fixtures/test-ontology-classes'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'

const setup = ({
  deletedConnections
}) => {
  const props = {
    type: 'connection',
    operation: 'restore',
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
    classesFromApi: OwlClasses,
    objectPropertiesFromApi: OwlObjectProperties,
    deletedConnections,
    deletedEdges: [],
    deletedNodes: [],
  }

  const component = shallow(<EditOntologyRestoreEdgeNode {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntologyRestoreEdgeNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no options', () => {
    const {
      component
    } = setup({
      deletedConnections: [],
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when type node and options', () => {
    const {
      component
    } = setup({
      deletedConnections: [
        'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
      ],
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
