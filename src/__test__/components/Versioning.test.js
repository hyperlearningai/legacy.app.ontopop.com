import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Versioning from '../../components/Versioning'

const setup = () => {
  const props = {
    selectedGraphVersion: 'original',
    setStoreState: jest.fn(),
    graphVersions: {
      original: {
        classesFromApi: {},
        objectPropertiesFromApi: {},
        classesFromApiBackup: {},
        objectPropertiesFromApiBackup: {},
        nodesProperties: [],
        edgesProperties: [],
        deletedNodes: [],
        addedNodes: [],
        udpatedNodes: []
      },
    }
  }

  const component = shallow(<Versioning {...props} />)

  return {
    component,
    props
  }
}

describe('Versioning', () => {
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
