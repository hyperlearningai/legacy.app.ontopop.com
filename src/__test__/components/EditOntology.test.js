import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgesSelection from '../../components/EdgesSelection'
import { OwlClasses } from '../fixtures/test-ontology-classes'

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
    setStoreState: jest.fn(),
    addToArray: jest.fn(),
    removeFromObject: jest.fn(),
    addToObject: jest.fn(),
    classesFromApi: OwlClasses
  }

  const component = shallow(<EdgesSelection {...props} />)

  return {
    component,
    props
  }
}

describe('EdgesSelection', () => {
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
