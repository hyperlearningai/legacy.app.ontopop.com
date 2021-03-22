import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import HideElementsByPropertyForm from '../../components/HideElementsByPropertyForm'
import { DEFAULT_HIDDEN_ELEMENT_PROPERTY } from '../../constants/graph'

const setup = ({
  elementType
}) => {
  const props = {
    elementType,
    index: 0,
    elementProperties: { 0: DEFAULT_HIDDEN_ELEMENT_PROPERTY },
    annotationProperties: [{
      label: 'rdfsLabel',
      value: 'rdfsLabel',
    }],
    setProperty: jest.fn(),
    annotationPropertiesDatasets: [{
      label: 'upperOntology',
      value: 'upperOntology',
    }],
  }

  const component = shallow(<HideElementsByPropertyForm {...props} />)

  return {
    component,
    props
  }
}

describe('HideElementsByPropertyForm', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when node', () => {
    const {
      component
    } = setup({
      elementType: 'node'
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when edge', () => {
    const {
      component
    } = setup({
      elementType: 'edge'
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
