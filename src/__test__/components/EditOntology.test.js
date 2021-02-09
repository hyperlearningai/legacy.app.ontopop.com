import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EditOntology from '../../components/EditOntology'

const setup = () => {
  const props = {
    selectedGraphVersion: 'original',
    graphVersions: {
      original: {
        classesFromApi: {},
        objectPropertiesFromApi: {},
        classesFromApiBackup: {},
        objectPropertiesFromApiBackup: {},
        deletedNodes: [],
        addedNodes: [],
        updatedNodes: []
      },
    },
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
