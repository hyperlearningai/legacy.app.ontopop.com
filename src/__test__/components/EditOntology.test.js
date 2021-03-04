import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntology from '../../components/EditOntology'
import { LABEL_PROPERTY } from '../../constants/graph'

const setup = () => {
  const props = {
    objectPropertiesFromApi: {},
    classesFromApiBackup: {},
    objectPropertiesFromApiBackup: {},
    deletedNodes: [],
    deletedEdges: [],
    globalNodeStyling: {
      stylingNodeCaptionProperty: LABEL_PROPERTY,
    },
    userDefinedNodeStyling: {
      stylingNodeCaptionProperty: LABEL_PROPERTY,
    },
    globalEdgeStyling: {
      stylingNodeCaptionProperty: LABEL_PROPERTY,
    },
    userDefinedEdgeStyling: {
      stylingNodeCaptionProperty: LABEL_PROPERTY,
    }
  }

  const component = shallow(<EditOntology {...props} />)

  return {
    component,
    props
  }
}

describe('EditOntology', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
