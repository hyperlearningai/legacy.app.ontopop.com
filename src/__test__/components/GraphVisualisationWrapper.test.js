import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphVisualisationWrapper from '../../components/GraphVisualisationWrapper'
import { ALGO_TYPE_FULL } from '../../constants/algorithms'
import jsonClasses from '../fixtures/test-ontology-classes.json'
import jsonObjectProperties from '../fixtures/test-ontology-object-properties.json'

const setup = () => {
  const props = {
    currentGraph: 'graph-0',
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true,
        type: ALGO_TYPE_FULL
      }
    },
    setStoreState: jest.fn(),
    classesFromApi: jsonClasses.OwlClasses,
    objectPropertiesFromApi: jsonObjectProperties.OwlObjectProperties,
  }

  const component = shallow(<GraphVisualisationWrapper {...props} />)

  return {
    component,
    props
  }
}

describe('GraphVisualisationWrapper', () => {
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
