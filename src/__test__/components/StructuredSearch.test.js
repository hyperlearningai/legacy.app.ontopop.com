import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import StructuredSearch from '../../components/StructuredSearch'
import { classesFromApi } from '../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../fixtures/objectPropertiesFromApi'

const setup = ({ structuredSelection }) => {
  const props = {
    classesFromApi,
    structuredSelection,
    structuredSelectedElement: '33',
    objectPropertiesFromApi,
    removeFromObject: jest.fn(),
    setStoreState: jest.fn(),
    globalEdgeStyling: {
      stylingEdgeCaptionProperty: 'rdfsLabel',
    },
    userDefinedEdgeStyling: {
      stylingEdgeCaptionProperty: 'rdfsLabel',
    },
    globalNodeStyling: {
      stylingNodeCaptionProperty: 'rdfsLabel',
    },
    userDefinedNodeStyling: {
      stylingNodeCaptionProperty: 'rdfsLabel',
    },
    annotationProperties: [{
      value: 'rdfAbout',
      label: 'rdfAbout'
    }],
  }

  const component = shallow(<StructuredSearch {...props} />)

  return {
    component,
    props
  }
}

describe('StructuredSearch', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when no results', () => {
    const {
      component
    } = setup({ structuredSelection: undefined })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when results', () => {
    const {
      component
    } = setup({
      structuredSelection: {
        1: 'node',
        12: 'edge',
        33: 'node',
      }
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
